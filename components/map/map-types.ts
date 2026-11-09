export type Region = 'East Africa' | 'West Africa' | 'Central Africa' | 'Southern Africa';

export interface CountryProject {
  title: string;
  location: string;
  summary: string;
  outcome: string;
  partners: string[];
  evidence: string[];
  methods: string[];
  timeline?: string;
  budget_scope?: string;
  key_deliverables?: string[];
  client?: string;
  year?: string;
  type?: string;
  bullets?: string[];
}

export interface CountryRecord {
  id?: number;
  name: string;
  geoName?: string;
  code: string;
  region: Region | string;
  projects: number;
  engagement: number;
  overview: string;
  focus: string[];
  impact: string[];
  locations: string[];
  stats: Array<{ label: string; value: string }>;
  workDone: string[];
  featuredProject?: CountryProject;
}

export interface DetailedCountryRecord extends CountryRecord {
  projectBlueprints?: CountryProject[];
  projectsList?: CountryProject[];
}

export const formatFarmers = (engagement: number): string => `${Math.round(engagement / 1000)}K+`;

export const regionFill = (region: Region | string): string => {
  switch (region) {
    case 'West Africa':
      return 'rgba(180, 83, 9, 0.30)';
    case 'Central Africa':
      return 'rgba(22, 101, 52, 0.28)';
    case 'Southern Africa':
      return 'rgba(22, 163, 74, 0.24)';
    default:
      return 'rgba(15, 61, 49, 0.34)';
  }
};
