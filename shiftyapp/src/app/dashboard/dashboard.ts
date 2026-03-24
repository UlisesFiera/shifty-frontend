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
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './dashboard.html',
	styleUrl: './dashboard.scss',
})

export class Dashboard implements OnInit
{
	public entries = signal<Entries[]>([]);

	constructor(private router: Router, private entriesService: EntriesService ) {}

	ngOnInit() 
	{
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
			next: (response: Entries[]) => { this.entries.set(response), console.log("Today's entries: "), console.log(response) },
			error: (err) => { console.error(err) }
		})
	}

	getOuts(entry: Entries): boolean 
	{
		if (entry.clockOut != null)
			return (true);
		return (false);
	}

	getInPosition(entry: Entries): string
	{
		let timelineWidht: number = 1200;
		let minuteStep: number = timelineWidht / 1440;
		const clockInDate = new Date(entry.clockIn);
		let clockInMins: number;
		let position: number;

		clockInMins = (clockInDate.getHours() * 60) + clockInDate.getMinutes();
		position = minuteStep * clockInMins;

		return (`${position}px`);
	}

	getOutPosition(entry: Entries): string
	{
		if (entry.clockOut == null)
			return ('null');

		let timelineWidht: number = 1200;
		let minuteStep: number = timelineWidht / 1440;
		const clockOutDate = new Date(entry.clockOut);
		let clockOutMins: number;
		let position: number;

		clockOutMins = (clockOutDate.getHours() * 60) + clockOutDate.getMinutes();
		position = minuteStep * clockOutMins;

		return (`${position}px`);
	}
}

// position = timeline width / 1440 + ((clock-in?out hour * 60) + (clock-in?out min))
