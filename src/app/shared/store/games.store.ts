import { Injectable } from '@angular/core';
import { StorageService } from "../services/storage.service";
import { Template } from './templates.store';
import { Player } from './players.store';

export interface PlayerScore {
  playerId: string;
  points?: { [pointTypeId: string]: number };
}

export interface Game {
  id: string;
  templateId: string;
  template: Template;
  date: Date;
  players: {
    player: Player;
    score: PlayerScore;
  }[];
  winner?: {
    playerId: string;
    totalPoints?: number;
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GameInProgress {
  templateId: string;
  date: Date;
  playerScores: {
    playerId: string;
    points?: { [pointTypeId: string]: number };
  }[];
  winner?: string;
  notes?: string;
}

const GAMES_KEY = 'all_games';
const GAME_IN_PROGRESS_KEY = 'game_in_progress';

@Injectable({
  providedIn: 'root'
})
export class GamesStoreService {
  constructor(private storageService: StorageService) {}

  async getGames(): Promise<Game[]> {
    return await this.storageService.get(GAMES_KEY) ?? [];
  }

  async addGame(game: Game): Promise<void> {
    const games = await this.getGames();
    games.push(game);
    await this.storageService.set(GAMES_KEY, games);
  }

  async getGameById(id: string): Promise<Game | undefined> {
    const games = await this.getGames();
    return games.find(g => g.id === id);
  }

  async getGamesByTemplateId(templateId: string): Promise<Game[]> {
    const games = await this.getGames();
    return games.filter(g => g.templateId === templateId);
  }

  async getGamesByPlayerId(playerId: string): Promise<Game[]> {
    const games = await this.getGames();
    return games.filter(g => g.players.some(p => p.player.id === playerId));
  }

  async saveGameInProgress(game: GameInProgress): Promise<void> {
    await this.storageService.set(GAME_IN_PROGRESS_KEY, game);
  }

  async getGameInProgress(): Promise<GameInProgress | null> {
    return await this.storageService.get(GAME_IN_PROGRESS_KEY);
  }

  async clearGameInProgress(): Promise<void> {
    await this.storageService.remove(GAME_IN_PROGRESS_KEY);
  }

  async deleteGame(gameId: string): Promise<void> {
    const games = await this.getGames();
    const updated = games.filter(g => g.id !== gameId);
    await this.storageService.set(GAMES_KEY, updated);
  }

  async getMostPlayedTemplates(limit: number = 3): Promise<{ template: Template; playCount: number }[]> {
    const games = await this.getGames();
    const templateCounts = new Map<string, { template: Template; playCount: number }>();

    games.forEach(game => {
      const existing = templateCounts.get(game.templateId);
      if (existing) {
        existing.playCount++;
      } else {
        templateCounts.set(game.templateId, {
          template: game.template,
          playCount: 1
        });
      }
    });

    return Array.from(templateCounts.values())
      .sort((a, b) => b.playCount - a.playCount)
      .slice(0, limit);
  }
}
