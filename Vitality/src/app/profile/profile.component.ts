import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserProfile, defaultProfile } from './profile.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: UserProfile = { ...defaultProfile };

  private storageKey = 'vitality_user_profile_v1';

  ngOnInit(): void {
    this.loadProfile();
  }

  // Basic computed properties useful for a fitness app
  get bmi(): number | null {
    if (!this.profile.heightCm || !this.profile.weightKg) return null;
    const heightM = this.profile.heightCm / 100;
    return Math.round((this.profile.weightKg / (heightM * heightM)) * 10) / 10;
  }

  get estimatedCaloriesPerDay(): number {
    const weight = this.profile.weightKg ?? 70;
    const height = this.profile.heightCm ?? 175;
    const age = this.profile.age ?? 30;
    let bmr = 10 * weight + 6.25 * height - 5 * age;
    if (this.profile.gender === 'male') bmr += 5;
    else if (this.profile.gender === 'female') bmr -= 161;

    const activityFactor = this.profile.activityLevel === 'High' ? 1.6 : this.profile.activityLevel === 'Low' ? 1.3 : 1.45;
    return Math.round(bmr * activityFactor);
  }

  get stepsProgressPercent(): number {
    return Math.min(100, Math.round(((this.profile.stepsToday ?? 0) / (this.profile.stepsGoal ?? 8000)) * 100));
  }

  // Small helper to update a value (used by template)
  updateField<K extends keyof UserProfile>(field: K, value: UserProfile[K]) {
    this.profile = { ...this.profile, [field]: value };
  }

  saveProfile() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.profile));
    } catch (e) {
      console.warn('Could not save profile to localStorage', e);
    }
  }

  loadProfile() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as UserProfile;
        this.profile = { ...defaultProfile, ...parsed };
      }
    } catch (e) {
      console.warn('Could not load profile from localStorage', e);
    }
  }

  resetProfile() {
    this.profile = { ...defaultProfile };
    this.saveProfile();
  }
}
