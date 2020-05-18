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
    },
    title: {
        textAlign: "center",
        color: theme.white,
        fontWeight: "900",
    },
}));

export const MobileModalContent = ({title, renderDrawerContent, children}:
                                       { title: string, renderDrawerContent: Function, children?: React.Node }) => {
    const classes = useStyles();

    return <div className={classes.mobileModalContent}>
        <h1 className={classes.title}>{title}</h1>
        {children}
        <Card className={classes.mobileDrawer}>
            {renderDrawerContent()}
        </Card>
    </div>
};
