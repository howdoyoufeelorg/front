//@flow
export type GeoEntity = 'zipcode' | 'area' | 'state';

export type DiagnosisSeverity = 'low' | 'medium' | 'high';

export const GEO_ENTITY = {
  zipcode: 'zipcode',
  area: 'area',
  state: 'state',
};

export type Instruction = {
  createdBy: string,
  createdAt: string,
  updatedAt: string,
  contents: {
    en: string,
    es: string,
  },
  geoentity: GeoEntity,
};
