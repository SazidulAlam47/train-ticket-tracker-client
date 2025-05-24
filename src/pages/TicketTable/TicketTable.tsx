import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import useTicketContext from '@/hooks/useTicketContext';
import { HiMiniSpeakerWave } from 'react-icons/hi2';
import { IoStopCircle } from 'react-icons/io5';
import { BsFillTrashFill } from 'react-icons/bs';
import moment from 'moment-timezone';
import formatDateToStr from '@/utils/formatDateToStr';

const trainTickets = [
    {
        trainName: 'JAYENTIKA EXPRESS (717)',
        departureDateTime: '25 May, 11:15 am',
        arrivalDateTime: '25 May, 07:00 pm',
        travelTime: '07h 45m',
        from: 'Dhaka',
        to: 'Sylhet',
        class: 'AC_S',
        fare: 750,
        seats: 2,
        now: '2025-05-24T19:02:16.328Z',
        link: 'https://eticket.railway.gov.bd/booking/train/search?fromcity=Dhaka&tocity=Sylhet&doj=25-May-2025&class=AC_S',
    },
    {
        trainName: 'JAYENTIKA EXPRESS (717)',
        departureDateTime: '25 May, 11:15 am',
        arrivalDateTime: '25 May, 07:00 pm',
        travelTime: '07h 45m',
        from: 'Dhaka',
        to: 'Sylhet',
        class: 'S_CHAIR',
        fare: 375,
        seats: 1,
        now: '2025-05-24T19:02:16.328Z',
        link: 'https://eticket.railway.gov.bd/booking/train/search?fromcity=Dhaka&tocity=Sylhet&doj=25-May-2025&class=S_CHAIR',
    },
    {
        trainName: 'JAYENTIKA EXPRESS (717)',
        departureDateTime: '25 May, 11:15 am',
        arrivalDateTime: '25 May, 07:00 pm',
        travelTime: '07h 45m',
        from: 'Dhaka',
        to: 'Sylhet',
        class: 'SNIGDHA',
        fare: 625,
        seats: 9,
        now: '2025-05-24T19:02:16.328Z',
        link: 'https://eticket.railway.gov.bd/booking/train/search?fromcity=Dhaka&tocity=Sylhet&doj=25-May-2025&class=SNIGDHA',
    },
];

const TicketTable = () => {
    const { scans } = useTicketContext();

    const date = scans[0].date!;
    const formatted = formatDateToStr(date);
    console.log({ date, formatted });

    return (
        <div>
            <h1 className="text-center text-2xl font-extrabold text-[#305c85] mb-6">
                Train Ticket Tracker
            </h1>
            <div className="flex gap-4 mb-6 justify-center">
                <Button className="bg-[#df3c4f] hover:bg-red-700 cursor-pointer">
                    <IoStopCircle />
                    Stop Scanning
                </Button>

                <Button className=" bg-[#2f6493] hover:bg-[#314c63] cursor-pointer">
                    <HiMiniSpeakerWave />
                    Test Audio
                </Button>
                <Button className="bg-[#22864f] hover:bg-green-800 cursor-pointer">
                    <BsFillTrashFill /> Clear Unavailable
                </Button>
            </div>
            <div className="bg-white p-4 rounded-2xl">
                <Table>
                    <TableHeader>
                        <TableRow className="text-base">
                            <TableHead>From</TableHead>
                            <TableHead>To</TableHead>
                            <TableHead>Journey Date</TableHead>
                            <TableHead>Train</TableHead>
                            <TableHead>Class</TableHead>
                            <TableHead>Seats</TableHead>
                            <TableHead>Fare</TableHead>
                            <TableHead>Was Available at</TableHead>
                            <TableHead>Purchase</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trainTickets.map((ticket, index) => (
                            <TableRow key={index}>
                                <TableCell>{ticket.from}</TableCell>
                                <TableCell>{ticket.to}</TableCell>
                                <TableCell>
                                    {ticket.departureDateTime}
                                </TableCell>
                                <TableCell>{ticket.trainName}</TableCell>
                                <TableCell>{ticket.class}</TableCell>
                                <TableCell>{ticket.seats}</TableCell>
                                <TableCell>{ticket.fare}</TableCell>
                                <TableCell>
                                    {moment(ticket.now).format('h:mm:ss a')}
                                </TableCell>
                                <TableCell>
                                    <a href={ticket.link} target="_blank">
                                        <Button
                                            size="sm"
                                            className="cursor-pointer bg-[#22864f] hover:bg-green-800"
                                        >
                                            Purchase
                                        </Button>
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TicketTable;
