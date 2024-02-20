import { Component, Input, OnInit } from '@angular/core';
import { ProfileDetails } from '@/types';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users/users.service';
import { DetailCardComponent } from '@/app/components/detail-card/detail-card.component';
import { AuthService } from '../../../layouts/auth/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mapToArrayFn } from '@/app/helpers';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DetailCardComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  @Input() id!: string;

  canEdit = false;
  inputType: 'edit' | 'readonly' = 'readonly';
  userDetail?: any;
  detail: ProfileDetails[] = [
    { key: 'Name', value: '', type: 'text' },
    { key: 'Email', value: '', type: 'email' },
    { key: 'Password', value: '*******', type: 'password' },
  ];

  extraDetail: ProfileDetails[] = [
    { key: 'Admin', value: 'Sopuluchukwu', type: 'text' },
    { key: 'Joined', value: '24th, January 2023', type: 'email' },
  ];

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      const id = param.get('id')!;
      this.usersService
        .getUserDetail(id)
        .pipe(
          map((e) => {
            this.userDetail = e;

            // Transform data to needed data structure
            const { first_name, last_name, email } = e;
            const newObj = { name: first_name + ' ' + last_name, email } as any;

            this.detail.splice(0, 2, ...mapToArrayFn(newObj));
            this.canEdit =
              // You can't edit any other profile excpet that of the user you approved (requirement)
              e?.administrator &&
              e?.administrator == this.authService.getLoggedInUser()?._id &&
              // You can't edit your own profile either (requirement)
              id !== this.authService.getLoggedInUser()?._id;
            return e;
          })
        )
        .subscribe({
          next: () => {
            // console.log(this.userDetail, 'all users');
            const admin = this.localStorage
              .get('users')
              .find(
                (user: any) => this.userDetail?.administrator || '' === user._id
              );
            this.extraDetail[0].value =
              `${admin?.first_name || ''} ${admin?.last_name || ''}`.trim() ||
              'N/A';

            this.extraDetail[1].value = this.userDetail.createdAt || 'N/A';
          },
          error: () => {
            this.router.navigate(['/dashboard', 'users']);
          },
        });
    });
  }
}
