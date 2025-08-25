import { Component, Inject, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DebtService } from '../../../core/services/debt.service';

@Component({
  selector: 'app-debt-detail-modal',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './debt-detail-modal.component.html',
  styleUrls: ['./debt-detail-modal.component.css']
})
export class DebtDetailModalComponent {
  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }
  loading = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public debt: any,
    private dialogRef: MatDialogRef<DebtDetailModalComponent>,
    private debtService: DebtService, private cdr: ChangeDetectorRef
  ) {}

  markAsPaid() {
    this.loading = true;
    this.debtService.markAsPaid(this.debt.id).subscribe({
      next: () => {
        this.debt.isPaid = true;
        this.loading = false;
        this.dialogRef.close({ reload: true });
        this.cdr.detectChanges();       
        
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
