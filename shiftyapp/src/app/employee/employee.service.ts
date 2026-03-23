import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from './employee';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root',})
export class EmployeeService 
{
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // GET
  public  getEmployees(): Observable<Employee[]> {
    return (this.http.get<Employee[]>(`${this.apiServerUrl}/all`));
  }

  public  getEmployeeCodes(): Observable<number[]> {
    return (this.http.get<number[]>(`${this.apiServerUrl}/find/all`));
  }

  public  findEmployee(id: number): Observable<Employee> {
    return (this.http.get<Employee>(`${this.apiServerUrl}/find/${id}`));
  }

  // POST
  public  addEmployee(employee: Employee): Observable<Employee> {
    return (this.http.post<Employee>(`${this.apiServerUrl}/add`, employee));
  }

  // PUT
  public  updateEmployee(employee: Employee): Observable<Employee> {
    return (this.http.put<Employee>(`${this.apiServerUrl}/update`, employee));
  }

  // DELETE
  public  deleteEmployee(employeeId: number): Observable<void> {
    return (this.http.delete<void>(`${this.apiServerUrl}/delete${employeeId}`));
  }
}
