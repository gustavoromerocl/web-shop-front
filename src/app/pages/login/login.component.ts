import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services//user/user.service';
import { CommonModule } from '@angular/common';
import { login } from '../../store/session/session.reducer';
import { Store } from '@ngrx/store';

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
    private userService: UserService,
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

  navigateToRecoverPassword() {
    this.router.navigate(['recover-password'])
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      // Encuentra al usuario con el servicio
      const user = this.userService.findUser(email, password);
  
      if (user) {
        // Asegúrate de que todos los campos necesarios estén definidos
        this.store.dispatch(login({ user: { ...user, role: user.role || 'ROLE_USER' } }));
        this.router.navigate(['/home']); // Redirige a home
      } else {
        alert('Invalid email or password.');
      }
    }
  }
  
}
