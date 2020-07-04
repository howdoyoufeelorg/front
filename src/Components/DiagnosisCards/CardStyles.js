//@flow
import { makeStyles } from '@material-ui/core/styles';
import type { DiagnosisSeverity } from '../../models/Instruction';

const getTitleColor = (severity: DiagnosisSeverity, theme: any) => {
  if (severity === 'high') {
    return theme.red;
  }
  return severity === 'medium' ? theme.orange : theme.green;
};

type Props = {
  isMobile: boolean,
  severity: DiagnosisSeverity,
};

export const diagnosisCardStyles = (theme: any) => ({
  infoCard: {
    width: '100%',
    background: theme.white,
    borderRadius: theme.globalRadius,
    minHeight: 40,
    padding: [[16, 24]],
    fontSize: '1rem',
    boxShadow: '0 3px 60px 0 rgba(0, 0, 0, 0.16)',
    marginBottom: 20,
  },
  imageContainer: {
    marginTop: 16,
    textAlign: 'center',
    '& img': {
      width: 157,
    },
  },
  severityContent: {
    textAlign: 'center',
    marginBottom: 36,
  },
  severityTitle: {
    fontSize: ({ isMobile }: Props) => (isMobile ? 28 : 42),
    fontWeight: 900,
    marginBottom: 8,
    marginTop: 16,
    color: ({ severity }: Props) => getTitleColor(severity, theme),
  },
  severityText: {
    fontSize: ({ isMobile }: Props) => (isMobile ? 18 : 23),
    '& p:first-of-type': {
      fontWeight: 900,
    },
    '& p:last-of-type': {
      marginBottom: 0,
    },
  },
  sectionTitle: {
    textAlign: 'center',
    fontWeight: 900,
  },
});

export const useDiagnosisCardStyles = makeStyles(diagnosisCardStyles);
