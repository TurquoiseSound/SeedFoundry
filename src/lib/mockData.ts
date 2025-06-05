import { Goal, Item } from '../types';

export const mockGoals: Goal[] = [
  { id: '1', value: '1', label: 'Maximize Social Impact' },
  { id: '2', value: '2', label: 'Sustainable Revenue' },
  { id: '3', value: '3', label: 'Community Ownership' },
  { id: '4', value: '4', label: 'Environmental Sustainability' },
  { id: '5', value: '5', label: 'Innovation Leadership' },
  { id: '6', value: '6', label: 'Decentralized Governance' },
  { id: '7', value: '7', label: 'Worker Empowerment' },
  { id: '8', value: '8', label: 'Open Source Development' },
  { id: '9', value: '9', label: 'Data Sovereignty' },
  { id: '10', value: '10', label: 'Regenerative Economics' },
  { id: '11', value: '11', label: 'Ethical AI Development' },
  { id: '12', value: '12', label: 'Platform Cooperativism' },
  { id: '13', value: '13', label: 'Indigenous Wisdom Integration' },
  { id: '14', value: '14', label: 'Intergenerational Equity' },
  { id: '15', value: '15', label: 'Bioregional Resilience' }
];

export const mockItems: Item[] = [
  {
    id: '1',
    name: 'Public Benefit Corporation',
    description:
      'A for-profit corporation that includes positive impact on society, workers, the community and the environment.',
    advantages: [
      {
        title: 'Legal Protection',
        description: 'Directors required to consider impact alongside profit',
      },
      {
        title: 'Brand Value',
        description: 'Strong signal to stakeholders about mission commitment',
      },
    ],
    disadvantages: [
      { title: 'Additional Reporting', description: 'Must report on social impact' },
      { title: 'Complex Balance', description: 'Need to manage both profit and impact goals' },
    ],
    examples: 'Patagonia, Kickstarter, Allbirds',
    resources: 'benefitcorp.net',
    entityTypes: [
      { id: 'et1', name: 'Corporation' },
      { id: 'et2', name: 'LLC' },
    ],
    businessModels: [
      { id: 'bm1', name: 'Direct Sales' },
      { id: 'bm2', name: 'Subscription' },
    ],
    fundingOptions: [
      { id: 'fo1', name: 'Impact Investment' },
      { id: 'fo2', name: 'Traditional VC' },
    ],
    relatedGoals: {
      '1': 0.9,
      '2': 0.7,
      '3': 0.8,
      '4': 0.85,
      '10': 0.75,
      '14': 0.8
    },
  },
  {
    id: '2',
    name: 'Worker Cooperative',
    description: 'A business owned and democratically controlled by its workers.',
    advantages: [
      { title: 'Employee Engagement', description: 'Workers directly benefit from success' },
      { title: 'Resilient Model', description: 'Distributed ownership increases stability' },
    ],
    disadvantages: [
      { title: 'Decision Making', description: 'Democratic process can slow decisions' },
      { title: 'Limited Capital', description: 'Traditional investors may be hesitant' },
    ],
    examples: 'Mondragon Corporation, Equal Exchange',
    resources: 'usworker.coop',
    entityTypes: [
      { id: 'et2', name: 'LLC' },
      { id: 'et3', name: 'Cooperative' },
    ],
    businessModels: [
      { id: 'bm1', name: 'Direct Sales' },
      { id: 'bm3', name: 'Service' },
    ],
    fundingOptions: [
      { id: 'fo3', name: 'Member Investment' },
      { id: 'fo4', name: 'Cooperative Loan Funds' },
    ],
    relatedGoals: {
      '2': 0.8,
      '3': 0.95,
      '4': 0.7,
      '6': 0.9,
      '7': 0.95,
      '12': 0.85
    },
  },
];