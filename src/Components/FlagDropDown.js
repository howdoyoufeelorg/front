//@flow
import * as React from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { getWidth, inputBoxShadow } from '../styleUtils';
import type { Width } from '../styleUtils';

type FlagStyleProps = {
  width: Width,
};

export const flagDropdownStyles = (props: FlagStyleProps) => (theme: any) => {
  return {
    flagDropdown: {
      width: getWidth(props.width),
      'margin-top': '8px',
      '& button': {
        height: 45,
        width: '100%',
        border: `2px ${theme.blue} solid`,
        color: theme.blue,
        'border-radius': '4px',
        padding: '2px 8px',
        display: 'flex',
        'align-items': 'center',
      },
      '& button:focus': {
        ...inputBoxShadow,
      },
      '&.language-selector button:focus': {
        boxShadow: 'none',
      },
      '& .flag-select__options': {
        maxHeight: 312,
        marginTop: 14,
        padding: 16,
        borderRadius: 12,
        border: 0,
        boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.16)',
      },
      '& .filterBox': {
        height: 0,
        visibility: 'hidden',
        overflow: 'hidden',
        opacity: 0,
      },
      '& .flag-select__option.flag-select__option--placeholder': {
        display: 'flex',
        alignItems: 'center',
        margin: 0,
        padding: 0,
      },
      '& .flag-select__option': {
        display: 'block',
        textAlign: 'left',
        padding: 0,
      },
      '& .flag-select__option > span': {
        width: 'auto !important',
        display: 'flex',
        alignItems: 'center',
        margin: 4,
      },
      '& img.flag-select__option__icon': {
        fontSize: 20,
        top: 'auto',
        height: 'auto',
        borderRadius: 5,
      },
      '& span.flag-select__option__label': {
        marginLeft: 12,
        fontSize: 18,
        fontWeight: 600,
      },
    },
  };
};

export const useFlagDropdownStyles = (props?: FlagStyleProps) =>
  makeStyles(flagDropdownStyles(props || {}));

export const FlagDropDown = ({ onSelect }: { onSelect: (string) => void }) => {
  const classes = useFlagDropdownStyles({ width: 'fullWidth' })();
  console.log('classes', classes);
  const { country_selector_search_placeholder } = useSelector((state) => state.elements);
  const language = useSelector((state) => state.language);

  return (
    <ReactFlagsSelect
      defaultCountry="US"
      searchable={false}
      searchPlaceholder={country_selector_search_placeholder[language]}
      className={classes.flagDropdown}
      onSelect={onSelect}
      optionsSize={28}
    />
  );
};
