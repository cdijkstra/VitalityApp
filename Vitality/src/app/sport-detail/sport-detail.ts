import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sport-detail',
  standalone: true,
  imports: [],
  templateUrl: './sport-detail.html',
  styleUrl: './sport-detail.css',
})
export class SportDetailComponent {
  sportName = '';

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.sportName = params.get('name') ?? '';
    });
  }
}
