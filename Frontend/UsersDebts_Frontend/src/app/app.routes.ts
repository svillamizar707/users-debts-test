
import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{
		path: '',
		loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: 'debts',
		loadChildren: () => import('./features/debts/debts.module').then(m => m.DebtsModule)
	},
	{ path: '**', redirectTo: 'debts' }
];
