// @flow
import React from 'react';
import type { GeoEntity, Instruction } from '../../models/Instruction';
import { useDiagnosisStyles } from './CardStyles';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import {InstructionRow} from "../InstructionRow";

export const InstructionsCard = ({
  instructions,
  geoEntity,
  className,
}: {
  instructions: Array<Instruction>,
  geoEntity: GeoEntity,
  className?: string,
}) => {
  const classes = useDiagnosisStyles();
  return <Card className={clsx(classes.infoCard, className)}>
      Instructions for your area
      {instructions.map((instruction: Instruction, index) => (
          <InstructionRow data={instruction} key={index} />
      ))}
  </Card>;
};
