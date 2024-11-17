import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from '../../store/session/session.reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Simular validación de credenciales
      if (email === 'user@example.com' && password === 'password123') {
        this.store.dispatch(
          login({ user: {
            id: '1', name: 'John Doe', role: 'user',
            email: 'user@example.com'
          } })
        );
        this.router.navigate(['/home']); // Redirige a la ruta home
      } else {
        alert('Invalid credentials');
      }
    }
  }
}
