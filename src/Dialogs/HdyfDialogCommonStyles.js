export const styles = theme => ({
    root: {

    },
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: 30,
    },
    content: {
        padding: 40
    },
    actions: {
        padding: [[20,20]]
    },
    question: {
        marginBottom: 25
    },
    zipCode: {
        fontSize: "1.6rem"
    },
    strecher: {
        height: 160
    },
    flagDropdown: {
        width: theme.inputControlWidth,
        'margin-top': '8px',
        '& button': {
            width: '100%',
            border: `2px ${theme.blue} solid`,
            color: theme.blue,
            'border-radius': '4px',
            padding: '2px 8px',
            display: 'flex',
            'align-items': 'center',
        },
        '& .flag-select__option': {
            display: 'flex',
            'align-items': 'center',
            margin: '0',
        },
        '& img.flag-select__option__icon': {
            fontSize: 20,
            top: 'auto',
        },
        '& span.flag-select__option__label': {
            fontSize: '1.2em'
        }
    },
    formField: {
        padding: [[20, 0]]
    }
})
