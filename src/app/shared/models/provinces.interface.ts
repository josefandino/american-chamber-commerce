export interface CountryProvinceI {
  id: number;
  country: string;
  provinces: ProvinceI[];
}

export interface ProvinceI {
  id: number;
  city: string;
}
