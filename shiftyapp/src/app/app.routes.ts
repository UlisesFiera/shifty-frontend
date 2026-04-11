import { Routes } from '@angular/router';
import { FindEmployeeComponent } from './find-employee/find-employee.component';
import { Hello } from './hello/hello.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

export const routes: Routes = 
[
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'hello', component: Hello },
	{ path: 'find-employee', component: FindEmployeeComponent },
	{ path: 'employee/:id', component: EmployeeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'add-employee', component: AddEmployeeComponent },
];
