export interface UserProfile {
  name: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  heightCm?: number;
  weightKg?: number;
  activityLevel?: 'Low' | 'Medium' | 'High';
  goals?: string;
  stepsGoal?: number;
  stepsToday?: number;
}

export const defaultProfile: UserProfile = {
  name: 'Guest',
  age: undefined,
  gender: 'other',
  heightCm: undefined,
  weightKg: undefined,
  activityLevel: 'Medium',
  goals: 'Stay active and healthy',
  stepsGoal: 8000,
  stepsToday: 0,
};
