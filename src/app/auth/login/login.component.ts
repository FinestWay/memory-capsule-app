// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        // Save token (e.g., in localStorage)
        localStorage.setItem('token', response.token);
        // Navigate to dashboard or home
        this.router.navigate(['/dashboard']); // Adjust if you add a dashboard later
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }
}
