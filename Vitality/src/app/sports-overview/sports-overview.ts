import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sports-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
