//@flow
import React, { useState, useEffect } from 'react';
import { CssBaseline, AppBar, Toolbar, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { action } from './sagas';
import './faIcons';
import AjaxInProgressDialog from './Dialogs/AjaxInProgressDialog';
import AjaxFailureDialog from './Dialogs/AjaxFailureDialog';
import { Loading } from './Components/Loading';
import { Survey } from './Dialogs/Survey';
import { Disclaimer } from './Dialogs/Disclaimer';
import { Emergency } from './Dialogs/Emergency';
import { Instructions } from './Dialogs/Instructions';
import { Call911 } from './Dialogs/Call911';
import { makeStyles } from '@material-ui/core/styles';
import { useGetHash } from './Hooks/useGetHash';
import { useIsMobile } from './Hooks/useIsMobile';
import { MobileDisclaimer } from './Dialogs/Mobile/MobileDisclaimer';
import { MobileEmergency } from './Dialogs/Mobile/MobileEmergency';
import { MobileCall911 } from './Dialogs/Mobile/MobileCall911';
import { MobileSurvey } from './Dialogs/Mobile/MobileSurvey';
import { MobileMap } from './Dialogs/Mobile/MobileMap';
import { MobileInstructions } from './Dialogs/Mobile/MobileInstructions';
import clsx from 'clsx';
import { Location } from './Dialogs/Location';
import { MobileLocation } from './Dialogs/Mobile/MobileLocation';

const getGeolocation = () => {
  if (navigator.geolocation) {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      action('GEOLOCATION_SET', { latitude, longitude });
    }
    function error() {}
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

getGeolocation();

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  offset: {
    minHeight: (props) => (props.isMobile ? theme.appBarHeightMobile : theme.appBarHeightDesktop),
  },
  mainBar: {
    background: theme.backgroundBlue,
    padding: [[0, 20]],
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
  },
  mainBarMobile: {
    height: theme.appBarHeightMobile,
  },
  mainBarDesktop: {
    height: theme.appBarHeightDesktop,
  },
  toolbarMobile: {
    justifyContent: 'space-between',
    height: theme.appBarHeightMobile,
  },
  toolbarDesktop: {
    justifyContent: 'space-between',
    height: theme.appBarHeightDesktop,
  },
  menuButton: {
    marginLeft: 12,
    padding: 0,
  },
  logoDesktop: {
    height: 30,
  },
  logoMobile: {
    height: 22,
  },
});

const useStyles = makeStyles(styles);

const getProgress = (currentStage: number): number => {
  const numberOfStages = 5;
  if (currentStage <= 3) {
    return (100 / numberOfStages) * (currentStage + 1);
  }

  return 100;
};

function App() {
  const isMobile = useIsMobile();
  const classes = useStyles({ isMobile });
  const hash = useGetHash();

  useEffect(() => {
    // Enable this if you decide to load translations from the backend -
    // currently they're hardcoded in translations.js
    // action('ELEMENTS_LOAD');
  }, []);

  const initialStage = parseInt(process.env.REACT_APP_INITIAL_STAGE) || 0;
  const [stage, setStage] = useState(initialStage);
  const progress = getProgress(stage);

  const renderStage = (stage) => {
    switch (stage) {
      case 0:
        return <Disclaimer onNext={() => setStage(stage + 1)} progressCompleted={progress} />;
      case 1:
        return (
          <Emergency
            progressCompleted={progress}
            onNext={(response) => (response === true ? setStage(100) : setStage(stage + 1))}
          />
        );
      case 2:
        return (
          <Location
            onPrevious={() => setStage(stage - 1)}
            onNext={() => setStage(stage + 1)}
            progressCompleted={progress}
          />
        );
      case 3:
        return (
          <Survey
            onPrevious={() => setStage(stage - 1)}
            onClose={() => setStage(99)}
            progressCompleted={progress}
          />
        );
      case 99:
        return <Instructions onClose={() => setStage(101)} />;
      case 100:
        return <Call911 />;
      //default: return <Survey onClose={() => setStage(stage+1)}/>;
    }
  };
  const renderMobileStage = (stage) => {
    switch (stage) {
      case 0:
        return <MobileDisclaimer onNext={() => setStage(stage + 1)} progressCompleted={progress} />;
      case 1:
        return (
          <MobileEmergency
            progressCompleted={progress}
            onNext={(response) => (response === true ? setStage(100) : setStage(stage + 1))}
          />
        );
      case 2:
        return (
          <MobileLocation
            progressCompleted={progress}
            onPrevious={() => setStage(stage - 1)}
            onNext={() => setStage(stage + 1)}
          />
        );
      /*
      case 3:
        return (
          <MobileBasicInfo
            onNext={() => setStage(stage + 1)}
            onPrevious={() => setStage(stage - 1)}
          />
        );
*/
      case 3:
        return (
          <MobileSurvey
            onPrevious={() => setStage(stage - 1)}
            onClose={() => setStage(99)}
            progressCompleted={progress}
          />
        );
      case 99:
        return <MobileInstructions onClose={() => setStage(101)} />;
      case 100:
        return <MobileCall911 onClose={() => setStage(stage + 1)} />;
      case 101:
        return <MobileMap />;
      // default: return <MobileSurvey
      //     step={stage-1}
      //     onNext={() => setStage(stage+1)}
      //     onPrevious={() => setStage(stage-1)}
      //     onClose={() => setStage(99)}
      // />;
    }
  };

  if (hash == null) {
    return <Loading />;
  }

  return (
    <>
      <CssBaseline />
      <AppBar
        className={clsx(
          classes.mainBar,
          !isMobile && classes.mainBarDesktop,
          isMobile && classes.mainBarMobile,
        )}
        position="fixed"
        elevation={0}
      >
        <Toolbar
          className={isMobile ? classes.toolbarMobile : classes.toolbarDesktop}
          disableGutters={true}
        >
          <img
            className={clsx(!isMobile && classes.logoDesktop, isMobile && classes.logoMobile)}
            src="HDYFLogoWhite@2x.png"
            alt="HowDoYouFeel?org"
          />
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />

      {isMobile ? renderMobileStage(stage) : renderStage(stage)}

      <AjaxInProgressDialog />
      <AjaxFailureDialog />
    </>
  );
}

export default App;
