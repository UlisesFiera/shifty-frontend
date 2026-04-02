import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { Hello } from './hello/hello';

export const routes: Routes = 
[
	{ path: '', redirectTo: 'hello', pathMatch: 'full' },
	{ path: 'hello', component: Hello },
	{ path: 'employees', component: EmployeeComponent },
];
