import { Injectable } from '@angular/core';
import { StorageService } from "../services/storage.service";

export type WinType = 'win_lose' | 'points';

export interface PointType {
  id: string;
  name: string;
}

export interface GameTemplate {
  id: string;
  name: string;
  winType: WinType;
  pointTypes: PointType[];
  description?: string;
}

const TEMPLATES_KEY = 'game_templates';

@Injectable({
  providedIn: 'root'
})
export class TemplatesStoreService {
  constructor(private storageService: StorageService) {}

  async getTemplates(): Promise<GameTemplate[]> {
    return await this.storageService.get(TEMPLATES_KEY) || [];
  }

  async addTemplate(newTemplate: GameTemplate): Promise<void> {
    const templates = await this.getTemplates();
    templates.push(newTemplate);
    await this.storageService.set(TEMPLATES_KEY, templates);
  }

  async updateTemplate(updatedTemplate: GameTemplate): Promise<void> {
    const templates = await this.getTemplates();
    const index = templates.findIndex(t => t.id === updatedTemplate.id);
    if (index !== -1) {
      templates[index] = updatedTemplate;
      await this.storageService.set(TEMPLATES_KEY, templates);
    }
  }

  async deleteTemplate(templateId: string): Promise<void> {
    const templates = await this.getTemplates();
    const updated = templates.filter(t => t.id !== templateId);
    await this.storageService.set(TEMPLATES_KEY, updated);
  }
} 