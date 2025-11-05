export interface ChecklistItem {
  name: string;
  description: string;
  completed: boolean;
}

export const checklistItems: ChecklistItem[] = [
  {
    name: 'Boulder more',
    description: 'Boulder with some great colleagues',
    completed: false,
  },
  {
    name: 'Brush teeth',
    description: 'Brush teeth with toothpaste or vodka',
    completed: false,
  },
  {
    name: 'Drink water',
    description: 'Drink 2 liters of water',
    completed: false,
  },
  {
    name: 'Exercise',
    description: 'Exercise for 30 minutes',
    completed: false,
  },
  {
    name: 'Read',
    description: 'Read for 30 minutes',
    completed: false,
  },
  {
    name: 'Sleep',
    description: 'Sleep for 8 hours',
    completed: false,
  },
  {
    name: 'Relax',
    description: 'Relax for 10 minutes',
    completed: false,
  },
  {
    name: 'Meditate',
    description: 'Meditate for 10 minutes',
    completed: false,
  },
  {
    name: 'Eat fruit',
    description: 'Eat a piece of fruit',
    completed: false,
  },
];
