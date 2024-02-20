import { Component, Input } from '@angular/core';
import { KeyValueComponent } from '../key-value/key-value.component';
import { ProfileDetails } from '@/types';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../input-field/input-field.component';
import { UsersService } from '../../modules/dashboard/users/users.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-detail-card',
  standalone: true,
  imports: [CommonModule, KeyValueComponent, InputFieldComponent, RouterModule],
  templateUrl: './detail-card.component.html',
  styleUrl: './detail-card.component.scss',
})
export class DetailCardComponent {
  @Input() src = '';
  @Input() inputType: 'edit' | 'readonly' = 'edit';
  @Input() detail: ProfileDetails[] = [];
  @Input() canEdit = false;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  public handleSaveDetails(): void {
    // convert detail to key-value pairs
    const arr = [...this.detail];
    const body = {} as any;

    body.first_name = arr[0].value.trim().split(/\s+/)[0];
    body.last_name = arr[0].value.trim().split(/\s+/)[1];
    body.email = arr[1].value;

    this.route.paramMap
      .pipe(
        switchMap((param) =>
          this.usersService.updateUserDetails(body, param.get('id')!)
        )
      )
      .subscribe({
        next: () => {
          window.alert('User details updated successfully');
        },
      });
  }

  public handleDeleteUser(): void {
    this.route.paramMap
      .pipe(
        switchMap((param) => this.usersService.deleteUser(param.get('id')!))
      )
      .subscribe({
        next: () => {
          window.alert('User deleted successfully');
        },
      });
  }
}
