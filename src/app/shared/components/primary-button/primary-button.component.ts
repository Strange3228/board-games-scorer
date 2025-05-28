import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgClass
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryButtonComponent {
  @Input() label: string = 'Click Me';
  @Input() type: 'default' | 'outline' | 'text' = 'default';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() color: 'primary' | 'success' | 'warning' | 'danger' | 'tertiary' = 'primary';
  @Input() icon?: string;
  @Input() iconPosition: 'start' | 'end' = 'start';
  @Input() fullWidth: boolean = false;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    if (!this.disabled && !this.loading) {
      this.clicked.emit();
    }
  }
}
