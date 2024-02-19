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

  public handleApproveUser(): void {
    //
  }
}
