import { Component, Input } from '@angular/core';
import { KeyValueComponent } from '../key-value/key-value.component';
import { ProfileDetails } from '@/types';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '@/app/services/local-storage.service';
import { InputFieldComponent } from '../input-field/input-field.component';

@Component({
  selector: 'app-detail-card',
  standalone: true,
  imports: [CommonModule, KeyValueComponent, InputFieldComponent],
  templateUrl: './detail-card.component.html',
  styleUrl: './detail-card.component.scss',
})
export class DetailCardComponent {
  @Input() src = '';
  @Input() inputType: 'edit' | 'readonly' = 'edit';
  @Input() detail: ProfileDetails[] = [];
  @Input() canEdit = false;

  constructor(private localStorage: LocalStorageService) {}
}
