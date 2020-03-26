import React, {useState, useEffect}  from 'react';
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {Slider as MaterialSlider} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {action} from "./sagas";

const useStyles = makeStyles({
    mainQuestion: {
        width: '100%'
    },
    questionTitle: {
        fontSize: "1.2rem",
        marginBottom: 10,
        textAlign: "center"
    }
});

export function Slider(props)
{
    const { question } = props;
    const language = useSelector(state => state.language);
    const classes = useStyles();
    const defaultValue = 10;
    return (
        <div className={classes.mainQuestion}>
            <MaterialSlider min={1} max={10} defaultValue={defaultValue} valueLabelDisplay="auto"
                            onChange={
                                (event, value) => action('ANSWER_SET', {questionId: question.id, data: {answer: value} })
                            }/>
            <Typography className={classes.questionTitle}>{question.labels[language]}</Typography>
        </div>
    )
}