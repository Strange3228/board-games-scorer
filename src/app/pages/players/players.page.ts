import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersPage {

  constructor(public router: Router) {
  }
}
