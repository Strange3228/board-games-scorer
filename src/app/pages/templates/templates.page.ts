import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from "@angular/router";
import { Template, TemplatesStoreService } from "../../shared/store/templates.store";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.page.html',
  styleUrls: ['./templates.page.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplatesPage {
  templates: Promise<Template[]> = Promise.resolve([]);
  filteredTemplates: Template[] | null = null;
  searchTerm: string = '';

  constructor(
    public router: Router,
    private templatesStore: TemplatesStoreService,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController,
  ) {}

  public ionViewWillEnter(): void {
    this.templates = this.templatesStore.getTemplates().then(templates => templates || []);
    this.cdr.detectChanges();
  }

  public async filterTemplates(): Promise<void> {
    if (!this.searchTerm.trim()) {
      this.filteredTemplates = null;
      this.cdr.detectChanges();
      return;
    }

    const allTemplates = await this.templates;
    this.filteredTemplates = allTemplates.filter(template =>
      template.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.cdr.detectChanges();
  }

  public async deleteTemplate(template: Template): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Delete Template',
      message: `Are you sure you want to delete ${template.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            await this.templatesStore.deleteTemplate(template.id);
            this.templates = this.templatesStore.getTemplates().then(templates => templates || []);
            this.cdr.detectChanges();
          },
        },
      ],
    });

    await alert.present();
  }
}
