import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TemplatesStoreService, WinType } from '../../../../shared/store/templates.store';

@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.page.html',
  styleUrls: ['./template-create.page.scss'],
  standalone: false,
})
export class TemplateCreatePage {
  public templateName = '';
  public description = '';
  public selectedWinType: WinType = 'win_lose';
  public pointTypes: { id: number; name: string }[] = [];
  private nextPointTypeId = 1;

  constructor(
    private router: Router,
    private templatesStore: TemplatesStoreService,
    private toastController: ToastController
  ) {}

  get isValid(): boolean {
    if (!this.templateName.trim()) return false;
    if (this.selectedWinType === 'points') {
      return this.pointTypes.length > 0 && this.pointTypes.every(pt => pt.name.trim());
    }
    return true;
  }

  addPointType(): void {
    this.pointTypes.push({
      id: this.nextPointTypeId++,
      name: ''
    });
  }

  removePointType(id: number): void {
    this.pointTypes = this.pointTypes.filter(pt => pt.id !== id);
  }

  updatePointTypeName(id: number, value: string): void {
    const pointType = this.pointTypes.find(pt => pt.id === id);
    if (pointType) {
      pointType.name = value;
    }
  }

  async onSave(): Promise<void> {
    if (!this.isValid) return;

    try {
      const newTemplate = {
        id: crypto.randomUUID(),
        name: this.templateName.trim(),
        description: this.description.trim() || undefined,
        winType: this.selectedWinType,
        pointTypes: this.selectedWinType === 'points'
          ? this.pointTypes.map(pt => ({
              id: String(pt.id),
              name: pt.name.trim()
            }))
          : []
      };

      await this.templatesStore.addTemplate(newTemplate);
      await this.showToast('Template created successfully', 'success');
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error creating template:', error);
      await this.showToast('Failed to create template', 'danger');
    }
  }

  onCancel(): void {
    this.router.navigate(['/templates']);
  }

  private async showToast(message: string, color: 'success' | 'danger'): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}
