//@flow
import MUITextField from '@material-ui/core/TextField';
import * as React from 'react';
import { useStyles } from './FormFieldStyles';
import { useIsMobile } from '../../Hooks/useIsMobile';

export const TextField = (props: any) => {
  const { width, value, ...textProps } = props;
  const isMobile = useIsMobile();
  const hasValue = !!value;

  const classes = useStyles({ isMobile, width, hasValue });

  // const TextFieldWithProps = React.useMemo(() => HDYFTextField({ width }), [width]);
  return (
    <MUITextField
      value={value}
      classes={{ root: classes.root }}
      InputLabelProps={{ shrink: true }}
      {...textProps}
    />
  );
};
