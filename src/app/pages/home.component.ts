import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-home-page',
  template: `
    <p class="tw-text-xl">Home</p>
  `,
})
export default class HomePageComponent {
  @HostBinding('class') className = 'tw-bg-blue-400';
}
