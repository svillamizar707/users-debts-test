import { Component } from '@angular/core';
import { DebtService } from '../../../core/services/debt.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-debt-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './debt-form.component.html',
  styleUrls: ['./debt-form.component.css']
})
export class DebtFormComponent {
  debt = {
    description: '',
    amount: 0,
    userId: null,
    createdAt: '',
    isPaid: false,
    paidAt: null
  };

  constructor(private debtService: DebtService, private router: Router) {}

  submit() {
    this.debtService.createDebt(this.debt).subscribe(() => {
      this.router.navigate(['/debts']);
    });
  }
}
