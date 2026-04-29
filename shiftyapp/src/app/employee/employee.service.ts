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
	imageUrl?: string;
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

	public	getElapsedTime(empId: number): Observable<any>
	{
		return (this.http.get<any>(`${this.apiServerUrl}/employees/${empId}/elapsed`));
	}

	public  findEmployee(employeeCode: string): Observable<Employee> 
	{
		return (this.http.get<Employee>(`${this.apiServerUrl}/employees/${employeeCode}`));
	}

	public	getImageUrl(emp: Employee): string 
	{
		if (emp.imageUrl?.startsWith('/files/'))
			return ("http://192.168.1.136:8080" + emp.imageUrl);
	
		if (!emp.imageUrl) 
			return '';

		if (emp.imageUrl.startsWith('/files/'))
			return ("http://192.168.1.136:8080" + emp.imageUrl);

		// Handle absolute file paths from backend
		if (emp.imageUrl.includes('/uploads/')) {
			const filename = emp.imageUrl.split('/uploads/').pop();
			return ("http://192.168.1.136:8080" + '/files/' + filename);
		}
		return emp.imageUrl;
	}

	// POST
	public  addEmployee(employee: Employee): Observable<Employee> 
	{
		return (this.http.post<Employee>(`${this.apiServerUrl}/employees`, employee));
	}

	public  uploadFile(formData: FormData): Observable<string> 
	{
		return (this.http.post(`${this.apiServerUrl}/upload`, formData, { responseType: 'text' }));
	}

	// PUT
	public	updateEmployee(empId: number, data: EmployeeUpdate): Observable<Employee>
	{
		return (this.http.patch<Employee>(`${this.apiServerUrl}/employees/${empId}`, data));
	}

	// DELETE
	public  deleteEmployee(employeeId: number): Observable<void> 
	{
		console.log("Deleting employee id: " + employeeId);
		
		return (this.http.delete<void>(`${this.apiServerUrl}/employees/${employeeId}`));
	}
}
