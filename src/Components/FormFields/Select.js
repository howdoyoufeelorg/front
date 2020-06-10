// @flow
import * as React from 'react';
import MuiSelect from '@material-ui/core/Select';
import { useStyles } from './FormFieldStyles';
import MenuItem from '@material-ui/core/MenuItem';

type Props = {
  placeholder?: string,
  options: Array<{ label: string, value: string | number }>,
};

export const Select = (props: Props) => {
  const { placeholder, options, ...rest } = props;
  const classes = useStyles();
  return (
    <MuiSelect className={classes.root} style={{ marginTop: 8 }} {...rest}>
      {placeholder ? (
        <MenuItem value="">
          <span className={classes.placeholder}>{placeholder}</span>
        </MenuItem>
      ) : null}
      {options.map(({ value, label }, index) => (
        <MenuItem key={index} value={value}>
          {label}
        </MenuItem>
      ))}
    </MuiSelect>
  );
};
