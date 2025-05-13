import { Injectable } from "@angular/core";
import { ThemeEnum } from "../../shared/enums/theme.enum";

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkThemeClass = 'ion-palette-dark';

  constructor() {
    const savedTheme = localStorage.getItem('theme') as ThemeEnum;
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
  }

  public setTheme(theme: ThemeEnum): void {
    const body = document.documentElement;
    body.classList.toggle(this.darkThemeClass, theme === 'dark');
    localStorage.setItem('theme', theme);
  }

  public toggleTheme(): void {
    const isDark = document.documentElement.classList.contains(this.darkThemeClass);
    this.setTheme(isDark ? ThemeEnum.light : ThemeEnum.dark);
  }

  public getCurrentTheme(): ThemeEnum{
    return document.documentElement.classList.contains(this.darkThemeClass) ?
      ThemeEnum.dark : ThemeEnum.light;
  }
}
