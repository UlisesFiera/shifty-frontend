import { CommonModule } from "@angular/common";
import { Component, NgModule, signal } from "@angular/core";
import { EmployeeService, EmployeeUpdate } from "./employee.service";
import { Employee } from "./employee";
import { ActivatedRoute } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component(
{
	selector: 'app-employee',
	imports: [CommonModule, FormsModule],
	templateUrl: './employee.html',
	styleUrl: './employee.scss',
})

export class EmployeeComponent
{
	protected	employee = signal<Employee | null>(null);
	private		employeeId!: string;
	protected	lastShift!: string;
	protected	isEditing = signal(false);

	// Employee editing fields
	protected	editName: string = '';
	protected	editEmail: string = '';
	protected	editJobTitle: string = '';

	constructor(private route: ActivatedRoute, private empService: EmployeeService) {}
  
	ngOnInit() 
	{
		this.employeeId = String(this.route.snapshot.paramMap.get('id'));
		this.empService.findEmployee(this.employeeId).subscribe(employee =>
		{
			this.employee.set(employee);
			this.parseDate(employee.lastClockIn);
			this.editName = employee.name;
			this.editEmail = employee.email;
			this.editJobTitle = employee.jobTitle;
		});
	}

	// modals
	
	openEditPanel() { this.isEditing.set(true); } 
	
	closeEditPanel() { this.isEditing.set(false); }

	// methods

	saveChanges(employee: Employee)
	{
		let employeeUpdate: EmployeeUpdate = {};

		employeeUpdate.name = this.editName;
		employeeUpdate.email = this.editEmail;
		employeeUpdate.jobTitle = this.editJobTitle;

		this.empService.updateEmployee(employee.id, employeeUpdate).subscribe( data => { console.log("Update successful"); window.location.reload();});
	}

	// utils

	parseDate(date: string)
	{
		const jsDate = new Date(date);

		const year = jsDate.getFullYear();
		const month = String(jsDate.getMonth() + 1).padStart(2, '0');
		const day = String(jsDate.getDay()).padStart(2, '0');
		const hours = String(jsDate.getHours()).padStart(2, '0');
		const minutes = String(jsDate.getMinutes()).padStart(2, '0');

		this.lastShift = `${year}-${month}-${day} ${hours}:${minutes}`;
	}

  }