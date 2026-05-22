export interface Country {
  id: string;
  name: string;
  region: string;
  capital: string;
}

export interface SearchRes {
  results: Country[];
  query: string;
  count: number;
}
