export const styles = (theme) => ({
  root: {},
  label: {
    fontWeight: 900,
    color: theme.textColor,
    fontSize: 18,
  },
  content: {
    padding: [[32, 22, 40, 22]],
    height: `calc(100vh - ${theme.appBarHeightMobile + theme.actionBarHeightMobile}px)`,
    overflow: 'scroll',
  },
  backgroundWhite: {
    backgroundColor: theme.white,
  },
  title: {
    marginTop: 0,
    textAlign: 'center',
    fontWeight: '900',
  },
  titleLarge: {
    fontSize: 32,
  },
  titleMedium: {
    fontSize: 28,
  },
  titleSmall: {
    fontSize: 26,
  },
  imageContainer: {
    textAlign: 'center',
    marginBottom: 20,
  },
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
  surveyCard: {
    width: '100%',
    padding: [[10, 20]],
    marginTop: 30,
  },
  commandBar: {
    top: 'auto',
    bottom: 0,
    borderRadius: 0,
    background: theme.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    boxShadow: '0 3px 60px 0 rgba(0, 0, 0, 0.16)',
    '& button:nth-of-type(2)': {
      marginLeft: 20,
    },
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  commandButton: {
    margin: [[20, 0]],
  },
  question: {
    marginBottom: 40,
  },
  formField: {
    marginBottom: 24,
  },
  strecher: {
    height: 84,
  },
});
