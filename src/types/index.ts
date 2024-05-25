export type Item = EntityType | BusinessModel | FundingOption;

export type EntityType = {
  id: string;
  name: string;
  description?: string;
  advantages?: Advantage[];
  disadvantages?: Advantage[];
  examples?: Resource[];
  links?: Resource[];
  entityTypes?: EntityType[];
  businessModels?: BusinessModel[];
  fundingOptions?: FundingOption[];
  relatedGoals?: RelatedGoalMap;
  goalScore?: number;
};

export type BusinessModel = {
  id: string;
  name: string;
  description?: string;
  advantages?: Advantage[];
  disadvantages?: Advantage[];
  examples?: Resource[];
  links?: Resource[];
  entityTypes?: EntityType[];
  businessModels?: BusinessModel[];
  fundingOptions?: FundingOption[];
  relatedGoals?: RelatedGoalMap;
  goalScore?: number;
};

export type FundingOption = {
  id: string;
  name: string;
  description?: string;
  advantages?: Advantage[];
  disadvantages?: Advantage[];
  examples?: Resource[];
  links?: Resource[];
  businessModels?: BusinessModel[];
  entityTypes?: EntityType[];
  fundingOptions?: FundingOption[];
  relatedGoals?: RelatedGoalMap;
  goalScore?: number;
};

export type Advantage = {
  title: string;
  description?: string;
}

export type Resource = {
  content: string;
  link?: string;
}

export type Goal = {
  id: string
  value: string
  label: string
}

export type RelatedGoalMap = { [id: string] : number }
