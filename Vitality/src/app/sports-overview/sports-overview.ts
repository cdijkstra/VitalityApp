import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sport } from '../models/sport.model';
import { PocketbaseService } from '../../services/pocketbase.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sports-overview',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule ],
  templateUrl: './sports-overview.html',
  styleUrl: './sports-overview.css',
})
export class SportsOverviewComponent {
  pocketBase = inject(PocketbaseService);
  sports = signal<Sport[]>([]);
  currentUserId: string | null = null;

  async ngOnInit() {
    const user = await this.pocketBase.getUser();
    this.currentUserId = user?.id || null;
    const sports = await this.pocketBase.getSports();
    this.sports.set(sports);
  }

  isFavorite(sportName: string): boolean {
    if (!this.currentUserId) return false;
    const sport = this.sports().find((s) => s.titel === sportName);
    if (!sport || !sport.ingeschreven_collegas) return false;
    return sport.ingeschreven_collegas.includes(this.currentUserId);
  }

  async toggleFavorite(sportName: string) {
    const sport = this.sports().find((s) => s.titel === sportName);
    if (!sport) return;

    const isCurrentlyFavorite = this.isFavorite(sportName);

    // Fetch the latest sport data before updating to ensure we have current state
    const latestSport = await this.pocketBase.getSportById(sport.id);

    if (isCurrentlyFavorite) {
      alert('Je bent uitgeschreven van deze sport');
      await this.pocketBase.schrijfUitVanSport(latestSport);
    } else {
      alert('Je bent ingeschreven voor deze sport');
      await this.pocketBase.doeMeeAanSport(latestSport);
    }

    // Refresh the sports list to get updated data
    const updatedSports = await this.pocketBase.getSports();
    this.sports.set(updatedSports);
  }

  getSortedSports(): Sport[] {
    return [...this.sports()].sort((a, b) => {
      const aFav = this.isFavorite(a.titel);
      const bFav = this.isFavorite(b.titel);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
  }
}
