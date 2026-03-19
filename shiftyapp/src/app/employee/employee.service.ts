import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from './employee';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root',})
export class EmployeeService {
  
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  // GET
  public  getEmployees(): Observable<Employee[]> {
    return (this.http.get<Employee[]>(`${this.apiServerUrl}/shifty/all`));
  }

  public  getEmployeeCodes(): Observable<number[]> {
    return (this.http.get<number[]>(`${this.apiServerUrl}/shifty/find/all`));
  }

  public  findEmployee(id: number): Observable<Employee> {
    return (this.http.get<Employee>(`${this.apiServerUrl}/shifty/find/${id}`));
  }

  // POST
  public  addEmployee(employee: Employee): Observable<Employee> {
    return (this.http.post<Employee>(`${this.apiServerUrl}/shifty/add`, employee));
  }

  // PUT
  public  updateEmployee(employee: Employee): Observable<Employee> {
    return (this.http.put<Employee>(`${this.apiServerUrl}/shifty/update`, employee));
  }

  // DELETE
  public  deleteEmployee(employeeId: number): Observable<void> {
    return (this.http.delete<void>(`${this.apiServerUrl}/shifty/delete${employeeId}`));
  }
}
