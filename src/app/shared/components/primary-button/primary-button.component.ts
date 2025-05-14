import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from "@ionic/angular";

@Component({
  selector: 'app-primary-button',
  templateUrl: './primary-button.component.html',
  styleUrls: ['./primary-button.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class PrimaryButtonComponent {
  @Input() label: string = 'Click Me';
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
