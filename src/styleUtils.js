//@flow
export type Width = number | 'fullWidth' | 'auto';

export const getWidth = (width: Width) => {
  if (width === 'fullWidth') {
    return '100%';
  }
  return width || '100%';
};
