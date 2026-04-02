import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { Header } from './header/header';
import { CommonModule } from '@angular/common';
import { NgZone } from '@angular/core';

@Component(
{
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, Header, CommonModule],
  templateUrl: `/app.html`,
})

export class App 
{

}
