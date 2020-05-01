import React  from 'react';
import {useSelector} from "react-redux";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Slider as MaterialSlider} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {action} from "../sagas";
import {EmojiFrownIcon, EmojiGrinIcon, EmojiMehIcon, EmojiSmileIcon} from "../icons";

const useStyles = makeStyles({
    sliderWrapper: {
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

const HDYFSlider = withStyles(theme => ({
    root: {
        color: '#000000',
        height: 8,
    },
    thumb: {
        height: 33,
        width: 33,
        backgroundColor: '#fff',
        border: '2px solid',
        borderColor: theme.backgroundBlue,
        marginTop: -13,
        marginLeft: -17,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
        '&::after': {
            content: 'a'
        },
        '& .circle': {
            height: 10,
            width: 10,
            borderRadius: 10,
            backgroundColor: theme.backgroundBlue,
            marginLeft: 1,
            marginRight: 1,
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.backgroundBlue,
    },
    rail: {
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.backgroundBlue,
    },
}))(MaterialSlider);

function HDYFThumbComponent(props) {
    return (
        <span {...props}>
          <span className="circle"/>
        </span>
    );
}

export function Slider(props)
{
    const { question } = props;
    const language = useSelector(state => state.language);
    const classes = useStyles();
    const defaultValue = 6;
    return (
        <div className={classes.sliderWrapper}>
            <Typography className={classes.questionTitle}>{question.labels[language]}</Typography>
            <HDYFSlider min={1} max={10} defaultValue={defaultValue} ThumbComponent={HDYFThumbComponent} //valueLabelDisplay="auto" marks={marks}
                            onChange={
                                (event, value) => action('ANSWER_SET', {questionId: question.id, data: {answer: value} })
                            }/>
        </div>
    )
}