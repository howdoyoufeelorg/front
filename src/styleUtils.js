//@flow
export type Width = number | 'fullWidth' | 'auto';

export const getWidth = (width: Width) => {
  if (width === 'fullWidth') {
    return '100%';
  }
  return width || '100%';
};

export const inputBoxShadow = {
  boxShadow: '8px 8px 24px 0 rgba(86, 133, 247, 0.5)',
  '-moz-box-shadow': '8px 8px 24px 0px rgba(86,133,247,0.75)',
  '-webkit-box-shadow': '8px 8px 24px 0px rgba(86,133,247,0.75)',
};
