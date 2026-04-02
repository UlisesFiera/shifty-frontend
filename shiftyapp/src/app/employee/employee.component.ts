import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';

import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.html',
  styleUrls: ['./employee.css']
})

export class EmployeeComponent implements OnInit {

  public employees = signal<Employee[]>([]);
  public selectedEmployee: Employee = {} as Employee;

  private addModal!: Modal;
  private editModal!: Modal;
  private deleteModal!: Modal;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
    this.addModal = new Modal(document.getElementById('addEmployeeModal')!);
    this.editModal = new Modal(document.getElementById('editEmployeeModal')!);
    this.deleteModal = new Modal(document.getElementById('deleteEmployeeModal')!);
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response: Employee[]) => {
        this.employees.set(response);
      },
      error: (err) => console.error(err)
    });
  }

  public onOpenModal(employee: Employee | null, mode: string) {
    if (mode === 'add') {
      this.addModal.show();
    }
    if (mode === 'edit' && employee) {
      this.selectedEmployee = { ...employee };
      this.editModal.show();
    }
    if (mode === 'delete' && employee) {
      this.selectedEmployee = employee;
      this.deleteModal.show();
    }
  }

  public onAddEmployee(addForm: NgForm): void {
    this.employeeService.addEmployee(addForm.value).subscribe({
      next: () => {
        this.getEmployees();
        this.addModal.hide();
        addForm.reset();
      },
      error: (err) => console.error(err)
    });
  }

  public onDeleteEmployee(): void {
    this.employeeService.deleteEmployee(this.selectedEmployee.id).subscribe({
      next: () => {
        this.getEmployees();
        this.deleteModal.hide();
      },
      error: (err) => console.error('Error deleting employee', err)
    });
  }
}
