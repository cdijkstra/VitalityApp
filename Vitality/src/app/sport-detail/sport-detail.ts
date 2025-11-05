import {Component, inject, input, Input, signal} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sport-detail',
  standalone: true,
  imports: [],
  templateUrl: './sport-detail.html',
  styleUrl: './sport-detail.css',
})
export class SportDetailComponent {
  public readonly sportNameInput = input<string>('');
  public sportName = signal<string>('');
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (!this.sportNameInput()) {
        this.sportName.set(params.get('name') ?? '');
      } else {
        this.sportName.set(this.sportNameInput());
      }
    });
  }
}
