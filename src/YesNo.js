import React, {useState, useEffect}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from "@material-ui/core/Button";
import {Slider} from "./Slider";
import {TextField} from "@material-ui/core";
import {action} from "./sagas";

const useNoStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: '#00FF00',
        },
    },
    selected: {
        backgroundColor: '#00FF00'
    }
});
function NoButton(props)
{
    const classes = useNoStyles();
    const {state, onClick} = props;
    return (
        <Button variant="contained" onClick={() => onClick()} className={classNames(classes.root, {
            [classes.selected]: state === false,
        })} >
            No
        </Button>
    )
}

const useYesStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: '#FF0000',
        },
        marginLeft: 10
    },
    selected: {
        backgroundColor: '#FF0000'
    }
});
function YesButton(props)
{
    const classes = useYesStyles();
    const {state, onClick} = props;
    return (
        <Button variant="contained" onClick={() => onClick()} className={classNames(classes.root, {
            [classes.selected]: state === true,
        })} >
            Yes
        </Button>
    )
}

const useStyles = makeStyles({
     questionTitle: {
         fontSize: "1.6rem",
         marginBottom: 10
     },
    additionalData: {
         marginLeft: 20,
         color: 'blue'
    }
});

export function YesNo(props) {
    const {question} = props;
    const [state, setState] = useState(null);
    const classes = useStyles();
    let additionalDataInput;
    if (question.additionalDataType === 'slider') {
        additionalDataInput = <Slider />
    }
    if (question.additionalDataType === 'yesno') {
        additionalDataInput = <YesNo />
    }
    if (question.additionalDataType === 'entry') {
        additionalDataInput = <TextField onChange={(event) => action('ANSWER_SET', {questionId: question.id, data: {additionalData: event.target.value} })}/>
    }
    return (
        <>
            <div className={classes.mainQuestion}>
                <div className={classes.questionTitle}>{question.label}</div>
                <NoButton onClick={() => {
                    action('ANSWER_SET', {questionId: question.id, data: {answer: 'NO'} });
                    setState(false);
                }} state={state}   />
                <YesButton onClick={() => {
                    action('ANSWER_SET', {questionId: question.id, data: {answer: 'YES'} });
                    setState(true)
                }} state={state} />
            </div>
            {
                state && question.requiresAdditionalData ?
                    <div className={classes.additionalData}>
                        <div className={classes.questionTitle}>{question.additionalDataLabel}</div>
                        { additionalDataInput }
                    </div>
                    :
                    ""
            }
        </>
    )
}