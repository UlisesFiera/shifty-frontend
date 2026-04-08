import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';

bootstrapApplication(App, 
{
	providers: [
		appConfig.providers,
		provideRouter(routes)
	]
});
