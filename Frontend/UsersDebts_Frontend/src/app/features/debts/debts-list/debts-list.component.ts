import { Component, OnInit } from '@angular/core';
import { DebtService } from '../../../core/services/debt.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DebtDetailModalComponent } from '../debt-detail-modal/debt-detail-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
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
  MatTableModule,
  RouterModule
  ],
  templateUrl: './debts-list.component.html',
  styleUrls: ['./debts-list.component.css']
})
export class DebtsListComponent implements OnInit {
  debts: any[] = [];
  allDebts: any[] = [];
  filter: string = 'pending';

  constructor(private debtService: DebtService, private dialog: MatDialog, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
  this.loadAllDebts();
  }

  loadAllDebts() {
    this.debtService.getDebts().subscribe(data => {
      this.allDebts = data;
      this.filterDebts();
      this.cdr.detectChanges();
    });
  }

  filterDebts() {
    if (this.filter === 'pending') {
      this.debts = this.allDebts.filter(d => !d.isPaid);
    } else if (this.filter === 'paid') {
      this.debts = this.allDebts.filter(d => d.isPaid);
    } else {
      this.debts = this.allDebts;
    }
  }

  onFilterChange(newFilter: string) {
  this.filter = newFilter;
  this.filterDebts();
  }
  
  logDebtId(debt: any) {
    this.dialog.open(DebtDetailModalComponent, {
      data: debt,
      width: '700px'
    });
    this.cdr.detectChanges();
  }
}
