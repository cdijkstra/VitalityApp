import {Component, OnInit, signal, WritableSignal, NgZone} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {PocketbaseService} from '../../../services/pocketbase.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // user is now an Angular signal for reactive reads in the template
  user: WritableSignal<any | null> = signal(null);

  constructor(public pocket: PocketbaseService) {
  }

  async ngOnInit(): Promise<void> {
    try {
      const u = await this.pocket.getUser();
      this.user.set(u);
    } catch (error) {
      console.error('Failed to load user', error);
      this.user.set(null);
    }
  }
}
