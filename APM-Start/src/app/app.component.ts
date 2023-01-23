import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, Event } from '@angular/router';

import { slideInAnimation } from "./app.animation";
import { MessageService } from './messages/message.service';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading: boolean;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private messages: MessageService) {
      router.events.subscribe((routerEvent: Event) => {
        this.checkRouterEvent(routerEvent);
      });
    }

    get messagesDisplayed() {
      return this.messages.isDisplayed;
    }

    showMessages() {
      this.router.navigate([{outlets: {popup: 'messages'}}]);
      this.messages.isDisplayed = true;
    }
  
    hideMessages() {
      this.router.navigate([{outlets: {popup: null}}]);
      this.messages.isDisplayed = false;
    }
  
    checkRouterEvent(routerEvent: Event) {
      if (routerEvent instanceof NavigationStart) this.loading = true;

      if (routerEvent instanceof NavigationCancel ||
          routerEvent instanceof NavigationError ||
          routerEvent instanceof NavigationEnd)
        this.loading = false;
    }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/');
    console.log('Log out');
  }
}
