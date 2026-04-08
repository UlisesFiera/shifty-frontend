import { Routes } from '@angular/router';
import { FindEmployee } from './find-employee/find-employee-component';
import { Hello } from './hello/hello.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = 
[
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'hello', component: Hello },
	{ path: 'find-employee', component: FindEmployee },
	{ path: 'employee/:id', component: EmployeeComponent },
	{ path: 'login', component: LoginComponent },
];
