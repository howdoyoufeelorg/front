import React, {useState}  from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from "@material-ui/core/Button";
import {Slider} from "./Slider";
import {TextField} from "@material-ui/core";
import {action} from "../sagas";

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
    const language = useSelector(state => state.language);
    let label;
    switch (language) {
        case 'en': label = 'NO'; break;
        case 'es': label = 'NO'; break;
    }
    return (
        <Button variant="contained" onClick={() => onClick()} className={classNames(classes.root, {
            [classes.selected]: state === false,
        })} >
            {label}
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
    const language = useSelector(state => state.language);
    let label;
    switch (language) {
        case 'en': label = 'YES'; break;
        case 'es': label = 'SI'; break;
    }
    return (
        <Button variant="contained" onClick={() => onClick()} className={classNames(classes.root, {
            [classes.selected]: state === true,
        })} >
            {label}
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
    const language = useSelector(state => state.language);
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
                <div className={classes.questionTitle}>{question.labels[language]}</div>
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
                        <div className={classes.questionTitle}>{question.additionalDataLabels[language]}</div>
                        { additionalDataInput }
                    </div>
                    :
                    ""
            }
        </>
    )
}