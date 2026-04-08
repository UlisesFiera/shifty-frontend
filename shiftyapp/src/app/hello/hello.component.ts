import { ChangeDetectorRef, Component, computed, ElementRef, NgZone, OnInit, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EntriesService } from '../entries/entries.service';
import { Entries, GetAllEntriesInRangeRequest } from '../entries/entries';
import { Employee } from '../employee/employee';
import { EmployeeService } from '../employee/employee.service';
import * as Graphics from './utils/timeline.utils';
import { MatIcon } from '@angular/material/icon';

@Component(
{
	selector: 'app-hello',
	standalone: true,
	imports: [CommonModule, FormsModule, MatIcon],
	templateUrl: './hello.html',
	styleUrl: './hello.scss',
})

export class Hello implements OnInit
{
	@ViewChild('clock', { static: true }) clockEl!: ElementRef<HTMLDivElement>;

	public 	entries = signal<Entries[]>([]);
	public 	entryValues = computed(() => this.entries().map(entry => (
	{
		inPosition: Graphics.getInPosition(entry),
		outPosition: Graphics.getOutPosition(entry),
		lineHeight: Graphics.getEntryLineHeight(entry),
		hasOut: this.getOuts(entry),
		image: 'url(https://randomuser.me/api/portraits/men/1.jpg)',
	})));
	
	public	empCodeInput: string = '';
	public	selectedEmp: Employee | null = null;
	
	constructor(private router: Router, private entriesService: EntriesService, private employeeService: EmployeeService, private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

	ngOnInit() 
	{
		this.ngZone.runOutsideAngular(() => 
		{
			setInterval(() => 
			{
				this.clockEl.nativeElement.textContent = new Date().toLocaleTimeString();
			}, 
			1000);
		});
		
		this.getTodaysEntries();
	}

	// Loads today's clock-ins and clock-outs
	getTodaysEntries()
	{
		let startDate = new Date();
		let endDate = new Date();

		let entriesRequest: GetAllEntriesInRangeRequest = { startDate, endDate };
		
		this.entriesService.getAllEntriesInRange(entriesRequest).subscribe(
		{
			next: (response: Entries[]) => { this.entries.set(response), console.log("Today's entries: "), console.log(response); },
			error: (err) => { console.error(err) }
		})
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
					next: () => { console.log("Clocked in successful"); this.selectedEmp = null, this.getTodaysEntries() },
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
				next: () => { console.log("Clocked out successful"); this.selectedEmp = null, this.getTodaysEntries() },
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
				next: () => { console.log("Break in successful"); this.selectedEmp = null, this.getTodaysEntries() },
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
				next: () => { console.log("Break out successful"); this.selectedEmp = null, this.getTodaysEntries() },
				error: (err) => { console.log("Break out failed"); }
			})
		}
	}

	cancelClick()
	{
		this.selectedEmp = null;
	}

	login()
	{
		this.router.navigate(['/login']);
	}
}
