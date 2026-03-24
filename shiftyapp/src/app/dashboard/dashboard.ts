import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EntriesService } from '../entries/entries.service';
import { Entries, GetAllEntriesInRangeRequest } from '../entries/entries';

interface EntryHeight 
{
    entry: Entries;
    height: number;
	upDirection: boolean;
}


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
	private timelineWidht: number = 1200;
	private minuteStep: number = this.timelineWidht / 1440;
	private entryHeights: EntryHeight[] = [];
	private usedHeights: number[] = [];

	constructor(private router: Router, private entriesService: EntriesService) {}

	ngOnInit() 
	{
		this.checkLastReset();
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
			next: (response: Entries[]) => { this.entries.set(response), console.log("Today's entries: "), console.log(response), this.assignEntryHeights(); },
			error: (err) => { console.error(err) }
		})
	}

	// Returns entries with clock-out value
	getOuts(entry: Entries): boolean 
	{
		if (entry.clockOut != null)
			return (true);
		return (false);
	}

	getInPosition(entry: Entries): string
	{
		const clockInDate = new Date(entry.clockIn);
		let clockInMins: number;
		let position: number;

		clockInMins = (clockInDate.getHours() * 60) + clockInDate.getMinutes();
		position = this.minuteStep * clockInMins;

		return (`${position}px`);
	}

	getOutPosition(entry: Entries): string
	{
		if (entry.clockOut == null)
			return ('null');

		const clockOutDate = new Date(entry.clockOut);
		let clockOutMins: number;
		let position: number;

		clockOutMins = (clockOutDate.getHours() * 60) + clockOutDate.getMinutes();
		position = this.minuteStep * clockOutMins;

		return (`${position}px`);
	}

	assignEntryHeights()
	{
		let availableHeights: number[] = [];
		let availableHeightsSize: number = this.entries().length;
		let minHeight = 50;
		let heightGap: number = 50;
		let	candidateHeight: number;
		let i: number;
		let obj;
	
		console.log("Calculating line heights...");

		i = 0;
		while (i < availableHeightsSize)
		{
			availableHeights[i] = i * heightGap + minHeight;
			i++;
		}
		console.log(availableHeights.length + " heights generated");

		for (let entry of this.entries())
		{
			// Try to load stored value
			const stored = localStorage.getItem(`lineHeight-${entry.id}`);
			if (stored) 
			{
				const parsed = JSON.parse(stored);
				this.entryHeights.push(
				{
					entry: entry,
					height: parsed.height,
					upDirection: parsed.upDirection
				});
				continue;
			}

			// Generate random height
			i = Math.floor(Math.random() * availableHeightsSize);
			candidateHeight = availableHeights[i];

			while (!this.checkCandidateHeight(candidateHeight))
			{
				i = Math.floor(Math.random() * availableHeightsSize);
				candidateHeight = availableHeights[i];
			}

			// Random direction
			const 	directionSeed = Math.random();
			let		direction: boolean = false;

			if (directionSeed < 0.5)
				direction = true;

			console.log("Entry id: " + entry.id + ", generated height: " + candidateHeight + ", direction up: " + direction);

			obj = { entry: entry, height: candidateHeight, upDirection: direction };
			this.entryHeights.push(obj);
			i++;

			localStorage.setItem(`lineHeight-${entry.id}`, JSON.stringify(obj));
		}
	}

	checkCandidateHeight(candidate: number)
	{
		for (let used of this.usedHeights)
		{
			if (used == candidate)
				return (false);
		}

		this.usedHeights.push(candidate);

		return (true);
	}

	getEntryLineHeight(entry: Entries): string
	{
		for (let heights of this.entryHeights)
		{
			if (heights.entry.id == entry.id)
				return (`${heights.height}px`);
		}
		return ("null");
	}

	getEntryLineDir(entry: Entries): boolean
	{
		for (let heights of this.entryHeights)
		{
			if (heights.entry.id == entry.id)
				return (heights.upDirection);
		}
		return (false);
	}

	checkLastReset()
	{
		// Check last reset date
		const lastReset = localStorage.getItem('lineHeightResetDate');
		const today = new Date().toISOString().slice(0, 10);

		// If it's a new day → clear old values
		if (lastReset !== today)
		{
			localStorage.clear();
			localStorage.setItem('lineHeightResetDate', today);
			this.usedHeights = [];
			console.log("Reset line heights for a new day");
		}
	}

	forceReset()
	{
		this.entryHeights = [];
		this.usedHeights = [];
		localStorage.clear();
	}
}
