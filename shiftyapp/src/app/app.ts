import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Header } from './header/header';

@Component(
{
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, Header],
  templateUrl: `/app.html`,
})

export class App 
{
	public time: string = "";

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit() 
	{
		this.updateTime();
		setInterval(() => 
		{
			this.updateTime();

      		// Tells Angular to update template
			this.cdr.markForCheck();
		}, 
		1000);
	}

	public updateTime(): void 
	{
		this.time = new Date().toLocaleTimeString();
	}
}
