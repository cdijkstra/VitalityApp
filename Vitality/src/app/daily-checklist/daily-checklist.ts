import { Component, signal } from '@angular/core';
import { ChecklistItem, checklistItems } from './checklist-item.model';

@Component({
  selector: 'app-daily-checklist',
  imports: [],
  templateUrl: './daily-checklist.html',
  styleUrl: './daily-checklist.css',
})
export class DailyChecklist {
  checklistItems = signal<ChecklistItem[]>(checklistItems);
}
