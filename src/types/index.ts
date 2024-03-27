export type Item = EntityType | BusinessModel | FundingOption;

export type EntityType = {
  id: string;
  name: string;
  description?: string;
  advantages?: Advantage[];
  disadvantages?: Advantage[];
  examples?: string[];
  links?: string[];
  entityTypes?: EntityType[];
  businessModels?: BusinessModel[];
  fundingOptions?: FundingOption[];
};

export type BusinessModel = {
  id: string;
  name: string;
  description?: string;
  advantages?: Advantage[];
  disadvantages?: Advantage[];
  examples?: string[];
  links?: string[];
  entityTypes?: EntityType[];
  businessModels?: BusinessModel[];
  fundingOptions?: FundingOption[];
};

export type FundingOption = {
  id: string;
  name: string;
  description?: string;
  advantages?: Advantage[];
  disadvantages?: Advantage[];
  examples?: string[];
  links?: string[];
  businessModels?: BusinessModel[];
  entityTypes?: EntityType[];
  fundingOptions?: FundingOption[];
};

export type Advantage = {
  title: string;
  description?: string;
}
