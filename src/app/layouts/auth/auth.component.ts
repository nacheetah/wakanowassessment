import { Component, OnInit } from '@angular/core';
import { ArouraComponent } from '../../components/aroura/aroura.component';
import { InputFieldComponent } from '../../components/input-field/input-field.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '@/app/layouts/auth/auth-service.service';
import { HttpClientModule } from '@angular/common/http';
import { LocalStorageService } from '@/app/services/local-storage.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ArouraComponent,
    InputFieldComponent,
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  loading = false;
  auth_model = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  } as any;
  auth_mode!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (e) => (this.auth_mode = e.get('mode') || 'login')
    );
  }

  public handleAuthAction(): void {
    this.loading = true;
    if (this.auth_mode === 'signup') {
      this.authService.signup(this.auth_model).subscribe(() => {
        this.loading = false;
      });
    } else {
      const new_body = { ...this.auth_model };
      delete new_body.first_name;
      delete new_body.last_name;
      this.authService.login(new_body).subscribe(
        (e: any) => {
          this.localStorage.set('user', e);
          this.router.navigate(['/dashboard', 'users']).then(() => {
            this.loading = false;
          });
        },
        () => {
          this.loading = false;
        }
      );
    }
  }
}
