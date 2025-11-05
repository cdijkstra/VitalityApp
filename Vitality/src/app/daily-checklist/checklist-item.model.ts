export interface ChecklistItem {
  name: string;
  description: string;
  completed: boolean;
  reminderTime?: string; // ISO time string, e.g. '08:00' or '20:30'
}

export const checklistItems: ChecklistItem[] = [
  {
    name: 'Boulder more',
    description: 'Boulder with some great colleagues',
    completed: false,
    reminderTime: '08:00',
  },
  {
    name: 'Brush teeth',
    description: 'Brush teeth with toothpaste or vodka',
    completed: false,
    reminderTime: '07:30',
  },
  {
    name: 'Drink water',
    description: 'Drink 2 liters of water',
    completed: false,
    reminderTime: '09:00',
  },
  {
    name: 'Exercise',
    description: 'Exercise for a bit at office',
    completed: false,
    reminderTime: '14:00',
  },
  {
    name: 'Read',
    description: 'Read for 30 minutes',
    completed: false,
    reminderTime: '20:00',
  },
  {
    name: 'Sleep',
    description: 'Sleep for 8 hours',
    completed: false,
    reminderTime: '23:00',
  },
  {
    name: 'Relax',
    description: 'Relax for 10 minutes',
    completed: false,
    reminderTime: '15:00',
  },
  {
    name: 'Meditate',
    description: 'Meditate for 10 minutes',
    completed: false,
    reminderTime: '07:00',
  },
  {
    name: 'Eat fruit',
    description: 'Eat a piece of fruit',
    completed: false,
    reminderTime: '11:00',
  },
];
