import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  loading: 'getting users...' | 'approving...' | '' = '';
  users: Record<string, any>[] = [];
  hasPendingUsers = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.handleGetPendingUsers(this.hasPendingUsers);
  }

  private handleGetPendingUsers(ispending: boolean): void {
    if (ispending) {
      this.usersService.getPendingUsers().subscribe((e: any) => {
        this.users = e || [];
        this.hasPendingUsers = ispending;
      });
    } else {
      this.usersService.getUsers().subscribe((e: any) => {
        this.users = e || [];
        this.hasPendingUsers = ispending;
      });
    }
  }

  public handleGetPendingUsersOnClick(e: any): void {
    this.handleGetPendingUsers(e.checked);
    // this.hasPendingUsers = e.checked;
  }

  public handleApproveUser(id: string): void {
    this.usersService
      .approveUser(id)
      .pipe(
        tap((e) => {
          this.loading = 'approving...';

          return e;
        })
      )
      .subscribe({
        next: () => {
          // Keeping track of onging calls app-wide should be taken care of by a seperate service
          // but for brevity, simplicity, and scope we will go with something more basic

          this.handleGetPendingUsers(this.hasPendingUsers);
          this.loading = '';
          window.alert('User approved successfully');
        },
      });
  }
}
