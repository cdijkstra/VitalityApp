import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PocketbaseService } from '../../services/pocketbase.service';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="max-w-md mx-auto mt-12 bg-white p-6 rounded-lg shadow">
  <h2 class="text-2xl font-semibold mb-4">Sign out</h2>
  <p class="mb-4">Are you sure you want to sign out?</p>
  <div class="flex gap-3">
    <button (click)="confirm()" class="px-4 py-2 bg-red-600 text-white rounded">Sign out</button>
    <a routerLink="/profile" class="px-4 py-2 border rounded">Cancel</a>
  </div>
</div>`
})
export class SignOutComponent {
  constructor(private pocket: PocketbaseService, private router: Router) {}

  async confirm() {
    await this.pocket.logout();
    this.router.navigate(['/']);
  }
}
