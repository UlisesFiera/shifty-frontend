import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { UiStateService } from "../header/uiState.service";
import { LoginService } from "../login/login.service";

@Injectable({ providedIn: 'root' })
export class ForbiddenGuard implements CanActivate 
{
	constructor(private ui: UiStateService, private router: Router, private log: LoginService) {}

	canActivate(): boolean | UrlTree 
	{
		if (this.ui.showHeader === false)
		{
			this.log.logout();
			this.ui.showHeader = true;
		
			return this.router.createUrlTree(['/forbidden']);
		}

		return (true);
	}
}
