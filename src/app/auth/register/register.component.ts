// src/app/auth/register/register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService : AuthenticationService,
    private router: Router
  ) {}

  onRegister(): void {
    this.authService.register(this.email, this.password).subscribe(
      (response: any) => {
        this.successMessage =
          'Registration successful! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }
}
