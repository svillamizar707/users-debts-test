import { Component, OnInit } from '@angular/core';
import { DebtService } from '../../../core/services/debt.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-debts-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatListModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './debts-list.component.html',
  styleUrls: ['./debts-list.component.css']
})
export class DebtsListComponent implements OnInit {
  debts: any[] = [];
  filter: string = 'pending';

  constructor(private debtService: DebtService) {}

  ngOnInit() {
    this.loadDebts();
  }

  loadDebts() {
    this.debtService.getDebts(this.filter).subscribe(data => this.debts = data);
  }

  onFilterChange(newFilter: string) {
    this.filter = newFilter;
    this.loadDebts();
  }
}
