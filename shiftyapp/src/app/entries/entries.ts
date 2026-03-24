import { Employee } from "../employee/employee";

export interface Entries 
{
	id: number;
	employee: Employee;
	clockIn: Date;
	clockOut: Date
	shiftDuration: number;
}

export interface GetAllEntriesInRangeRequest
{
	empId?: number;
	startDate: Date;
	endDate: Date;
}