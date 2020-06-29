//@flow
import { makeStyles } from '@material-ui/core/styles';
import type { DiagnosisSeverity } from '../../models/Instruction';

const getTitleColor = (severity: DiagnosisSeverity, theme: any) => {
  if (severity === 'high') {
    return theme.red;
  }
  return severity === 'medium' ? theme.orange : theme.green;
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
    textAlign: 'center',
    '& img': {
      width: 157,
    },
  },
  severityContent: {},
  severityTitle: {
    fontSize: 28,
    fontWeight: 900,
    marginBottom: 8,
    marginTop: 16,
    color: ({ severity }: { severity: DiagnosisSeverity }) => getTitleColor(severity, theme),
  },
  severityText: {
    fontSize: 18,
    fontWeight: 'bold',
    maxHeight: 235,
    overflow: 'hidden',
    '& p:first-of-type': {
      fontWeight: 900,
    },
  },
  textExpanded: {
    maxHeight: 'none',
  },
  showMoreButton: {
    color: theme.blue,
    fontWeight: 900,
    fontSize: 18,
    padding: 0,
    marginTop: 14,
  },
});

export const useDiagnosisCardStyles = makeStyles(diagnosisCardStyles);
