//@flow
import * as React from 'react';
import ReactFlagsSelect from "react-flags-select";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";

export const styles = (theme: any) => ({
    flagDropdown: {
        width: '100%',
        'margin-top': '8px',
        '& button': {
            width: '100%',
            border: `2px ${theme.blue} solid`,
            color: theme.blue,
            'border-radius': '4px',
            padding: '2px 8px',
            display: 'flex',
            'align-items': 'center',
        },
        '& .flag-select__option': {
            display: 'flex',
            'align-items': 'center',
            margin: '0',
        },
        '& img.flag-select__option__icon': {
            fontSize: 20,
            top: 'auto',
        },
        '& span.flag-select__option__label': {
            fontSize: '1.2em'
        }
    }
})

const useStyles = makeStyles(styles)

export const FlagDropDown = ({onSelect}: {onSelect: string => void}) => {
    const classes = useStyles();
    const {country_selector_search_placeholder} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);

    return <ReactFlagsSelect defaultCountry="US" searchable={true}
                             searchPlaceholder={country_selector_search_placeholder[language]}
                             className={classes.flagDropdown}
                             onSelect={onSelect}
    />
}
