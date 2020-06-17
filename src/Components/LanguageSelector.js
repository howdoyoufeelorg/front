import React from 'react';
import { action } from '../sagas';
import ReactFlagsSelect from 'react-flags-select';
import { useSelector } from 'react-redux';
import { useFlagDropdownStyles } from './FlagDropDown';
import clsx from 'clsx';

const getCountryCodeFromLanguage = (language) => {
  switch (language) {
    case 'en':
      return 'US';
    case 'es':
      return 'ES';
  }
};

export const LanguageSelector = () => {
  const { language_selector_search_placeholder } = useSelector((state) => state.elements);
  const language = useSelector((state) => state.language);
  const currentLanguageCountryCode = getCountryCodeFromLanguage(language);
  const classes = useFlagDropdownStyles({ width: 'auto' });
  return (
    <ReactFlagsSelect
      showSelectedLabel={false}
      defaultCountry={currentLanguageCountryCode}
      searchable={false}
      searchPlaceholder={language_selector_search_placeholder[language]}
      countries={['US', 'ES']}
      className={clsx(classes.flagDropdown, 'language-selector')}
      customLabels={{ US: 'US English', ES: 'Spanish' }}
      onSelect={(value) => action('LANGUAGE_SET', { language: value })}
      optionsSize={28}
    />
  );
};
