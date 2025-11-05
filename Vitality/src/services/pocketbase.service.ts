import { Injectable } from '@angular/core';

import PocketBase from 'pocketbase';
import { Sport } from '../app/models/sport.model';

@Injectable({
  providedIn: 'root',
})
export class PocketbaseService {
  private readonly pb: PocketBase;

  constructor() {
    const url = 'https://caesarvitality.pockethost.io/';
    this.pb = new PocketBase(url);
  }

  async getAllUsers() {
    return this.pb.collection('users').getFullList();
  }

  async getDailyChecklistItems() {
    return this.pb.collection('daily_checklist').getList(1, 100);
  }

  async doeMeeAanSport(sport: Sport) {
    const userId = this.pb.authStore.record?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    const currentCollegas = sport.ingeschreven_collegas || [];
    // Prevent duplicates
    if (currentCollegas.includes(userId)) {
      return;
    }

    return this.pb.collection('sports').update(sport.id, {
      ingeschreven_collegas: [...currentCollegas, userId],
    });
  }

  async schrijfUitVanSport(sport: Sport) {
    const userId = this.pb.authStore.record?.id;
    if (!userId) {
      throw new Error('User not authenticated');
    }

    // Ensure we have the latest sport data with the ingeschreven_collegas field
    const latestSport = await this.pb.collection<Sport>('sports').getOne(sport.id);

    const currentCollegas = latestSport.ingeschreven_collegas || [];
    // Ensure both sides are strings for comparison
    const userIdStr = String(userId);
    const filteredCollegas = currentCollegas.filter((id) => String(id) !== userIdStr);

    console.log('Removing user from sport:', {
      sportId: latestSport.id,
      sportTitle: latestSport.titel,
      userId: userIdStr,
      before: currentCollegas,
      after: filteredCollegas,
      beforeLength: currentCollegas.length,
      afterLength: filteredCollegas.length,
    });

    // Update with the filtered array (empty array is valid)
    const result = await this.pb.collection('sports').update(latestSport.id, {
      ingeschreven_collegas: filteredCollegas,
    });

    console.log('Update result:', result);
    console.log('Updated ingeschreven_collegas:', result['ingeschreven_collegas']);
    return result;
  }

  async getSports() {
    return this.pb.collection<Sport>('sports').getFullList();
  }

  async getSportById(id: string) {
    return this.pb.collection<Sport>('sports').getOne(id);
  }

  async getEvents() {
    return this.pb.collection('events').getList(1, 100);
  }

  async createDailyChecklistItem(item: any) {
    return this.pb.collection('daily_checklist').create(item);
  }

  async updateDailyChecklistItem(item: any) {
    return this.pb.collection('daily_checklist').update(item.id, item);
  }

  async deleteDailyChecklistItem(id: string) {
    return this.pb.collection('daily_checklist').delete(id);
  }

  async createUser(user: any) {
    return this.pb.collection('users').create(user);
  }

  async updateUser(user: any) {
    return this.pb.collection('users').update(user.id, user);
  }

  async login(email: string, password: string) {
    return this.pb.collection('users').authWithPassword(email, password);
  }

  async logout() {
    return this.pb.authStore.clear();
  }

  async getUser() {
    return this.pb.authStore.record;
  }
}
