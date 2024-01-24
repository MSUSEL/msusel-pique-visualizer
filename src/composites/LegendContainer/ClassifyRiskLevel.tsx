type RiskLevel = 'Severe' | 'High' | 'Medium' | 'Low' | 'Insignificant';

export function classifyRiskLevel(value: number): RiskLevel {
  if (value >= -1 && value < 0.2) return 'Severe';
  if (value >= 0.2 && value < 0.4) return 'High';
  if (value >= 0.4 && value < 0.6) return 'Medium';
  if (value >= 0.6 && value < 0.8) return 'Low';
  if (value >= 0.8 && value <= 1) return 'Insignificant';
  throw new Error('Value out of range');
}



