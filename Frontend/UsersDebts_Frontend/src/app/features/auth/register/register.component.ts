import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  lastName = '';
  phoneNumber = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private dialogRef: MatDialogRef<RegisterComponent>
  ) {}

  register() {
    this.auth.register({
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber
    }).subscribe(() => {
      this.name = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.phoneNumber = '';
      setTimeout(() => {
        this.dialogRef.close();
        this.router.navigate(['/login']);
      }, 0);
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  openAsDialog?: boolean;
}
