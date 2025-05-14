import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from "@ionic/angular";
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    PrimaryButtonComponent
  ]
})
export class EmptyStateComponent {
  @Input() public icon: string;
  @Input() public title: string;
  @Input() public description: string;
  @Input() public buttonText: string;

  @Output() public buttonClick: EventEmitter<void> = new EventEmitter();
}
