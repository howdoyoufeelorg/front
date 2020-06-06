import { makeStyles } from '@material-ui/core/styles';

export const diagnosisStyles = (theme) => ({
  infoCard: {
    width: '100%',
    background: theme.white,
    borderRadius: theme.globalRadius,
    minHeight: 40,
    padding: [[16]],
    fontSize: '1rem',
    boxShadow: '0 3px 60px 0 rgba(0, 0, 0, 0.16)',
    marginBottom: 20,
  },
});

export const useDiagnosisStyles = makeStyles(diagnosisStyles);
