// Tag-Based Compatibility System Demo
// This shows how we could replace 1,400 manual mappings with smart tags

const COMPATIBILITY_TAGS = {
  // Goal-focused tags
  SOCIAL_IMPACT: 'social_impact',
  CONTROL: 'control', 
  FLEXIBILITY: 'flexibility',
  SPEED: 'speed',
  LOW_COST: 'low_cost',
  COLLABORATION: 'collaboration',
  TRANSPARENCY: 'transparency',
  GROWTH: 'growth',
  SUSTAINABILITY: 'sustainability',
  INNOVATION: 'innovation',
  
  // Structure tags
  LEGAL_SIMPLE: 'legal_simple',
  LEGAL_COMPLEX: 'legal_complex',
  PROFIT_FOCUSED: 'profit_focused',
  PURPOSE_DRIVEN: 'purpose_driven',
  TEAM_OWNERSHIP: 'team_ownership',
  
  // Funding tags
  TRADITIONAL: 'traditional',
  ALTERNATIVE: 'alternative',
  GRANTS_ELIGIBLE: 'grants_eligible',
  EQUITY_BASED: 'equity_based',
  DEBT_BASED: 'debt_based'
};

// Example tag assignments (much easier to maintain than 1,400 mappings!)
const SAMPLE_TAGS = {
  goals: {
    "I want to have the most possible social impact": [
      COMPATIBILITY_TAGS.SOCIAL_IMPACT,
      COMPATIBILITY_TAGS.PURPOSE_DRIVEN,
      COMPATIBILITY_TAGS.TRANSPARENCY,
      COMPATIBILITY_TAGS.SUSTAINABILITY
    ],
    "I want to retain control - me and other founders": [
      COMPATIBILITY_TAGS.CONTROL,
      COMPATIBILITY_TAGS.FLEXIBILITY,
      COMPATIBILITY_TAGS.TEAM_OWNERSHIP
    ],
    "I want to get started quickly and with minimal lawyer costs": [
      COMPATIBILITY_TAGS.SPEED,
      COMPATIBILITY_TAGS.LOW_COST,
      COMPATIBILITY_TAGS.LEGAL_SIMPLE
    ]
  },
  
  entityTypes: {
    "B-Corp": [
      COMPATIBILITY_TAGS.SOCIAL_IMPACT,
      COMPATIBILITY_TAGS.PURPOSE_DRIVEN,
      COMPATIBILITY_TAGS.TRANSPARENCY,
      COMPATIBILITY_TAGS.LEGAL_COMPLEX
    ],
    "LLC": [
      COMPATIBILITY_TAGS.CONTROL,
      COMPATIBILITY_TAGS.FLEXIBILITY,
      COMPATIBILITY_TAGS.LEGAL_SIMPLE,
      COMPATIBILITY_TAGS.SPEED
    ],
    "Worker Cooperative": [
      COMPATIBILITY_TAGS.SOCIAL_IMPACT,
      COMPATIBILITY_TAGS.COLLABORATION,
      COMPATIBILITY_TAGS.TEAM_OWNERSHIP,
      COMPATIBILITY_TAGS.PURPOSE_DRIVEN
    ]
  },
  
  businessModels: {
    "Subscription": [
      COMPATIBILITY_TAGS.GROWTH,
      COMPATIBILITY_TAGS.SUSTAINABILITY,
      COMPATIBILITY_TAGS.TRADITIONAL
    ],
    "Donation": [
      COMPATIBILITY_TAGS.SOCIAL_IMPACT,
      COMPATIBILITY_TAGS.PURPOSE_DRIVEN,
      COMPATIBILITY_TAGS.GRANTS_ELIGIBLE
    ]
  },
  
  fundingOptions: {
    "Impact Investment": [
      COMPATIBILITY_TAGS.SOCIAL_IMPACT,
      COMPATIBILITY_TAGS.PURPOSE_DRIVEN,
      COMPATIBILITY_TAGS.ALTERNATIVE,
      COMPATIBILITY_TAGS.EQUITY_BASED
    ],
    "Traditional VC": [
      COMPATIBILITY_TAGS.GROWTH,
      COMPATIBILITY_TAGS.CONTROL,
      COMPATIBILITY_TAGS.TRADITIONAL,
      COMPATIBILITY_TAGS.EQUITY_BASED
    ],
    "Grants": [
      COMPATIBILITY_TAGS.SOCIAL_IMPACT,
      COMPATIBILITY_TAGS.LOW_COST,
      COMPATIBILITY_TAGS.GRANTS_ELIGIBLE,
      COMPATIBILITY_TAGS.PURPOSE_DRIVEN
    ]
  }
};

// Compatibility calculation function
function calculateCompatibility(goalTags, itemTags) {
  const intersection = goalTags.filter(tag => itemTags.includes(tag));
  const union = [...new Set([...goalTags, ...itemTags])];
  
  // Jaccard similarity with bonus for matches
  const jaccardScore = (intersection.length / union.length) * 100;
  
  // Bonus points for direct matches
  const matchBonus = intersection.length * 10;
  
  // Ensure minimum score for any match
  const score = Math.min(100, Math.max(jaccardScore + matchBonus, intersection.length > 0 ? 20 : 0));
  
  return Math.round(score);
}

// Example usage
const socialImpactGoalTags = SAMPLE_TAGS.goals["I want to have the most possible social impact"];
const bCorpTags = SAMPLE_TAGS.entityTypes["B-Corp"];
const llcTags = SAMPLE_TAGS.entityTypes["LLC"];

console.log("🎯 Tag-Based Compatibility Examples:");
console.log(`Social Impact Goal + B-Corp: ${calculateCompatibility(socialImpactGoalTags, bCorpTags)}%`);
console.log(`Social Impact Goal + LLC: ${calculateCompatibility(socialImpactGoalTags, llcTags)}%`);

module.exports = {
  COMPATIBILITY_TAGS,
  SAMPLE_TAGS,
  calculateCompatibility
};