export type EntityType = {
  id: string;
  name: string;
  description?: string;
  advantages?: string[];
  disadvantages?: string[];
  examples?: string[];
  links?: string[];
  businessModels?: BusinessModel[];
  fundingOptions?: FundingOption[];
};

export type BusinessModel = {
  id: string;
  name: string;
  description?: string;
  advantages?: string[];
  disadvantages?: string[];
  examples?: string[];
  links?: string[];
  entityTypes?: EntityType[];
  fundingOptions?: FundingOption[];
};

export type FundingOption = {
  id: string;
  name: string;
  description?: string;
  advantages?: string[];
  disadvantages?: string[];
  examples?: string[];
  links?: string[];
  businessModels?: BusinessModel[];
  entityTypes?: EntityType[];
};