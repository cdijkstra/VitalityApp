import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistItem, checklistItems } from './checklist-item.model';

@Component({
  selector: 'app-daily-checklist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-checklist.html',
  styleUrl: './daily-checklist.css',
})
export class DailyChecklist {
  checklistItems = signal<ChecklistItem[]>(checklistItems);

  completedCount = computed(() => this.checklistItems().filter((item) => item.completed).length);

  totalCount = computed(() => this.checklistItems().length);

  toggleCompleted(item: ChecklistItem) {
    this.checklistItems.update((items) =>
      items.map((i) => (i.name === item.name ? { ...i, completed: !i.completed } : i))
    );
  }

  completeItem(item: ChecklistItem) {
    this.checklistItems.update((items) =>
      items.map((i) => (i.name === item.name ? { ...i, completed: true } : i))
    );
  }

  incompleteItem(item: ChecklistItem) {
    this.checklistItems.update((items) =>
      items.map((i) => (i.name === item.name ? { ...i, completed: false } : i))
    );
  }

  resetAll() {
    this.checklistItems.update((items) => items.map((item) => ({ ...item, completed: false })));
  }
}
