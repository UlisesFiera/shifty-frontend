import { Entries } from "../../entries/entries";

let timelineWidht: number = 1200;
let minuteStep: number = timelineWidht / 1440;
let	cache = new Map<number, any>();

// Calculation of clock in-out markers positions

export function	getCurrentPosition(): string
{
	const now = new Date();
	const totalMinutes = now.getHours() * 60 + now.getMinutes();
	const fractionOfDay = totalMinutes / 1440;

	return `${fractionOfDay * 100}%`;
}

export function getInPosition(entry: Entries): string
{
	const 	clockInDate = new Date(entry.clockIn);
	let		clockInMins: number;
	let 	position: number;

	clockInMins = (clockInDate.getHours() * 60) + clockInDate.getMinutes();
	position = minuteStep * clockInMins;

	return (`${position}px`);
}

export function getOutPosition(entry: Entries): string
{
	if (entry.clockOut == null)
		return ('null');

	const clockOutDate = new Date(entry.clockOut);
	let clockOutMins: number;
	let position: number;

	clockOutMins = (clockOutDate.getHours() * 60) + clockOutDate.getMinutes();
	position = minuteStep * clockOutMins;

	return (`${position}px`);
}

export function getEntryLineHeight(entry: Entries): string
{
	let cachedValues;

	if (!cache.has(entry.id))
		cache.set(entry.id, {});

	cachedValues = cache.get(entry.id);

	if (!cachedValues.lineHeight)
		cachedValues.lineHeight = calculateEntryLineHeight(entry);

	return (cachedValues.lineHeight);
}

function calculateEntryLineHeight(entry: Entries): string
{
	let randomHeight: number = Math.floor(Math.random() * (170 - 10 + 1)) + 10;

	return (`${randomHeight}px`);
}
