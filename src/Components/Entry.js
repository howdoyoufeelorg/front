import React, {useState}  from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from "@material-ui/core/Button";
import {Slider} from "./Slider";
import {YesNo} from "./YesNo";
import {TextField} from "@material-ui/core";
import {action} from "../sagas";

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

export function Entry(props) {
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
                <TextField onChange={(event) => action('ANSWER_SET', {questionId: question.id, data: {answer: event.target.value} })}/>
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