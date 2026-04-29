import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { Header } from './header/header';
import { CommonModule } from '@angular/common';

@Component(
{
	selector: 'app-root',
	standalone: true,
	imports: [RouterModule, Header, CommonModule],
	templateUrl: `/app.html`,
})

export class App 
{
	showHeader = true;

	constructor(private router: Router) 
	{
		this.router.events.subscribe(event => 
			{
			if (event instanceof NavigationEnd) 
			{
				const hiddenRoutes = ['/login'];
				this.showHeader = !hiddenRoutes.includes(event.urlAfterRedirects);
			}
		});
	}
}
