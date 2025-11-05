import { Injectable } from '@angular/core';

import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class PocketbaseService {
  private readonly pb: PocketBase;

  constructor() {
    const url = 'https://caesarvitality.pockethost.io/';
    this.pb = new PocketBase(url);
  }

  async getDailyChecklistItems() {
    return this.pb.collection('daily_checklist').getList(1, 100);
  }

  async getSports() {
    return this.pb.collection('sports').getList(1, 100);
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
