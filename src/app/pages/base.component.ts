import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base-page',
  imports: [RouterOutlet],
  template: `
    <p class="tw-text-xl">Base</p>

    <router-outlet></router-outlet>
  `,
})
export default class BasePageComponent {}
