import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Entries, GetAllEntriesInRangeRequest } from './entries';

@Injectable({providedIn: 'root'})
export class EntriesService 
{
	private apiServerUrl = environment.apiBaseUrl;

	constructor(private http: HttpClient) {}

	public getAllEntriesInRange(params: GetAllEntriesInRangeRequest): Observable<Entries[]>
	{
		let httpParams = new HttpParams()
			.set('startDate', params.startDate.toISOString().split('T')[0])
			.set('endDate', params.endDate.toISOString().split('T')[0]);

		if (params.empId !== undefined)
			httpParams.set('empId', params.empId.toString());
		
		return (this.http.get<Entries[]>(`${this.apiServerUrl}/entries/range`, { params: httpParams }));
	}

	public clockIn(empId: number): Observable<Entries> 
	{
		return (this.http.post<Entries>(`${this.apiServerUrl}/entries/${empId}/clock-in`, null));
	}

	public clockOut(empId: number): Observable<Entries>
	{
		return (this.http.put<Entries>(`${this.apiServerUrl}/entries/${empId}/clock-out`, null))
	}

	public breakIn(empId: number): Observable<Entries> 
	{
		return (this.http.put<Entries>(`${this.apiServerUrl}/entries/${empId}/break-in`, null));
	}

	public breakOut(empId: number): Observable<Entries>
	{
		return (this.http.put<Entries>(`${this.apiServerUrl}/entries/${empId}/break-out`, null))
	}
}
