import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class EventsComponent {
  events: Event[] = [
    {
      titel: 'Wakeboarden met Caesar',
      beschrijving: 'Doe mee met een spectaculaire wakeboardsessie samen met Caesar en collega’s!',
      datum: '15 november 2025',
    },
    {
      titel: 'Wekelijkse suiker minimalisatie uitdaging',
      beschrijving: 'Elke week proberen we samen zo min mogelijk suiker te eten. Doe jij ook mee?',
      datum: 'Start: 10 november 2025',
    },
    {
      titel: 'Samen boulderen in Amsterdam',
      beschrijving: 'Kom gezellig boulderen met collega’s in Amsterdam. Voor alle niveaus!',
      datum: '22 november 2025',
    },
  ];
}

interface Event {
  titel: string;
  beschrijving: string;
  datum: string;
}
