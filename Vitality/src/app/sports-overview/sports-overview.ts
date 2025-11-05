import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sports-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sports-overview.html',
  styleUrl: './sports-overview.css',
})

export class SportsOverviewComponent {
  famousSports: string[] = [
    'Voetbal',
    'Basketbal',
    'Tennis',
    'Cricket',
    'Zwemmen',
    'Badminton',
    'Golf',
    'Rugby'
  ];
}
