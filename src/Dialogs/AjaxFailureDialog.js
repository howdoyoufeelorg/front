import React from "react"
import {
    Button,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    makeStyles
} from "@material-ui/core"
import {connect} from "react-redux"
import { styles } from "./SSDialog_Styles"

const useStyles = makeStyles((theme) => ({
    ...styles(theme),
    dialogTitle: {
        backgroundColor: theme.paleRed,
    },
}))

const AjaxFailureDialog = (props) => {
    const { ajax, dispatch } = props
    const classes = useStyles(props)

    function dismissDialog() {
        dispatch({type: 'AJAX_END'});
    };
    return (
        <Dialog
            fullWidth={true}
            maxWidth='lg'
            open={ajax.ajaxFailed}
            onClose={dismissDialog}
            classes={{ paper: classes.paperDialog }}
        >
            <DialogTitle className={classes.dialogTitle}>
                <span className={classes.dialogTitleText}>ERROR while communicating with server</span>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText>
                    { ajax.ajaxError }
                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button type="button" onClick={dismissDialog}>OK</Button>
            </DialogActions>
        </Dialog>
    )
}

const mapStateToProps = ({ajax}) => ({ajax})
const mapDispatchToProps = dispatch => ({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(AjaxFailureDialog)
