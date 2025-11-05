import {Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PocketbaseService } from '../../../services/pocketbase.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any | null = null;

  constructor(public pocket: PocketbaseService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.user = await this.pocket.getUser();
    } catch (error) {
      console.error('Failed to load user', error);
      this.user = null;
    }
  }
}
