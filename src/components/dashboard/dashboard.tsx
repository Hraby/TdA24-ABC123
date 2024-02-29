import "./dashboard.css";
import Stats from "@/components/stats/stats";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function Dashboard(){
    return (
        <div className="dashboard">
            <h1>Lektorská zóna</h1>
            <div className="w-full flex justify-between">
                <Stats icon="/people.png" name="Počet studentů" data="5" time={true}/>
                <Stats icon="/clock.png" name="Nejoblíbenější časy" data="8-11" time={true}/>
                <Stats icon="/star.png" name="Hodnocení" data="100%" time={false}/>
            </div>
            <section className="w-full pb-8" >
                <div className='flex justify-between items-center'>
					<h1 className='text-lg font-medium'>Rezervace</h1>
					<Button
						className='px-2 py-1 bg-cyan-800 hover:bg-cyan-900 text-white rounded-lg flex items-center space-x-2 text-sm'
						type='button'
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
						<span>Exportovat</span>
					</Button>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Jméno a Přijmení</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Tagy</TableHead>
                            <TableHead>Forma</TableHead>
                            <TableHead>Datum</TableHead>
                            <TableHead>Čas</TableHead>
							<TableHead className="text-right"/>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Test Test</TableCell>
							<TableCell>test@email.cz</TableCell>
							<TableCell>
								<span className='px-2 py-1 bg-red-200 text-red-800 rounded-md'>
									<svg
										className=' w-4 h-4 inline-block mr-1'
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
										<path d='M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z' />
										<path d='M7 7h.01' />
									</svg>
									Office
								</span>
							</TableCell>
                            <TableCell>Prezenčně</TableCell>
                            <TableCell>01.03.2024</TableCell>
                            <TableCell>15:00 - 16:00</TableCell>
							<TableCell className="text-right">
								<Popover>
									<PopoverTrigger>
										<Button
											className='px-2 py-1 bg-transparent text-black hover:bg-gray-200 active:bg-gray-300 rounded'
											type='button'
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
												<circle cx='12' cy='12' r='1' />
												<circle cx='12' cy='5' r='1' />
												<circle cx='12' cy='19' r='1' />
											</svg>
										</Button>
									</PopoverTrigger>
									<PopoverContent className='w-40'>
										<button className='w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500'>
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
												<path d='M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5' />
												<polyline points='14 2 14 8 20 8' />
												<path d='M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z' />
											</svg>
											<span className='text-sm font-medium'>Edit</span>
										</button>
										<button className='w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500'>
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
												<path d='M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8' />
												<polyline points='16 6 12 2 8 6' />
												<line x1='12' x2='12' y1='2' y2='15' />
											</svg>
											<span className='text-sm font-medium'>Share</span>
										</button>
										<button className='w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500'>
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
												<path d='M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z' />
												<line x1='18' x2='12' y1='9' y2='15' />
												<line x1='12' x2='18' y1='9' y2='15' />
											</svg>
											<span className='text-sm font-medium'>Delete</span>
										</button>
									</PopoverContent>
								</Popover>
							</TableCell>
						</TableRow>
                    </TableBody>
                </Table>
		    </section>
        </div>
    )
}