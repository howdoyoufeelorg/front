import React  from 'react';
import {useSelector} from "react-redux";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Slider as MaterialSlider} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {action} from "../sagas";
import {EmojiFrownIcon, EmojiGrinIcon, EmojiMehIcon, EmojiSmileIcon} from "../icons";

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

const marks = [
    {
        value: 1,
        label: <EmojiFrownIcon size="3x" color="red"/>,
    },
    {
        value: 4,
        label: <EmojiMehIcon size="3x" color="orange"/>,
    },
    {
        value: 7,
        label: <EmojiSmileIcon size="3x" color="yellow"/>,
    },
    {
        value: 10,
        label: <EmojiGrinIcon size="3x" color="green"/>,
    },
];

const PrettoSlider = withStyles({
    root: {
        color: '#000000',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(MaterialSlider);

export function Slider(props)
{
    const { question } = props;
    const language = useSelector(state => state.language);
    const classes = useStyles();
    const defaultValue = 6;
    return (
        <div className={classes.mainQuestion}>
            <PrettoSlider min={1} max={10} defaultValue={defaultValue} valueLabelDisplay="auto" marks={marks}
                            onChange={
                                (event, value) => action('ANSWER_SET', {questionId: question.id, data: {answer: value} })
                            }/>
            <Typography className={classes.questionTitle}>{question.labels[language]}</Typography>
        </div>
    )
}