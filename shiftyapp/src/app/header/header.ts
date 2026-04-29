import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, NgModel } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login/login.service';
import { AuthService } from '../auth/auth.service';
import { UiStateService } from './uiState.service';

@Component(
{
	selector: 'app-header',
	imports: [MatToolbarModule, MatButtonModule, MatInputModule, MatIconModule, FormsModule, CommonModule ],
	templateUrl: './header.html',
	styleUrl: './header.scss',
})

export class Header 
{
	constructor( public authService: AuthService, public logService: LoginService, private router: Router, public ui: UiStateService ) {}

	get isHelloPage(): boolean 
	{
		return (this.router.url.includes('/hello'));
	}

	logOut()
	{
		this.ui.showHeader = true; 
		this.logService.logout(); 
		window.location.reload()
	}
}
