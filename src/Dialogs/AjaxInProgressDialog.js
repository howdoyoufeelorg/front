import React from "react";
import { Dialog, makeStyles } from "@material-ui/core";
import {CircularProgress} from "@material-ui/core";
import {connect} from "react-redux"
import { styles } from "./SSDialog_Styles"

const useStyles = makeStyles((theme) => ({
    ...styles(theme),
    spinner: {
        color: 'white'
    }
}))

const AjaxInProgressDialog = (props) => {
    const { ajax } = props
    const classes = useStyles(props)
    
    return (
        <Dialog
            fullWidth={true}
            maxWidth='lg'
            open={ajax.ajaxInProgress}
            disableBackdropClick
            PaperComponent={CircularProgress}
            classes={{ paper: classes.paperDialog }}
            PaperProps={{
                size: 120,
                className: classes.spinner
            }}
        >
            <React.Fragment/>
        </Dialog>
    )
}
const mapStateToProps = ({ajax}) => ({ajax})
const mapDispatchToProps = dispatch => ({dispatch})

export default connect(mapStateToProps, mapDispatchToProps)(AjaxInProgressDialog)
