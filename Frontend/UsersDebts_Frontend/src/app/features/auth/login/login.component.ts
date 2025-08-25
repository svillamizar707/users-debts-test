import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  errorMessage = '';

  // Registro
  name = '';
  lastName = '';
  phoneNumber = '';
  showRegister = false;

  toggleRegister(show: boolean) {
    this.showRegister = show;
    this.errorMessage = '';
  }

  constructor(private auth: AuthService, private cdr: ChangeDetectorRef, private router: Router) {
    const userId = localStorage.getItem('userId');
    if (userId !== null && userId !== undefined && userId !== '') {
      this.router.navigate(['/debts']);
    }
  }

  login() {
    this.errorMessage = '';
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (user) => {       
        if (user && user.id) {
          localStorage.setItem('userId', user.id.toString());
        }
        this.router.navigate(['/debts']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Usuario o contraseña incorrecta';
          this.cdr.detectChanges();
        } else {
          this.errorMessage = 'Error al iniciar sesión';
          this.cdr.detectChanges();
        }
      }
    });
  }

  register() {
      this.errorMessage = '';
      // Validación de campos obligatorios
      if (!this.name) {
        this.errorMessage = 'Falta el campo: Nombre';
        this.cdr.detectChanges();
        return;
      }
      if (!this.lastName) {
        this.errorMessage = 'Falta el campo: Apellido';
        this.cdr.detectChanges();
        return;
      }
      if (!this.email) {
        this.errorMessage = 'Falta el campo: Email';
        this.cdr.detectChanges();
        return;
      }
      // Validar formato de correo
      const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if (!emailRegex.test(this.email)) {
        this.errorMessage = 'El campo Email no tiene un formato válido';
        this.cdr.detectChanges();
        return;
      }
      if (!this.password) {
        this.errorMessage = 'Falta el campo: Contraseña';
        this.cdr.detectChanges();
        return;
      }
      this.auth.register({
        name: this.name,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber
      }).subscribe({
        next: () => {
          this.errorMessage = '';
          this.showRegister = false;
          // Opcional: limpiar campos
          this.name = '';
          this.lastName = '';
          this.phoneNumber = '';
          this.email = '';
          this.password = '';
        },
        error: (err) => {
          if (
            (err.error && typeof err.error === 'string' && err.error.toLowerCase().includes('email ya registrado')) ||
            (err.error && typeof err.error === 'object' && err.error.message && err.error.message.toLowerCase().includes('email ya registrado'))
          ) {
            this.errorMessage = 'El correo ya está registrado';
            this.cdr.detectChanges();
            // No cerrar el formulario
          } else {
            this.errorMessage = 'Error al registrar usuario';
            this.cdr.detectChanges();
          }
        }
      });
    }
}
