import { RouterModule } from '@angular/router';
import { Header } from './header/header';
import { Dashboard } from './dashboard/dashboard';
import { ChangeDetectorRef, Component, NgModule, OnInit, signal } from '@angular/core';

@Component({
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
          this.cdr.markForCheck();       // tell Angular to update template
        }, 
        1000);
  }

  public updateTime(): void 
  {
    this.time = new Date().toLocaleTimeString();
  }
}