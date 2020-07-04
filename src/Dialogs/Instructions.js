//@flow
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import { DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { action } from '../sagas';
import { InstructionRow } from '../Components/InstructionRow';
import { TwitterResource } from '../Components/TwitterResource';
import { LanguageSelector } from '../Components/LanguageSelector';
import { styles } from './HdyfDialogCommonStyles';
import BlueButton from '../Components/BlueButton';
import { DialogCard, DialogCardHeader } from './DialogCard';
import clsx from 'clsx';
import type { GeoEntity, Instruction } from '../models/Instruction';
import type { UseInstructionsProps } from '../Hooks/useInstructions';
import { useInstructions } from '../Hooks/useInstructions';
import { ScoreCard } from '../Components/DiagnosisCards/ScoreCard';
import { InstructionsCard } from '../Components/DiagnosisCards/InstructionsCard';
import { GEO_ENTITY } from '../models/Instruction';
import { TwitterFeedCard } from '../Components/DiagnosisCards/TwitterFeedCard';

const useStyles = makeStyles((theme) => ({
  container: {
    width: `calc(100vw - 96px)`,
    margin: [[24, 'auto']],
    boxShadow: '0 3px 60px 0 rgba(0, 0, 0, 0.16)',
    borderRadius: 10,
  },
  header: {
    border: `solid 1px ${theme.backgroundBlue}`,
    background: `linear-gradient(179deg, #70adf4 1%, #1a6ef5 156%)`,
    color: theme.white,
    fontSize: '1rem',
    textAlign: 'center',
    paddingTop: 52,
    paddingBottom: 60,
  },
  cardsContainer: {
    padding: [[20, 112]],
    position: 'relative',
    top: -50,
  },
  instructionCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gridColumnGap: 20,
  },
  title: {
    fontSize: 68,
    margin: 0,
    lineHeight: 1,
  },
}));

const hasResources = (resources) => {
  let has = false;
  Object.keys(resources).some((level) => {
    Object.keys(level).some((resourceItem) => {
      if (resourceItem.length) {
        has = true;
      }
      return has;
    });
    return has;
  });
  return has;
};

export const filterInstructions = (
  instructions: Array<Instruction>,
  geoEntity: GeoEntity,
): Array<Instruction> => {
  return instructions.filter((instruction: Instruction) => {
    return instruction.geoentity === geoEntity;
  });
};

export function Instructions() {
  const classes = useStyles();

  const { dialog_instructions_title, dialog_instructions_content, button_close } = useSelector(
    (state) => state.elements,
  );
  const language = useSelector((state) => state.language);

  const { instructions, resources, severity }: UseInstructionsProps = useInstructions();

  const zipInstructions = filterInstructions(instructions, 'zipcode');
  const areaInstructions = filterInstructions(instructions, 'area');

  if (!severity) {
    return null;
  }

  return (
    <DialogCard className={classes.container}>
      <div className={classes.header}>
        <h2 className={clsx(classes.title)}>{dialog_instructions_title[language]}</h2>
      </div>

      <div className={classes.cardsContainer}>
        <ScoreCard severity={severity} />
        <h3
          style={{
            textAlign: 'center',
            marginBottom: 24,
            fontSize: 42,
            marginTop: 40,
            fontWeight: 900,
          }}
        >
          Local Updates
        </h3>
        <div className={classes.instructionCards}>
          <TwitterFeedCard resources={resources} />
          <InstructionsCard instructions={zipInstructions} geoEntity={GEO_ENTITY.zipcode} />
          <InstructionsCard instructions={areaInstructions} geoEntity={GEO_ENTITY.area} />
        </div>
      </div>
    </DialogCard>
  );
}
