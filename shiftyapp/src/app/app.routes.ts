import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { Hello } from './hello/hello';
import { Dashboard } from './dashboard/dashboard';
import { Clocker } from './clocker/clocker';

export const routes: Routes = 
[
	{ path: '', redirectTo: 'hello', pathMatch: 'full' },
	{ path: 'hello', component: Hello },
	{ path: 'employees', component: EmployeeComponent },
	{ path: 'dashboard', component: Dashboard },
	{ path: 'clocker', component: Clocker },
];
