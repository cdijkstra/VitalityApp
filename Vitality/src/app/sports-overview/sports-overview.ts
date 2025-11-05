import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { sports } from '../models/sport.model';

@Component({
  selector: 'app-sports-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sports-overview.html',
  styleUrl: './sports-overview.css',
})
export class SportsOverviewComponent {
  sports = signal(sports);
}
