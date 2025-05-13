import { Component, OnInit } from '@angular/core';
import { ThemeService } from "../../core/services/theme.service";
import { ThemeEnum } from "../../shared/enums/theme.enum";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {
  isDarkTheme = false;

  constructor(
    private themeService: ThemeService,
  ) { }

  public ngOnInit() {
    this.isDarkTheme = this.themeService.getCurrentTheme() === ThemeEnum.dark;
  }

  public toggleTheme() {
    this.themeService.toggleTheme();
    this.isDarkTheme = this.themeService.getCurrentTheme() === ThemeEnum.dark;
  }
}
