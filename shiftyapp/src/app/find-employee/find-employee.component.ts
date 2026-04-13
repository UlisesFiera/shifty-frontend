import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee/employee.service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component(
{
	selector: 'app-find-employee',
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './find-employee.html',
	styleUrl: './find-employee.scss',
})

export class FindEmployeeComponent
{
	protected 	employees = signal<Employee[]>([]);
	protected 	filteredEmps = signal<Employee[]>([]);
	protected 	searchControl = new FormControl("");

	protected 	index = signal(0);
	private		edge: number = 0;

	constructor(private empService: EmployeeService, private router: Router) {}

	ngOnInit()
	{
		this.empService.getEmployees().subscribe(data => 
		{
			this.employees.set(data);
			this.filteredEmps.set(this.employees());
		});
	}

	goToEmployeePage(employee: Employee)
	{
		let	selectedEmp: Employee = employee;

		console.log("Heading to employee page...");
		this.router.navigate(['/employee/' + employee.id]);
	}

	onType(value: string)
	{
		let result;

		if (!value) 
		{
			this.filteredEmps.set(this.employees());
			return ;
		}

		result = this.employees().filter(
			emp => emp.name.toLowerCase().includes(value.toLowerCase())
			|| emp.employeeCode.toLowerCase().includes(value.toLowerCase()));

		this.filteredEmps.set(result);
	}

	indexNext() 
	{
		this.edge = Math.floor(this.filteredEmps().length);

		if (this.index() >= this.edge - 1)
			{this.index.set(0); return ;}

		this.index.set((this.index() + 1)); 
	}
	  
	indexPrev() 
	{
		this.edge = Math.floor(this.filteredEmps().length / 2);

		if (this.index() == -1)
			return ;
		
		this.index.set((this.index() - 1));
	}

	// 160 is the width of the elements + the gap; we substract 1 step so we end up just 1 position right to the "add emp" button
	getTransform() 
	{
		if (this.filteredEmps().length == 0)
			return ;
		let move: number = 0;
		let step: number = 160;
		let position: number = (Math.floor(((this.filteredEmps().length) * 160) / 2)) - step;

		move = -step * this.index();
		position += move;

		return (`translateX(${position}px)`);
	}
}
