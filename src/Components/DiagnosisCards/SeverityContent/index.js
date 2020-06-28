// @flow
import * as React from 'react';
import type { DiagnosisSeverity } from '../../../models/Instruction';
import { LowSeverity } from './LowSeverity';
import { MediumSeverity } from './MediumSeverity';
import { HighSeverity } from './HighSeverity';
import { useDiagnosisCardStyles } from '../CardStyles';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';

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
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  const classes = useDiagnosisCardStyles({ severity });
  const SeverityComponent = COMPONENT_MAPPING[severity];
  const severityTitle = useSeverityTitle(severity, language);

  const textClasses = clsx(classes.severityText, isExpanded ? classes.textExpanded : null);

  return (
    <div className={classes.severityContent}>
      <h2 className={classes.severityTitle}>{severityTitle}</h2>
      <div className={textClasses}>
        <SeverityComponent language={language} />
      </div>
      <Button className={classes.showMoreButton} onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Read less' : 'Read more'}
      </Button>
    </div>
  );
};
