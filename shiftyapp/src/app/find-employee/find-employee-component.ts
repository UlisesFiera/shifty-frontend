import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee/employee.service';
import { Router } from '@angular/router';

@Component(
{
	selector: 'app-find-employee',
	imports: [CommonModule],
	templateUrl: './find-employee.html',
	styleUrl: './find-employee.scss',
})

export class FindEmployee
{
	protected 	employees = signal<Employee[]>([]);

	constructor(private empService: EmployeeService, private router: Router) {}

	ngOnInit()
	{
		this.empService.getEmployees().subscribe(data => 
		{
			this.employees.set(data);
		});
	}

	goToEmployeePage(employee: Employee)
	{
		let	selectedEmp: Employee = employee;

		console.log("Heading to employee page...");
		this.router.navigate(['/employee/' + employee.id]);
	}
}
