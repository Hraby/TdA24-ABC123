"use client"
import React from 'react';
import "./dashboard.css";
import Stats from "@/components/stats/stats";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Button} from "@/components/ui/button";
import createEvent from "ical-generator";
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';

function icalDate(rawDate: any, timeSlot: any){
	const date = new Date(rawDate);
	const [startTime, endTime] = timeSlot.split(" - ");
	const day = date.getDate().toString().padStart(2, '0'); 
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear();
	const startDate = new Date(`${year}-${month}-${day}T${startTime}`);
	const endDate = new Date(`${year}-${month}-${day}T${endTime}`);
	return [startDate, endDate];
}


export default function Dashboard({data, lecturer}: {data: any, lecturer: any}){
	const filteredReservations = data.filter((reservation: any) => {
		return reservation.lecturer_uuid === lecturer.uuid;
	});
	const reservationsCount = filteredReservations.length;

	const beReservations = data.filter((reservation: any) => {
		return new Date(reservation.date) < new Date() && reservation.lecturer_uuid === lecturer.uuid;
	});
	
	const upReservations = data.filter((reservation: any) => {
		return new Date(reservation.date) >= new Date() && reservation.lecturer_uuid === lecturer.uuid;
	});

	const timeslotCounts: { [key: string]: number } = {};

	filteredReservations.forEach((reservation: any) => {
		const timeslot = reservation.timeSlot;
		timeslotCounts[timeslot] = (timeslotCounts[timeslot] || 0) + 1;
	});

	let mostFrequentTimeslot = "";
	let maxCount = 0;
	for (const timeslot in timeslotCounts) {
		if (timeslotCounts[timeslot] > maxCount) {
			maxCount = timeslotCounts[timeslot];
			mostFrequentTimeslot = timeslot;
		}
	}
	
	function formatDate(rawDate: any){
		const date = new Date(rawDate);
		const day = date.getDate().toString().padStart(2, '0'); 
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		const formattedDate = `${day}.${month}.${year}`;
		return formattedDate;
	}

	async function exportToIcal(reservation: any[]){
		const cal = createEvent();

		upReservations.forEach((reservation: any) => {
			const [startDate, endDate] = icalDate(reservation.date, reservation.timeSlot);

			cal.createEvent({
				start: startDate,
				end: endDate,
				summary: `Rezervace - ${reservation.first_name} ${reservation.last_name}`,
				description: reservation.message,
				location: reservation.form,
				organizer: {
					name: `${reservation.first_name} ${reservation.last_name}`,
					email: reservation.email
				}

			});
		});

		const calContent = cal.toString();
		const blob = new Blob([calContent], { type: 'text/calendar' });
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', 'reservations.ics');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
	}

	return (
		<div className="dashboard">
			<div className="flex flex-row justify-between items-center">
				<h1>Lektorská zóna - {lecturer.first_name} {lecturer.last_name}</h1>
			</div>
			<div className="w-full flex gap-20">
				<Stats icon="/people.png" name="Nadcházející počet studentů" data={upReservations == 0 ? "Nikdo :(" : upReservations} time={false}/>
				<Stats icon="/clock.png" name="Nejoblíbenější časy" data={mostFrequentTimeslot} time={false}/>
			</div>
			<section className="w-full pb-8" >
				<div className='flex justify-between items-center'>
					<h1 className='text-lg font-medium'>Naplánované hodiny</h1>
						<input type="hidden" name="reservations" value={JSON.stringify(upReservations)} />
						<Button
							className='px-2 py-1 bg-cyan-800 hover:bg-cyan-900 text-white rounded-lg flex items-center space-x-2 text-sm'
							type='submit'
							onClick={() => exportToIcal(upReservations)}
							disabled={upReservations.length === 0}
						>
							<svg
								className=' w-4 h-4'
								fill='none'
								height='24'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								viewBox='0 0 24 24'
								width='24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
								<polyline points='7 10 12 15 17 10' />
								<line x1='12' x2='12' y1='15' y2='3' />
							</svg>
							<span>Exportovat (.ics)</span>
						</Button>
				</div>
				{upReservations.length === 0 ? <p>Nebyly nalezeny žádné záznamy</p> : (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Jméno a Přijmení</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Zpráva</TableHead>
							<TableHead>Forma</TableHead>
							<TableHead>Datum</TableHead>
							<TableHead>Čas</TableHead>
							<TableHead className="text-right"/>
						</TableRow>
					</TableHeader>
					<TableBody>
					{upReservations.map((reservation: any, index:number) =>(
						<TableRow key={index}>
								<TableCell>{reservation.first_name} {reservation.last_name}</TableCell>
								<TableCell>{reservation.email}</TableCell>
								<TableCell>{reservation.message}</TableCell>
								<TableCell>{reservation.form == "online" ? "Online" : "Prezenčně"}</TableCell>
								<TableCell>{formatDate(reservation.date)}</TableCell>
								<TableCell>{reservation.timeSlot}</TableCell>
						</TableRow>
					))}
					</TableBody>
				</Table>
				)}
			</section>
			<section className="w-full pb-8" >
				<div className='flex justify-between items-center'>
					<h1 className='text-lg font-medium'>Uplynulé hodiny</h1>
				</div>
				{beReservations.length === 0 ? <p>Nebyly nalezeny žádné záznamy</p> : (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Jméno a Přijmení</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Zpráva</TableHead>
							<TableHead>Forma</TableHead>
							<TableHead>Datum</TableHead>
							<TableHead>Čas</TableHead>
							<TableHead className="text-right"/>
						</TableRow>
					</TableHeader>
					<TableBody>
					{beReservations.map((reservation: any, index:number) =>(
						<TableRow key={index}>
								<TableCell>{reservation.first_name} {reservation.last_name}</TableCell>
								<TableCell>{reservation.email}</TableCell>
								<TableCell>{reservation.message}</TableCell>
								<TableCell>{reservation.form == "online" ? "Online" : "Prezenčně"}</TableCell>
								<TableCell>{formatDate(reservation.date)}</TableCell>
								<TableCell>{reservation.timeSlot}</TableCell>
						</TableRow>
					))}
					</TableBody>
				</Table>
				)}
			</section>
		</div>
	)
}
