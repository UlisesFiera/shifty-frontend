import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => 
{
	const authService = inject(AuthService);
	const token = authService.getToken();
	const cloned = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

	console.log('Intercepting request:', cloned.url, 'Token:', token);
	
	return next(cloned);
};
