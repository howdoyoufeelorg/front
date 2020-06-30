// @flow
import * as React from 'react';
import type { DiagnosisSeverity } from '../../../models/Instruction';
import { LowSeverity } from './LowSeverity';
import { MediumSeverity } from './MediumSeverity';
import { HighSeverity } from './HighSeverity';
import { useDiagnosisCardStyles } from '../CardStyles';
import { useSelector } from 'react-redux';
import { ExpandingText } from '../../ExpandingText';

const COMPONENT_MAPPING: { [DiagnosisSeverity]: React.ComponentType<{| language: string |}> } = {
  low: LowSeverity,
  medium: MediumSeverity,
  high: HighSeverity,
};

const useSeverityTitle = (severity: DiagnosisSeverity, language: string) => {
  const elements = useSelector((state) => state.elements);

  return elements[`${severity}_severity_title`][language];
};

export const SeverityContent = ({
  severity,
  language,
}: {
  severity: DiagnosisSeverity,
  language: string,
}) => {
  const classes = useDiagnosisCardStyles({ severity });
  const SeverityComponent = COMPONENT_MAPPING[severity];
  const severityTitle = useSeverityTitle(severity, language);

  return (
    <div className={classes.severityContent}>
      <h2 className={classes.severityTitle}>{severityTitle}</h2>

      <ExpandingText className={classes.severityText}>
        <SeverityComponent language={language} />
      </ExpandingText>
    </div>
  );
};
