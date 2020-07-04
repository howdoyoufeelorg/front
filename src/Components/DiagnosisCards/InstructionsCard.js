// @flow
import React from 'react';
import type { GeoEntity, Instruction } from '../../models/Instruction';
import { useDiagnosisCardStyles } from './CardStyles';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import { InstructionRow } from '../InstructionRow';
import { makeStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const useStyles = makeStyles(styles);

export const InstructionsCard = ({
  instructions,
  geoEntity,
  className,
}: {
  instructions: Array<Instruction>,
  geoEntity: GeoEntity,
  className?: string,
}) => {
  const diagnosisClasses = useDiagnosisCardStyles();
  const classes = useStyles();

  return (
    <Card className={clsx(diagnosisClasses.infoCard, className)}>
      <div className={diagnosisClasses.sectionTitle}>Instructions for your area</div>
      <hr />
      {instructions && instructions.length ? (
        instructions.map((instruction: Instruction, index) => (
          <InstructionRow instruction={instruction} key={index} />
        ))
      ) : (
        <div style={{ textAlign: 'center', marginTop: 20 }}>No Instructions available for you!</div>
      )}
    </Card>
  );
};
