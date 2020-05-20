// @flow
import * as React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles(theme => ({
    mobileModalContent: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: `calc(100vh - ${theme.appBarHeightMobile}px)`,
    },
    mobileDrawer: {
        flex: '1',
        padding: 10,
        borderRadius: 12,
        marginTop: 20,
    },
    title: {
        textAlign: "center",
        color: theme.white,
        fontWeight: "900",
    },
    drawerTitle: {
        textAlign: "left",
        fontWeight: "900",
    },
}));

export const MobileModalContent = ({drawerTitle, title, renderDrawerContent, children}:
                                       { drawerTitle?: string, title?: string, renderDrawerContent: Function, children?: React.Node }) => {
    const classes = useStyles();

    return <div className={classes.mobileModalContent}>
        { !!title && <h2 className={classes.title}>{title}</h2> }
        {children}
        <Card className={classes.mobileDrawer}>
            { !!drawerTitle && <h2 className={classes.drawerTitle}>{drawerTitle}</h2> }
            {renderDrawerContent()}
        </Card>
    </div>
};
