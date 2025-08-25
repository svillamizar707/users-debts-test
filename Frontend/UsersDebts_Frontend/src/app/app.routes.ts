
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{
		path: 'login',
		loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
	},
	{
		path: 'register',
		loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent)
	},
	{
		path: '',
		canActivate: [authGuard],
		children: [
			{
				path: 'debts',
				loadChildren: () => import('./features/debts/debts.module').then(m => m.DebtsModule)
			},
			// Aquí puedes agregar otras rutas protegidas
		]
	},
	{ path: '**', redirectTo: 'login' }
];
