import { Component } from '@angular/core';

import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee/employee.service';

@Component(
{
	selector: 'app-clocker',
	imports: [],
	templateUrl: './clocker.html',
	styleUrl: './clocker.scss',
})

export class Clocker 
{
	public	empCodeInput: string = '';


	constructor( private employeeService: EmployeeService ) {}

	saveEmpcode(empCode: string)
	{
		this.empCodeInput = empCode;
		console.log('Entered empcode:', this.empCodeInput);
	}

	checkEmployee(empCode: string)
	{
		 // add getter with emp alias
	}
}
