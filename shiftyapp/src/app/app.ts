import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';

import { Header } from './header/header';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { UiStateService } from './header/uiState.service';

@Component(
{
	selector: 'app-root',
	standalone: true,
	imports: [RouterModule, Header, CommonModule],
	templateUrl: `/app.html`,
})

export class App implements OnInit
{
	showHeader = true;

	constructor(private router: Router, private ui: UiStateService) 
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

	ngOnInit()
	{
		this.router.events
		.pipe(filter((e): e is NavigationStart => e instanceof NavigationStart))
		.subscribe(e => 
		{
			if (e.url === '/forbidden')
				this.ui.showHeader = false;
			else
				this.ui.showHeader = true;
		});
	}
}
