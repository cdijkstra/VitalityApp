import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PocketbaseService } from '../../services/pocketbase.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email = '';
  name = '';
  error = '';
  password = '';

  constructor(private pocket: PocketbaseService, private router: Router) {}

  async submit() {
    this.error = '';
    if (!this.email || !this.password) {
      this.error = 'Please enter both email and password.';
      return;
    }

    try {
      // Try to authenticate first
      await this.pocket.login(this.email, this.password);
      this.router.navigate(['/profile']);
      return;
    } catch (err: any) {
      // If login failed, attempt to create the user then sign in.
      // This covers the "sign up on first sign-in" behavior requested.
      try {
        const username = (this.email && this.email.split('@')[0]) || 'user';
        await this.pocket.createUser({ email: this.email, password: this.password, passwordConfirm: this.password, name: username });
        // After creation, authenticate and navigate
        await this.pocket.login(this.email, this.password);
        this.router.navigate(['/profile']);
        return;
      } catch (createErr: any) {
        // Present the most specific error available
        this.error = createErr?.data?.message || createErr?.message || err?.data?.message || err?.message || 'Sign in failed.';
      }
    }
  }
}
