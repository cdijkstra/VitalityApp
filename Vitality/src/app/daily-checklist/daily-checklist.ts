import { Component, signal, computed, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChecklistItem, checklistItems } from './checklist-item.model';

const STORAGE_KEY = 'daily-checklist-items';
const STORAGE_DATE_KEY = 'daily-checklist-date';

@Component({
  selector: 'app-daily-checklist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily-checklist.html',
  styleUrl: './daily-checklist.css',
})
export class DailyChecklist implements OnInit {
  checklistItems = signal<ChecklistItem[]>(checklistItems);
  private isInitialized = false;

  completedCount = computed(() => this.checklistItems().filter((item) => item.completed).length);

  totalCount = computed(() => this.checklistItems().length);

  constructor() {
    // Save to LocalStorage whenever checklistItems changes (after initialization)
    effect(() => {
      const items = this.checklistItems();
      if (this.isInitialized) {
        this.saveToLocalStorage(items);
      }
    });
  }

  ngOnInit() {
    this.loadFromLocalStorage();
    this.isInitialized = true;
  }

  private getTodayDateString(): string {
    return new Date().toDateString();
  }

  private saveToLocalStorage(items: ChecklistItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      localStorage.setItem(STORAGE_DATE_KEY, this.getTodayDateString());
    } catch (error) {
      console.error('Error saving to LocalStorage:', error);
    }
  }

  private loadFromLocalStorage(): void {
    try {
      const savedDate = localStorage.getItem(STORAGE_DATE_KEY);
      const todayDate = this.getTodayDateString();

      // If it's a new day, reset all items and save
      if (!savedDate || savedDate !== todayDate) {
        this.resetAll();
        // Manually save since effect won't run during initialization
        this.saveToLocalStorage(this.checklistItems());
        return;
      }

      // Load saved items if it's the same day
      const savedItems = localStorage.getItem(STORAGE_KEY);
      if (savedItems) {
        const parsedItems = JSON.parse(savedItems) as ChecklistItem[];
        // Ensure all items from the model are present (in case new items were added)
        const mergedItems = checklistItems.map((defaultItem) => {
          const savedItem = parsedItems.find((item) => item.name === defaultItem.name);
          return savedItem ? savedItem : defaultItem;
        });
        this.checklistItems.set(mergedItems);
      }
    } catch (error) {
      console.error('Error loading from LocalStorage:', error);
      // If there's an error, use default items
      this.checklistItems.set(checklistItems);
    }
  }

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
