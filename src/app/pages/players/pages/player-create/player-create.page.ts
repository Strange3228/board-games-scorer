import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PLAYER_COLORS } from "./const/player-colors.cont";

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.page.html',
  styleUrls: ['./player-create.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerCreatePage implements OnInit {
  public playerColors: {[key: string]: string} = PLAYER_COLORS;

  constructor() { }

  ngOnInit() {
  }

}
