import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hello',
  imports: [],
  templateUrl: './hello.html',
  styleUrl: './hello.scss',
})
export class Hello {

  constructor(private router: Router) {}

  protected title = "hello, boss";

  protected goToEmployees() {
    console.log('Button clicked');
    this.router.navigate(['/employees']);
  }

  protected goToShiftPannel() {
    console.log('Button clicked');
    this.router.navigate(['/employees']);
  }
}
