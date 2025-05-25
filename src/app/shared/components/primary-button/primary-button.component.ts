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
  @Input() type: 'default' | 'outline';
  @Input() size: 'sm' | 'md' | 'lg';
  @Input() disabled: boolean = false;
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
