import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  passwordVisible = signal(false);

  constructor(private authenticationService: AuthenticationService) {}

  togglePasswordVisibility() {
    this.passwordVisible.set(!this.passwordVisible());
  }

  onSubmit() {
    if (this.email && this.password) {
      console.log('Logging in with:', this.email, this.password);
      this.authenticationService.signIn({ email: this.email, password: this.password }).subscribe(
        response => {
          console.log('Login successful:', response);
          this.authenticationService.userLoggedIn = true;
          // Handle successful login here
        },
        error => {
          this.authenticationService.userLoggedIn = false;
          console.log('signin error:', error);
        });
    }
  }
}
