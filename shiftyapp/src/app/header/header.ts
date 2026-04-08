import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, NgModel } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../login/login.service';

@Component(
{
	selector: 'app-header',
	imports: [MatToolbarModule, MatButtonModule, MatInputModule, MatIconModule, FormsModule, CommonModule ],
	templateUrl: './header.html',
	styleUrl: './header.scss',
})

export class Header 
{
	showHeader = true;

	constructor(private logService: LoginService, private router: Router) 
	{
		this.router.events.subscribe(event => 
		{
			if (event instanceof NavigationEnd) 
			{
				this.showHeader = !this.router.url.startsWith('/hello');
			}
		});
	}

	logout()
	{
		this.logService.logout();
	}
}
