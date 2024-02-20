import { AuthService } from '@/app/layouts/auth/auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, HttpClientModule],
  providers: [AuthService],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  my_id = '';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.my_id = this.authService.getLoggedInUser()?._id;
  }

  public logOut(): void {
    this.authService.logOut();
  }
}
