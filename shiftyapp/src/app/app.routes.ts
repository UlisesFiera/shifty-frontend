import { Routes } from '@angular/router';
import { FindEmployee } from './find-employee/find-employee-component';
import { Hello } from './hello/hello.component';
import { EmployeeComponent } from './employee/employee.component';

export const routes: Routes = 
[
	{ path: '', redirectTo: 'hello', pathMatch: 'full' },
	{ path: 'hello', component: Hello },
	{ path: 'find-employee', component: FindEmployee },
	{ path: 'employee/:id', component: EmployeeComponent }
];
