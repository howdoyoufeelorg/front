export const styles = theme => ({
    root: {
        // display: 'flex',
        // flexBasis: '100%',
        // height: '100%'
        flexGrow: 1,
    },

    title: {
        flexGrow: 1,
        marginLeft: 20
    },
    appWrapper: {
        position: 'fixed',
        top: theme.appBarHeight,
        left: 0,
        right: 0,
        bottom: 0
    },
    app: {
        display: 'flex',
        height: '100%',
    },
    appBar: {
        //zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: theme.appBarHeight,

    },
    menuButton: {
        marginLeft: 12,
        marginRight: 12,
    },
    hide: {
        display: 'none',
    },
    toolbar: {
        justifyContent: 'flex-start',
        height: theme.appBarHeight,
    },
    mainContent: {
        flexGrow: 1,
        padding: '0 10px 0 10px',
    },
    Spread: {
        flexGrow: 1
    },
    Survey: {

    }
});
