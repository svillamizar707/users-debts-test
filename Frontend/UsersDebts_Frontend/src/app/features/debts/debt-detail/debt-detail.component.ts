import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DebtService } from '../../../core/services/debt.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-debt-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, HttpClientModule],
  templateUrl: './debt-detail.component.html',
  styleUrls: ['./debt-detail.component.css']
})
export class DebtDetailComponent implements OnInit {
  debt: any;

  constructor(private route: ActivatedRoute, private debtService: DebtService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.debtService.getDebt(+id).subscribe(data => this.debt = data);
    }
  }
}
