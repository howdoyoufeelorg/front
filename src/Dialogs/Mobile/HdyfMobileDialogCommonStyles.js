export const styles = (theme) => ({
  root: {},
  label: {
    fontWeight: 900,
  },
  content: {
    padding: 16,
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
  infoCard: {
    width: '96%',
    background: theme.white,
    borderRadius: theme.globalRadius,
    margin: [[10, 'auto', 40, 'auto']],
    minHeight: 40,
    padding: [[16]],
    fontSize: '1rem',
  },
  surveyCard: {
    width: '100%',
    padding: [[10, 20]],
  },
  commandBar: {
    top: 'auto',
    bottom: 0,
    borderRadius: [[theme.globalRadius, theme.globalRadius, 0, 0]],
    background: theme.grey,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  commandButton: {
    margin: [[20, 0]],
  },
  question: {
    marginBottom: 10,
  },
  formField: {
    marginBottom: 20,
  },
  strecher: {
    height: 84,
  },
});
