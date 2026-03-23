import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EntriesService } from '../entries/entries.service';
import { Entries, GetAllEntriesInRangeRequest } from '../entries/entries';
import { Employee } from '../employee/employee';

@Component(
{
	selector: 'app-dashboard',
	imports: [CommonModule, FormsModule],
	templateUrl: './dashboard.html',
	styleUrl: './dashboard.scss',
}
)

export class Dashboard implements OnInit
{
	public entries = signal<Entries[]>([]);

	constructor(private router: Router, private entriesService: EntriesService ) {}

	ngOnInit() 
	{
		let entriesRequest: GetAllEntriesInRangeRequest = { startDate: new Date(2026, 1, 23), endDate: new Date(2026, 3, 23) };
		
		this.entriesService.getAllEntriesInRange(entriesRequest).subscribe(
		{
			next: (response: Entries[]) => {this.entries.set(response), console.log(response)},
			error: (err) => {console.error(err)}
		})
	}
}

 // If exist:
 // - update lastIn
 // - trigger time tracker
 // - alert for +12 hours straight

 // start counting time; when out, stop count and send for storing; if shift is 12h+ long, alert
