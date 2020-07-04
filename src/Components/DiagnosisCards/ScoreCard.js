//@flow
import * as React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import { useDiagnosisCardStyles } from './CardStyles';
import type { DiagnosisSeverity } from '../../models/Instruction';
import DiagnosisHigh from '../../assets/images/diagnosis_high.png';
import DiagnosisMedium from '../../assets/images/diagnosis_medium.png';
import DiagnosisLow from '../../assets/images/diagnosis_low.png';
import { SeverityContent } from './SeverityContent';
import { useSelector } from 'react-redux';

const IMAGE_MAPPING = {
  low: DiagnosisLow,
  medium: DiagnosisMedium,
  high: DiagnosisHigh,
};

export const ScoreCard = ({
  className,
  severity,
}: {
  className?: string,
  severity: DiagnosisSeverity,
}) => {
  const classes = useDiagnosisCardStyles();
  const language = useSelector((state) => state.language);
  const Image = IMAGE_MAPPING[severity];

  return (
    <Card className={clsx(classes.infoCard, className)}>
      <div className={classes.imageContainer}>
        <img src={Image} alt="Logo" />
      </div>
      <SeverityContent severity={severity} language={language} />
    </Card>
  );
};
