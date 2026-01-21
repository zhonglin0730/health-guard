export type Tab = 'home' | 'monitor' | 'tcm' | 'profile';

export interface OrganStatus {
  name: string;
  time: string;
  status: 'healthy' | 'sub-health' | 'risk';
  description: string;
}

export interface DiseaseRisk {
  name: string;
  probability: number; // 0-100
  trend: 'up' | 'down' | 'stable';
}

export interface DailyMetric {
  time: string;
  value: number;
  value2?: number; // For BP (Systolic/Diastolic)
}
