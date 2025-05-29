import { Injectable } from '@angular/core';
import { StorageService } from "../services/storage.service";

export interface Player {
  id: string;
  name: string;
  color: string;
  playedGames: {
    templateId: string;
    isWin: boolean;
    date: Date;
  }[];
  avatar?: string;
}

const PLAYERS_KEY = 'all_players';

@Injectable({
  providedIn: 'root'
})
export class PlayersStoreService {
  constructor(private storageService: StorageService) {}

  async getPlayers(): Promise<Player[]> {
    return await this.storageService.get(PLAYERS_KEY) ?? [];
  }

  async getPlayerById(id: string): Promise<Player | undefined> {
    const players = await this.getPlayers();
    return players.find(p => p.id === id);
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

  async addGameToPlayer(playerId: string, gameData: { templateId: string; isWin: boolean; date: Date }): Promise<void> {
    const players = await this.getPlayers();
    const player = players.find(p => p.id === playerId);
    if (player) {
      player.playedGames.push(gameData);
      await this.storageService.set(PLAYERS_KEY, players);
    }
  }

  async clearPlayers(): Promise<void> {
    await this.storageService.set(PLAYERS_KEY, []);
  }
}
