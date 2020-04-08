import React, {useState, useEffect}  from 'react';
import {action} from "../sagas";
import ReactFlagsSelect from "react-flags-select";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    flagDropdown: {
        '& img.flag-select__option__icon': {
            fontSize: 20
        },
        '& span.flag-select__option__label': {
            fontSize: '1.2em'
        }
    }
});

const getCountryCodeFromLanguage = (language) => {
    switch(language) {
        case 'en': return 'US';
        case 'es': return 'ES';
    }
};

export const LanguageSelector = () => {
    const {language_selector_search_placeholder} = useSelector(state => state.elements);
    const language = useSelector(state => state.language);
    const currentLanguageCountryCode = getCountryCodeFromLanguage(language)
    const classes = useStyles();
    return(
        <ReactFlagsSelect defaultCountry={currentLanguageCountryCode} searchable={true} searchPlaceholder={language_selector_search_placeholder[language]}
                          countries={['US', 'ES']} className={classes.flagDropdown}
                          customLabels={{"US": "US English", "ES": "Spanish"}}
                          onSelect={(value) => action('LANGUAGE_SET', {language: value})} />
    )
};