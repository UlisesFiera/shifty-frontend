export interface Employee 
{
	id: number;
	name: string;
	email: string;
	jobTitle: string;
	phone: string;
	imageUrl: string;
	employeeCode: string;
	lastClockIn: string;
	lastClockOut: string;
	activeEntryId: number;
	lastBreakIn: string;
	lastBreakOut: string;
	onBreak: boolean;

	trailWidth?: string;
	elapsedTxt?: string;
}
