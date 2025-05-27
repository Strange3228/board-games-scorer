import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Player } from '../../../../shared/store/players.store';
import { PLAYER_COLORS } from '../../pages/player-create/const/player-colors.cont';
import { PrimaryButtonComponent } from '../../../../shared/components/primary-button/primary-button.component';
import { PlayerInitialsPipe } from "../../../../shared/pipes/player-initials.pipe";

@Component({
  selector: 'app-edit-player-modal',
  templateUrl: './edit-player-modal.component.html',
  styleUrls: ['./edit-player-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, PrimaryButtonComponent, PlayerInitialsPipe],
})
export class EditPlayerModalComponent implements OnInit {
  @Input() player!: Player;

  public playerName: string = '';
  public selectedColor: string = '';
  public playerColors = PLAYER_COLORS;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.playerName = this.player.name;
    this.selectedColor = this.player.color;
  }

  public get isValid(): boolean {
    return this.playerName.trim().length > 0 && !!this.selectedColor;
  }

  public onSelectColor(color: string): void {
    this.selectedColor = color;
  }

  public cancel() {
    return this.modalCtrl.dismiss(null);
  }

  public confirm() {
    if (!this.isValid) return;

    const updatedPlayer: Player = {
      ...this.player,
      name: this.playerName.trim(),
      color: this.selectedColor,
    };

    return this.modalCtrl.dismiss(updatedPlayer);
  }
}
