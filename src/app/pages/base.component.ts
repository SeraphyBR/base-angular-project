import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base-page',
  imports: [RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
})
export default class BasePageComponent {}
