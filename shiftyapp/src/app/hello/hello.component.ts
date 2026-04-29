import { ChangeDetectorRef, Component, computed, ElementRef, NgZone, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EntriesService } from '../entries/entries.service';
import { Entries, GetAllEntriesInRangeRequest } from '../entries/entries';
import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee/employee.service';

@Component(
{
	selector: 'app-hello',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './hello.html',
	styleUrl: './hello.scss',
})

export class Hello implements OnInit
{
	public	emps = signal<Employee[]>([]);
	public	empCount: number = 0;
	public	activeEmps = computed(() => 
		this.emps()
			.filter(emp => emp.activeEntryId != null)
			.map((emp, index) => (
			{
				...emp,
				position: this.setPosition(index),
				trailPos: this.setTrailPosition(index),
				elapsedTxt: emp.elapsedTxt
			}
			)));
	
	public 	activeEmpCount: number = 0;
	public	empCodeInput: string = '';
	public	selectedEmp: Employee | null = null;
	public	fallbackImage = 'avatar.svg';
	
	constructor(private router: Router, private entriesService: EntriesService, public employeeService: EmployeeService, private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

	ngOnInit() 
	{
		this.ngZone.runOutsideAngular(() => 
		{
			// Update elapsedTxt for all active employees every minute
			setInterval(() => 
			{
				this.ngZone.run(() =>
				{
					this.emps().forEach(emp => 
					{
						if (emp.activeEntryId) 
						{
							this.setTrailSize(emp);
						}
					});
				});
			}, 60000);
		});

		this.getActiveEmps();
	}

	// Loads active emps
	getActiveEmps()
	{
		this.employeeService.getEmployees().subscribe(
		{
			next: (emps) => 
			{ 
				this.emps.set(emps);
				this.emps().forEach(emp => 
				{
					if (emp.activeEntryId)
						this.setTrailSize(emp);
				}),
				this.empCount = this.emps().length;
				this.activeEmpCount = this.activeEmps().length;
				console.log("Employees loaded");
			},
			error: (err) => { console.error(err) }
		})
	}

	setPosition(index: number)
	{
		const	startColumm = 10;
		const	step = 100;
		const	position: String = (startColumm + step * index) + 'px';

		console.log("position of " + index + " is " + position);
		return (position);
	}

	setTrailPosition(index: number)
	{
		const	leftPos = 300;
		const	step = 100;
		const	offset = 0;

		if (index == 0)
			return (leftPos + offset + 'px');

		return ((leftPos + step * index) + offset + 'px');
	}

	setTrailSize(emp: Employee)
	{
		const minWidth = 10;
		const maxWidth = 500;
		const step = maxWidth / 43200;
	  
		this.employeeService.getElapsedTime(emp.id).subscribe(res => 
		{
			const 	elapsed = this.parseDuration(res);
			let 	Width = minWidth + elapsed * step;

			if (Width > maxWidth)
				Width = maxWidth;
	  
			this.emps.update(list =>
				list.map(e =>
				e.id === emp.id
				? {
					...e,
					trailWidth: Width + 'px',
					elapsedTxt: this.formatSecondsToHM(elapsed)
				  }
					: e
				)
			);
		});
	}

	parseDuration(duration: string): number 
	{
		const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/);
	  
		const hours = Number(match?.[1] || 0);
		const minutes = Number(match?.[2] || 0);
		const seconds = Number(match?.[3] || 0);
	  
		return (hours * 3600 + minutes * 60 + seconds);
	}

	formatSecondsToHM(totalSeconds: number): string 
	{
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
	  
		return (`${hours}:${minutes.toString().padStart(2, '0')}`);
	}

	saveEmpcode(empCode: string)
	{
		this.empCodeInput = empCode;
		console.log('Entered empcode:', this.empCodeInput);

		this.checkEmployee(empCode);
	}

	checkEmployee(empCode: string)
	{
		this.employeeService.findEmployee(empCode).subscribe(
		{
			next: (employee: Employee) => { this.selectedEmp = employee; this.cdr.detectChanges(); console.log('Employee Id is valid: ' + empCode); },
			error: (err) => { this.selectedEmp = null; console.error('Employee ' + empCode + ' not found or error:', err); }
		});
	}

	// Returns entries with a clock-out value
	getOuts(entry: Entries): boolean 
	{
		if (entry.clockOut != null)
			return (true);
		return (false);
	}

	clockInClick()
	{
		if (this.selectedEmp != null)
			{
				this.entriesService.clockIn(this.selectedEmp.id).subscribe(
				{
					next: () => { console.log("Clocked in successful"); this.selectedEmp = null, this.getActiveEmps() },
					error: (err) => { console.log("Clocked in failed"); }
				})
			}
	}

	clockOutClick()
	{
		if (this.selectedEmp != null)
		{
			this.entriesService.clockOut(this.selectedEmp.id).subscribe(
			{
				next: () => { console.log("Clocked out successful"); this.selectedEmp = null, this.getActiveEmps() },
				error: (err) => { console.log("Clocked out failed"); }
			})
		}
	}

	breakInClick()
	{
		if (this.selectedEmp != null)
		{
			this.entriesService.breakIn(this.selectedEmp.id).subscribe(
			{
				next: () => { console.log("Break in successful"); this.selectedEmp!.onBreak = true; this.selectedEmp = null, this.getActiveEmps() },
				error: (err) => { console.log("Break in failed"); }
			})
		}
	}

	breakOutClick()
	{
		if (this.selectedEmp != null)
		{
			this.entriesService.breakOut(this.selectedEmp.id).subscribe(
			{
				next: () => { console.log("Break out successful"); this.selectedEmp!.onBreak = false; this.selectedEmp = null, this.getActiveEmps() },
				error: (err) => { console.log("Break out failed"); }
			})
		}
	}

	cancelClick()
	{
		this.selectedEmp = null;
	}

	goToEmployeePage(employee: Employee)
	{
		console.log("Heading to employee page...");
		this.router.navigate(['/employee/' + employee.id]);
	}
}
