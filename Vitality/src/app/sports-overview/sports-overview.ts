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
  private favoriteKey = 'favoriteSports';
  favoriteSports = signal<string[]>(this.getFavorites());

  pocketBase = inject(PocketbaseService);
  sports = signal<Sport[]>([]);

  async ngOnInit() {
    const sports = await this.pocketBase.getSports();

    this.sports.set(sports);
  }

  getFavorites(): string[] {
    const favs = localStorage.getItem(this.favoriteKey);
    return favs ? JSON.parse(favs) : [];
  }

  isFavorite(sportName: string): boolean {
    return this.favoriteSports().includes(sportName);
  }

  toggleFavorite(sportName: string) {
    const favs = this.favoriteSports();
    let updated: string[];
    if (favs.includes(sportName)) {
      updated = favs.filter((name) => name !== sportName);
    } else {
      updated = [...favs, sportName];
    }
    this.favoriteSports.set(updated);
    localStorage.setItem(this.favoriteKey, JSON.stringify(updated));
  }

  getSortedSports(): Sport[] {
    const favs = this.favoriteSports();
    return [...this.sports()].sort((a, b) => {
      const aFav = favs.includes(a.titel);
      const bFav = favs.includes(b.titel);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
  }
}
