import {Component, NgZone, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {UserProfile, defaultProfile} from './profile.model';
import {PocketbaseService} from '../../services/pocketbase.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: UserProfile = {...defaultProfile};
  user: any | null = null;

  constructor(private pocket: PocketbaseService, private zone: NgZone) {
  }

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.pocket.getUser();
      console.log(this.user)
    } catch (error) {
      console.error('Failed to load user', error);
      this.user = null;
    }
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

  updateField<K extends keyof UserProfile>(field: K, value: UserProfile[K]) {
    this.profile = {...this.profile, [field]: value};
  }

  resetProfile() {
    this.profile = {...defaultProfile};
  }

  // Save profile: if the user is signed in, update their record in PocketBase
  async saveProfile() {
    if (!this.user?.id) {
      console.warn('No authenticated user – cannot save profile to server.');
      return;
    }

    const payload: any = {
      id: this.user.id,
      name: this.profile.name,
      age: this.profile.age,
      gender: this.profile.gender,
      heightCm: this.profile.heightCm,
      weightKg: this.profile.weightKg,
      stepsGoal: this.profile.stepsGoal,
      goals: this.profile.goals,
      activityLevel: this.profile.activityLevel,
    };

    try {
      const updated = await this.pocket.updateUser(payload);
      // Ensure Angular picks up the change if PocketBase doesn't run in Angular zone
      this.zone.run(() => {
        this.user = updated;
      });
      console.log('Profile saved', updated);
    } catch (err) {
      console.error('Failed to save profile', err);
    }
  }
}
