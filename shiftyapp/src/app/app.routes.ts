import { Routes } from '@angular/router';
import { FindEmployeeComponent } from './find-employee/find-employee.component';
import { Hello } from './hello/hello.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ForbiddenGuard } from './forbidden/forbidden.guard';

export const routes: Routes = 
[
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'hello', component: Hello },
	{ path: 'find-employee', component: FindEmployeeComponent, canActivate: [ForbiddenGuard]},
	{ path: 'employee/:id', component: EmployeeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'add-employee', component: AddEmployeeComponent },
	{ path: 'employees/:login', component: Hello },
	{ path: 'forbidden', component: ForbiddenComponent}
];
