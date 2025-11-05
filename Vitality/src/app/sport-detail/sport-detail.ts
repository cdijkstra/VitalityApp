import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PocketbaseService } from '../../services/pocketbase.service';
import { Sport } from '../models/sport.model';

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
  private router = inject(Router);
  collegaNames = signal<string[]>([]);

  pocketBase = inject(PocketbaseService);

  constructor() {
    this.route.params.subscribe((params) => {
      this.sportName.set(params['name']);
    });
  }

  async ngOnInit() {
    const selectedSport = (await this.pocketBase.getSports()).find(
      (sport: Sport) => sport.titel === this.sportName()
    );
    if (selectedSport) {
      this.selectedSport.set(selectedSport);
    }

    const collegaNames = await this.getCollegaNames();
    this.collegaNames.set(collegaNames);
  }

  async getCollegaNames() {
    const allusers = await this.pocketBase.getAllUsers();
    const collegaNames = allusers.filter((user) =>
      this.selectedSport()?.ingeschreven_collegas?.includes(user.id)
    );
    return collegaNames.map((user) => user['email']);
  }

  goBack() {
    this.router.navigate(['/sports']);
  }
}
