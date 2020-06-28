//@flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './HdyfMobileDialogCommonStyles';
import { useSelector } from 'react-redux';
import BlueButton from '../../Components/BlueButton';
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import { InstructionRow } from '../../Components/InstructionRow';
import { TwitterResource } from '../../Components/TwitterResource';
import clsx from 'clsx';
import { ScoreCard } from '../../Components/DiagnosisCards/ScoreCard';
import type { GeoEntity, Instruction } from '../../models/Instruction';
import type { UseInstructionsProps } from '../../Hooks/useInstructions';
import { useInstructions } from '../../Hooks/useInstructions';
import { InstructionsCard } from '../../Components/DiagnosisCards/InstructionsCard';
import { GEO_ENTITY } from '../../models/Instruction';
import { TwitterFeedCard } from '../../Components/DiagnosisCards/TwitterFeedCard';
import { filterInstructions } from '../Instructions';

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
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  firstCard: {
    marginTop: 0,
  },
}));

export function MobileInstructions(props: { onClose: () => void }) {
  const classes = { ...useCommonStyles(), ...instructionsStyles() };
  const { onClose } = props;
  const onButtonClick = () => {
    onClose();
  };
  const { dialog_instructions_title, button_close } = useSelector((state) => state.elements);
  const language = useSelector((state) => state.language);

  const { instructions, resources, severity }: UseInstructionsProps = useInstructions();

  const zipInstructions = filterInstructions(instructions, 'zipcode');
  const areaInstructions = filterInstructions(instructions, 'area');

  if (!severity) {
    return null;
  }

  return (
    <div className={clsx(classes.content, classes.backgroundWhite, classes.instructionsPage)}>
      <div className={classes.header}>
        <h2 className={clsx(classes.title)}>{dialog_instructions_title[language]}</h2>
      </div>
      <div className={classes.instructionsSection}>
        <div className={classes.instructionsCards}>
          <ScoreCard severity={severity} />
          <InstructionsCard instructions={zipInstructions} geoEntity={GEO_ENTITY.zipcode} />
          <InstructionsCard instructions={areaInstructions} geoEntity={GEO_ENTITY.area} />
          <TwitterFeedCard resources={resources} />
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
