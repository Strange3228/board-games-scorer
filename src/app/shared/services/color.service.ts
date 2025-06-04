import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  constructor() {
    this.registerCustomColors();
  }

  private registerCustomColors() {
    document.body.style.setProperty('--ion-color-light-success', '#90EE90');
    document.body.style.setProperty('--ion-color-light-success-rgb', '144, 238, 144');
    document.body.style.setProperty('--ion-color-light-success-contrast', '#000000');
    document.body.style.setProperty('--ion-color-light-success-contrast-rgb', '0, 0, 0');
    document.body.style.setProperty('--ion-color-light-success-shade', '#7fd17f');
    document.body.style.setProperty('--ion-color-light-success-tint', '#9bf09b');

    const style = document.createElement('style');
    style.textContent = `
      .ion-color-light-success {
        --ion-color-base: var(--ion-color-light-success);
        --ion-color-base-rgb: var(--ion-color-light-success-rgb);
        --ion-color-contrast: var(--ion-color-light-success-contrast);
        --ion-color-contrast-rgb: var(--ion-color-light-success-contrast-rgb);
        --ion-color-shade: var(--ion-color-light-success-shade);
        --ion-color-tint: var(--ion-color-light-success-tint);
      }
    `;
    document.head.appendChild(style);
  }
} 