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

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService
      .getUsers()
      .pipe(tap((e) => console.log(e)))
      .subscribe((e: any) => (this.users = e || []));
  }
}
