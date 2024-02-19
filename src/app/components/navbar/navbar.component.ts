import { AuthService } from '@/app/layouts/auth/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  my_id = '';
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.my_id = this.authService.getLoggedInUser()?._id;
  }

  public logOut(): void {
    this.authService.logOut();
  }
}
