import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee/employee.service';
import { Router } from '@angular/router';

@Component(
{
	selector: 'app-add-employee',
	imports: [FormsModule],
	templateUrl: './add-employee.html',
	styleUrl: './add-employee.scss',
})
export class AddEmployeeComponent
{
	protected newEmployee: Employee = {} as Employee;
	protected postName = "";
	protected postEmail = "";
	protected postRole = "";

	constructor(private empService: EmployeeService, private router: Router) {}

	postEmp()
	{
		if (this.postName == "" || this.postEmail == "" || this.postRole == "")
			return ;

		this.newEmployee.name = this.postName;
		this.newEmployee.email = this.postEmail;
		this.newEmployee.jobTitle = this.postRole;

		this.empService.addEmployee(this.newEmployee).subscribe(data =>
		{
			console.log("New employee added.", data);
			this.router.navigate(['/find-employee/']);
		})
	}
}
