import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { sports as sportsData, Sport } from '../models/sport.model';

@Component({
  selector: 'app-sports-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sports-overview.html',
  styleUrl: './sports-overview.css',
})
export class SportsOverviewComponent {
  private favoriteKey = 'favoriteSports';
  favoriteSports = signal<string[]>(this.getFavorites());

  sports = signal<Sport[]>([...sportsData]);

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
      updated = favs.filter(name => name !== sportName);
    } else {
      updated = [...favs, sportName];
    }
    this.favoriteSports.set(updated);
    localStorage.setItem(this.favoriteKey, JSON.stringify(updated));
  }

  getSortedSports(): Sport[] {
    const favs = this.favoriteSports();
    return [...this.sports()].sort((a, b) => {
      const aFav = favs.includes(a.name);
      const bFav = favs.includes(b.name);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
  }
}
