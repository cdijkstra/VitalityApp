import { Component } from '@angular/core';

@Component({
  selector: 'app-sports-overview',
  imports: [],
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
