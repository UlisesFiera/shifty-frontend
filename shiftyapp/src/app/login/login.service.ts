import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface LoginResponse 
{
	token: string;
	message: string;
}

@Injectable({providedIn: 'root',})
export class LoginService
{
	private apiServerUrl = environment.apiBaseUrl;
	
	constructor(private router: Router, private http: HttpClient) {}

	// Methods

	public logout()
	{
		localStorage.removeItem('token');
		this.router.navigate(['/login'])
		console.log("logging out...");
	}

	// POST
	public  login(loginForm: FormGroup): Observable<any>
	{
		return (this.http.post<LoginResponse>(`${this.apiServerUrl}/login`, loginForm.value).pipe(tap(res => localStorage.setItem('token', res.token))));
	}
}