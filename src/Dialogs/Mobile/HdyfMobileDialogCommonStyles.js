export const styles = theme => ({
    root: {

    },
    title: {
        textAlign: "center",
        color: theme.white,
        fontWeight: "900",
    },
    infoCard: {
        width: '96%',
        background: theme.white,
        borderRadius: theme.globalRadius,
        margin: [[10, 'auto']],
        minHeight: 40,
        padding: [[10]],
    },
    surveyCard: {
        width: '100%',
        background: theme.grey,
        borderRadius: theme.globalRadius,
        minHeight: 200,
        padding: [[10, 20]]
    },
    commandBar: {
        top: 'auto',
        bottom: 0,
        borderRadius: [[theme.globalRadius, theme.globalRadius, 0, 0]],
        background: theme.grey,
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "row",
    },
    commandButton: {
        margin: [[20,0]]
    },
    question: {
        marginBottom: 10
    },
    formField: {
        padding: [[20, 0]]
    },
    strecher: {
        height: 84
    }
})
