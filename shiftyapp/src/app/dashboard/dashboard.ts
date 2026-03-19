import { ChangeDetectorRef, Component, NgModule, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EmployeeService } from '../employee/employee.service'
import { Employee } from '../employee/employee';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit{

  public selectedEmployee: Employee = {} as Employee;
  public time: string = "";
  public userInput: string = '';
  public empCodes!: number[];

  constructor(private router: Router, private cdr: ChangeDetectorRef, private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployeeCodes();
    this.updateTime();               // initial time

    setInterval(() => {
      this.updateTime();
      this.cdr.markForCheck();       // tell Angular to update template
    }, 1000);
  }

  public getEmployeeCodes(): void {
    this.employeeService.getEmployeeCodes().subscribe({
      next: (ids) => this.empCodes = ids,
      error: (err) => console.error(err)
    });
  }

  public updateTime(): void {
    this.time = new Date().toLocaleTimeString();
  }

  public onSubmit(): void {
    const userCode: number = parseInt(this.userInput);

    if (!this.userInput)
      console.error('empty form');
    else if (this.userInput.length > 4)
      console.error('invalid input');
    else if (!this.empCodes.includes(userCode)) 
      console.error('Not found');
    else if (this.empCodes.includes(userCode))
      this.clockIn(userCode);
  }

  public clockIn(id: number): void {
    console.log(`Found: ${id}`);
    this.employeeService.findEmployee(id).subscribe({
      next: (employee) => {
        this.selectedEmployee = employee;
        this.selectedEmployee.lastIn = new Date().toLocaleTimeString();
        this.employeeService.updateEmployee(this.selectedEmployee).subscribe({
          next: () => console.log('Employee lastIn updated'),
          error: (err) => console.error(err)
        });
      },
      error: (err) => console.error(err) 
    });
  }
}

 // If exist:
 // - update lastIn
 // - trigger time tracker
 // - alert for +12 hours straight

 // start counting time; when out, stop count and send for storing; if shift is 12h+ long, alert
