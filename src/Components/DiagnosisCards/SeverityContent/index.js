// @flow
import * as React from 'react';
import type { DiagnosisSeverity } from '../../../models/Instruction';
import { LowSeverity } from './LowSeverity';
import { useDiagnosisCardStyles } from '../CardStyles';
import { useSelector } from 'react-redux';

export const SeverityContent = ({
  severity,
  language,
}: {
  severity: DiagnosisSeverity,
  language: string,
}) => {
  const classes = useDiagnosisCardStyles({ severity });
  const { low_severity_title } = useSelector((state) => state.elements);

  return (
    <div className={classes.severityContent}>
      <h2 className={classes.severityTitle}>{low_severity_title[language]}</h2>
      <div className={classes.severityText}>
        <LowSeverity language={language} />
      </div>
    </div>
  );
};
