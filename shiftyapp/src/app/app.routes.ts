import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { Hello } from './hello/hello';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'hello', pathMatch: 'full' },
  { path: 'hello', component: Hello },
  { path: 'minions', component: EmployeeComponent },
  { path: 'dashboard', component: Dashboard },
];
