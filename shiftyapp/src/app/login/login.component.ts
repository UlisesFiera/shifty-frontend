import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component(
{
	selector: 'app-login',
	imports: [ReactiveFormsModule],
	templateUrl: './login.html',
	styleUrl: './login.scss',
})

export class LoginComponent
{
	protected loginForm:	FormGroup;

	constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private loginService: LoginService) 
	{
		this.loginForm = this.formBuilder.group(
		{
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}
  
	onSubmit() 
	{
		if (this.loginForm.valid) 
		{
			this.loginService.login(this.loginForm).subscribe(
			{
				next: (response) => { console.log('Login response:', response); this.authService.setToken(response.token), this.router.navigate(['/find-employee']);}, 
				error: (error) => {console.error('Login error:', error);}
			});
		}
	}

}
