import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

// Angular Material imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink,CommonModule, MatSidenavModule, MatListModule, MatToolbar, MatIcon, MatIconButton, MatButtonModule, MatTooltipModule, MatMenuModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MGTS-ERP-APP';
  currentRoute: string = '';
  sidebarOpen = false;
  orgLoginActive = false;
  loginActive=false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  isActiveRoute(route: string): boolean {
    return this.currentRoute === route;
  }
}
