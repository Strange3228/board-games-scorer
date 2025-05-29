import { Injectable } from '@angular/core';
import { StorageService } from "../services/storage.service";

export type WinType = 'win_lose' | 'points';

export interface PointType {
  id: string;
  name: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  winType: WinType;
  pointTypes: PointType[];
  createdAt: Date;
  updatedAt: Date;
}

const TEMPLATES_KEY = 'all_templates';

@Injectable({
  providedIn: 'root'
})
export class TemplatesStoreService {
  constructor(private storageService: StorageService) {}

  async getTemplates(): Promise<Template[]> {
    return await this.storageService.get(TEMPLATES_KEY);
  }

  async getTemplateById(id: string): Promise<Template | undefined> {
    const templates = await this.getTemplates();
    return templates?.find(t => t.id === id);
  }

  async addTemplate(newTemplate: Template): Promise<void> {
    const templates = await this.getTemplates() ?? [];
    templates.push(newTemplate);
    await this.storageService.set(TEMPLATES_KEY, templates);
  }

  async updateTemplate(updatedTemplate: Template): Promise<void> {
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

  async clearTemplates(): Promise<void> {
    await this.storageService.set(TEMPLATES_KEY, []);
  }
} 