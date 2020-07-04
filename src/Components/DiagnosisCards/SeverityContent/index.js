// @flow
import * as React from 'react';
import type { DiagnosisSeverity } from '../../../models/Instruction';
import { LowSeverity } from './LowSeverity';
import { MediumSeverity } from './MediumSeverity';
import { HighSeverity } from './HighSeverity';
import { useDiagnosisCardStyles } from '../CardStyles';
import { useSelector } from 'react-redux';
import { ExpandingText } from '../../ExpandingText';
import { useIsMobile } from '../../../Hooks/useIsMobile';

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
  const { isMobile } = useIsMobile();
  const classes = useDiagnosisCardStyles({ severity, isMobile });

  const SeverityComponent = COMPONENT_MAPPING[severity];
  const severityTitle = useSeverityTitle(severity, language);

  console.log('isMobile', isMobile);

  return (
    <div className={classes.severityContent}>
      <h2 className={classes.severityTitle}>{severityTitle}</h2>

      {isMobile ? (
        <ExpandingText className={classes.severityText}>
          <SeverityComponent language={language} />
        </ExpandingText>
      ) : (
        <div className={classes.severityText}>
          <SeverityComponent language={language} />
        </div>
      )}
    </div>
  );
};
