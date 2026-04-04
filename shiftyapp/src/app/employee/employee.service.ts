import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from './employee';
import { environment } from '../../environments/environment';

export interface EmployeeUpdate 
{
	name?: string;
	email?: string;
	jobTitle?: string;
  }

@Injectable({providedIn: 'root',})
export class EmployeeService 
{
	private apiServerUrl = environment.apiBaseUrl;

	constructor(private http: HttpClient) {}

	// GET
	public  getEmployees(): Observable<Employee[]> 
	{
		return (this.http.get<Employee[]>(`${this.apiServerUrl}/employees`));
	}

	public  findEmployee(employeeId: string): Observable<Employee> 
	{
		return (this.http.get<Employee>(`${this.apiServerUrl}/employees/${employeeId}`));
	}

	// POST
	public  addEmployee(employee: Employee): Observable<Employee> 
	{
		return (this.http.post<Employee>(`${this.apiServerUrl}/employees`, employee));
	}

	// PUT
	public	updateEmployee(id: number, data: EmployeeUpdate): Observable<Employee>
	{
		return (this.http.patch<Employee>(`${this.apiServerUrl}/employees/${id}`, data));
	}

	// DELETE
	public  deleteEmployee(employeeId: number): Observable<void> 
	{
		return (this.http.delete<void>(`${this.apiServerUrl}/employees/${employeeId}`));
	}
}
