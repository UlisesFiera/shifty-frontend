import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./auth.service";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => 
{
	const authService = inject(AuthService);
	const router = inject(Router);
	const token = authService.getToken();
	const cloned = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

	return next(cloned).pipe(catchError(err => 
	{
		if (err.status == 401 || err.status == 403) { router.navigate(['/login']) };
		return (throwError(() => err));
	}));
};
