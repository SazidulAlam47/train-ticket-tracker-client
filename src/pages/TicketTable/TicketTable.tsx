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
import { BsFillTrashFill, BsInfoCircleFill } from 'react-icons/bs';
import moment from 'moment-timezone';
import formatDateToStr from '@/utils/formatDateToStr';
import { useEffect, useRef, useState } from 'react';
import axios, { isAxiosError } from 'axios';
import type { ITicket } from '@/types/ticket.type';
import { ImSpinner9 } from 'react-icons/im';
import audio from '@/assets/audio/notification.mp3';
import toast from 'react-hot-toast';
import newTicketToast from '@/utils/newTicketToast';

const TicketTable = () => {
    const { scans, setInputCount, setShowTable } = useTicketContext();
    const [ticketsObj, setTicketsObj] = useState<Record<string, ITicket[]>>({});
    const [isLoading, setIsLoading] = useState(true);
    const notificationAudio = useRef(new Audio(audio));

    useEffect(() => {
        const fetchAllTickets = async () => {
            await Promise.all(
                scans.map(async (scan) => {
                    const formatDate = formatDateToStr(scan.date!);
                    const key = `${scan.from}-${scan.to}-${formatDate}`;

                    try {
                        const res = await axios.post(
                            `${import.meta.env.VITE_API_URL}/api/v1/tickets`,
                            {
                                from: scan.from,
                                to: scan.to,
                                date: formatDate,
                            },
                        );

                        const newTickets = res.data.data as ITicket[];
                        const oldTickets = ticketsObj[key] || [];

                        newTickets.forEach((newTicket) => {
                            const matchOldTicket = oldTickets.find(
                                (oldTicket) =>
                                    oldTicket.trainName ===
                                        newTicket.trainName &&
                                    oldTicket.class === newTicket.class,
                            );

                            if (
                                matchOldTicket &&
                                newTicket.seats > matchOldTicket.seats
                            ) {
                                if (!isLoading) {
                                    notificationAudio.current.play();
                                    newTicketToast(newTicket);
                                }
                            }
                            if (!matchOldTicket) {
                                oldTickets.push(newTicket);
                                if (!isLoading) {
                                    notificationAudio.current.play();
                                    newTicketToast(newTicket);
                                }
                            }
                        });

                        oldTickets.forEach((oldTicket) => {
                            const newTicketMatch = newTickets.find(
                                (newTicket) =>
                                    oldTicket.trainName ===
                                        newTicket.trainName &&
                                    oldTicket.class === newTicket.class,
                            );

                            if (newTicketMatch) {
                                oldTicket.seats = newTicketMatch.seats;
                                oldTicket.now = newTicketMatch.now;
                            } else {
                                oldTicket.seats = 0;
                            }
                        });

                        setTicketsObj((prev) => ({
                            ...prev,
                            [key]: oldTickets,
                        }));
                    } catch (error) {
                        if (isAxiosError(error) && error.response) {
                            toast.error(error.response.data.message, {
                                duration: 7000,
                                style: {
                                    maxWidth: 'none',
                                    width: 'auto',
                                },
                            });
                        } else {
                            toast.error('An unexpected error occurred.');
                        }

                        setInputCount(0);
                        setShowTable(false);
                    }
                }),
            );

            setIsLoading(false);
        };

        const timer = setInterval(fetchAllTickets, 15000);

        return () => clearInterval(timer);
    }, [scans, ticketsObj, isLoading, setInputCount, setShowTable]);

    const ticketsArray: ITicket[] = Object.values(ticketsObj).flat();

    const handleStop = () => {
        setInputCount(0);
        setShowTable(false);
    };

    const handleTestAudio = () => {
        notificationAudio.current.play();
    };

    const handelClear = () => {
        const filteredTicketsObj: Record<string, ITicket[]> = {};

        const findUnavailable = ticketsArray.find((t) => t.seats === 0);
        if (!findUnavailable) {
            toast('No unavailable tickets found', {
                icon: <BsInfoCircleFill size={18} className="text-[#3498db]" />,
            });
            return;
        }

        Object.entries(ticketsObj).forEach(([key, tickets]) => {
            const availableTickets = tickets.filter((ticket) => ticket.seats);
            filteredTicketsObj[key] = availableTickets;
        });

        toast.success('Unavailable tickets removed');
        setTicketsObj(filteredTicketsObj);
    };

    return (
        <div className="min-h-[90dvh]">
            <h1 className="text-center text-2xl font-extrabold text-[#305c85] mb-6">
                Train Ticket Tracker
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
                <Button
                    className="bg-[#df3c4f] hover:bg-red-700 cursor-pointer"
                    onClick={handleStop}
                >
                    <IoStopCircle />
                    Stop Scanning
                </Button>

                <Button
                    className=" bg-[#2f6493] hover:bg-[#314c63] cursor-pointer"
                    onClick={handleTestAudio}
                >
                    <HiMiniSpeakerWave />
                    Test Audio
                </Button>
                <Button
                    className="bg-[#22864f] hover:bg-green-800 cursor-pointer"
                    onClick={handelClear}
                >
                    <BsFillTrashFill /> Clear Unavailable
                </Button>
            </div>

            {isLoading ? (
                <p className="bg-white  mt-14 py-3 px-4 rounded-2xl w-fit mx-auto flex items-center gap-3">
                    <ImSpinner9 className="animate-spin" /> Scanning for
                    tickets, please wait...
                </p>
            ) : ticketsArray.length ? (
                <div className="bg-white px-4 py-3 rounded-2xl">
                    <Table>
                        <TableHeader>
                            <TableRow className="text-base">
                                <TableHead>From</TableHead>
                                <TableHead>To</TableHead>
                                <TableHead>Journey Date</TableHead>
                                <TableHead>Train Name</TableHead>
                                <TableHead>Class</TableHead>
                                <TableHead>Seats</TableHead>
                                <TableHead>Fare</TableHead>
                                <TableHead>Was available at</TableHead>
                                <TableHead className="w-[1%]">
                                    Purchase
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ticketsArray.map((ticket, index) => (
                                <TableRow key={index} className="h-11">
                                    <TableCell>{ticket.from}</TableCell>
                                    <TableCell>{ticket.to}</TableCell>
                                    <TableCell>
                                        {ticket.departureDateTime}
                                    </TableCell>
                                    <TableCell>{ticket.trainName}</TableCell>
                                    <TableCell>{ticket.class}</TableCell>
                                    <TableCell>{ticket.seats}</TableCell>
                                    <TableCell>৳ {ticket.fare}</TableCell>
                                    <TableCell>
                                        {moment(ticket.now).format('h:mm:ss a')}
                                    </TableCell>
                                    <TableCell className="w-[1%]">
                                        {ticket.seats ? (
                                            <a
                                                href={ticket.link}
                                                target="_blank"
                                            >
                                                <Button
                                                    size="sm"
                                                    className="cursor-pointer bg-[#22864f] hover:bg-green-800"
                                                >
                                                    Purchase
                                                </Button>
                                            </a>
                                        ) : (
                                            ''
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <p className="bg-white  mt-14 py-3 px-4 rounded-2xl w-fit mx-auto text-center">
                    Tickets are currently not available. They will be displayed
                    here once they become available.
                </p>
            )}
        </div>
    );
};

export default TicketTable;
