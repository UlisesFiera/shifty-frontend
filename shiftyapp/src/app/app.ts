import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './header/header';
import { Dashboard } from './dashboard/dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, Header],
  templateUrl: `/app.html`,
})
export class App {}