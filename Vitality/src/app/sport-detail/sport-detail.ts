import { Component, inject, input, Input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Sport, sports } from '../models/sport.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sport-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sport-detail.html',
  styleUrl: './sport-detail.css',
})
export class SportDetailComponent {
  public readonly sportNameInput = input<string>('');
  public sportName = signal<string>('');

  selectedSport = signal<Sport | undefined>(undefined);
  private route = inject(ActivatedRoute);

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      const sportName = params.get('name') ?? '';
      this.selectedSport.set(sports.find((sport: Sport) => sport.name === sportName));
    });
  }
}
