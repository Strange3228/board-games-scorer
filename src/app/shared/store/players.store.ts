import { Injectable } from '@angular/core';
import { StorageService } from "../services/storage.service";

export interface Player {
  id: string;
  name: string;
  color: string;
  avatar?: string;
}

export const PLAYERS_KEY = 'all_players';

@Injectable({
  providedIn: 'root'
})
export class PlayersStoreService {
  constructor(private storageService: StorageService) {}

  async getPlayers(): Promise<Player[]> {
    const players = await this.storageService.get(PLAYERS_KEY);
    return players || [];
  }

  async addPlayer(newPlayer: Player): Promise<void> {
    const players = await this.getPlayers();
    players.push(newPlayer);
    await this.storageService.set(PLAYERS_KEY, players);
  }

  async updatePlayer(updatedPlayer: Player): Promise<void> {
    const players = await this.getPlayers();
    const index = players.findIndex(p => p.id === updatedPlayer.id);
    if (index !== -1) {
      players[index] = updatedPlayer;
      await this.storageService.set(PLAYERS_KEY, players);
    }
  }

  async deletePlayer(playerId: string): Promise<void> {
    const players = await this.getPlayers();
    const updated = players.filter(p => p.id !== playerId);
    await this.storageService.set(PLAYERS_KEY, updated);
  }

  async clearPlayers(): Promise<void> {
    await this.storageService.set(PLAYERS_KEY, []);
  }
}
