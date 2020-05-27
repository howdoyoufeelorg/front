import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './HdyfMobileDialogCommonStyles';
import { useSelector } from 'react-redux';
import BlueButton from '../../Components/BlueButton';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import { Instruction } from '../../Components/Instruction';
import { TwitterResource } from '../../Components/TwitterResource';
import { action } from '../../sagas';
import clsx from 'clsx';

const useCommonStyles = makeStyles(styles);

const instructionsStyles = makeStyles((theme) => ({
  header: {
    padding: [[24, 32]],
    height: 100,
    border: `solid 1px ${theme.backgroundBlue}`,
    background: `linear-gradient(179deg, #70adf4 1%, #1a6ef5 156%)`,
    color: theme.white,
    fontSize: '1rem',
  },
  instructionsSection: {
    background: theme.grey,
    flex: 1,
  },
  instructionsCards: {
    position: 'relative',
    top: -24,
    padding: [[0, 20]],
  },
  instructionsPage: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  firstCard: {
    marginTop: 0,
  },
}));

export function MobileInstructions(props) {
  const classes = { ...useCommonStyles(), ...instructionsStyles() };
  const { onClose } = props;
  const onButtonClick = () => {
    onClose();
  };
  const { dialog_instructions_title, button_close } = useSelector((state) => state.elements);
  const language = useSelector((state) => state.language);

  const instructions = useSelector((state) => state.instructions);
  const resources = useSelector((state) => state.resources);
  const ajaxInProgress = useSelector((state) => state.ajax.ajaxInProgress);
  useEffect(() => {
    if (!ajaxInProgress) {
      action('INSTRUCTIONS_LOAD_SILENTLY');
    }
  }, [ajaxInProgress]);
  return (
    <div className={clsx(classes.content, classes.backgroundWhite, classes.instructionsPage)}>
      <div className={classes.header}>
        <h2 className={clsx(classes.title)}>{dialog_instructions_title[language]}</h2>
      </div>
      <div className={classes.instructionsSection}>
        <div className={classes.instructionsCards}>
          <Card className={clsx(classes.infoCard, classes.firstCard)}>
            Instructions for your area
            {instructions.map((instruction, index) => (
              <Instruction data={instruction} key={index} />
            ))}
          </Card>
          <Card className={classes.infoCard}>Local News Updates</Card>
          <Card className={classes.infoCard}>
            {resources.area && resources.area.twitterResources.length ? (
              <>
                LATEST TWITTER POSTS FOR YOUR AREA
                <hr />
                {resources.area.twitterResources.map((data, index) => (
                  <TwitterResource profile={data.value} key={index} />
                ))}
              </>
            ) : (
              ''
            )}
            {resources.state && resources.state.twitterResources.length ? (
              <>
                LATEST TWITTER POSTS FOR YOUR STATE
                <hr />
                {resources.state.twitterResources.map((data, index) => (
                  <TwitterResource profile={data.value} key={index} />
                ))}
              </>
            ) : (
              ''
            )}
          </Card>
        </div>
      </div>
      <AppBar className={classes.commandBar} position="fixed" variant="elevation">
        <BlueButton
          variant="default"
          className={classes.commandButton}
          onClick={() => onButtonClick()}
        >
          {button_close[language]}
        </BlueButton>
      </AppBar>
    </div>
  );
}
