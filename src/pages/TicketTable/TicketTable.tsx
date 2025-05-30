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
import { useEffect, useState } from 'react';
import axios from 'axios';
import type { ITicket } from '@/types/ticket.type';

const TicketTable = () => {
    const { scans } = useTicketContext();
    const [ticketsObj, setTicketsObj] = useState<Record<string, ITicket>>({});

    useEffect(() => {
        setTimeout(() => {
            for (const scan of scans) {
                axios
                    .post(`${import.meta.env.VITE_API_URL}/api/v1/tickets`, {
                        from: scan.from,
                        to: scan.to,
                        date: formatDateToStr(scan.date!),
                    })
                    .then((res) => {
                        setTicketsObj((prev) => ({
                            ...prev,
                            [`${scan.from}-${scan.to}-${formatDateToStr(scan.date!)}`]:
                                res.data.data,
                        }));
                    });
            }
        }, 15000);
    }, [scans]);

    const trainTickets = Object.values(ticketsObj).flat();

    return (
        <div className="min-h-[90vh]">
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
