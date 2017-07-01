import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <md-toolbar color="primary">
      <span>Planning Poker</span>
      <span class="fill-toolbar"></span>
    </md-toolbar>
    <div class="main-app-container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
