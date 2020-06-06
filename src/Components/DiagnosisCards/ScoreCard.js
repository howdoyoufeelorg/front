//@flow
import * as React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import {useDiagnosisStyles} from "./CardStyles";

export const ScoreCard = ({ className }: { className?: string }) => {
  const classes = useDiagnosisStyles();
  return <Card className={clsx(classes.infoCard, className)}>Score Card</Card>;
};
