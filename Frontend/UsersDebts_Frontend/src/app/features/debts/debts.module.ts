import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { DebtsListComponent } from './debts-list/debts-list.component';
import { DebtDetailComponent } from './debt-detail/debt-detail.component';
import { DebtFormComponent } from './debt-form/debt-form.component';

const routes: Routes = [
  { path: '', component: DebtsListComponent },
  { path: 'new', component: DebtFormComponent },
  { path: ':id', component: DebtDetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  // Si los componentes no son standalone, agrégalos en declarations
})
export class DebtsModule {}
