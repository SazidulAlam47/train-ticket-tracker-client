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
import { MdNotifications, MdNotificationsActive } from 'react-icons/md';
import moment from 'moment-timezone';
import formatDateToStr from '@/utils/formatDateToStr';
import { useEffect, useRef, useState } from 'react';
import { isAxiosError } from 'axios';
import type { ITicket } from '@/types/ticket.type';
import { ImSpinner9 } from 'react-icons/im';
import audio from '@/assets/audio/notification.mp3';
import toast from 'react-hot-toast';
import newTicketToast from '@/utils/newTicketToast';
import { Link, useNavigate } from 'react-router';
import axiosInstance from '@/helpers/axiosInstance';
import addNotification from 'react-push-notification';

const TicketTable = () => {
    const { scans } = useTicketContext();
    const [ticketsObj, setTicketsObj] = useState<Record<string, ITicket[]>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [notificationsEnabled, setNotificationsEnabled] = useState(
        Notification.permission === 'granted',
    );
    const notificationAudio = useRef(new Audio(audio));
    const navigate = useNavigate();

    useEffect(() => {
        if (!scans.length) {
            navigate('/');
        }
    }, [scans, navigate]);

    useEffect(() => {
        const fetchAllTickets = async () => {
            await Promise.all(
                scans.map(async (scan) => {
                    const formatDate = formatDateToStr(scan.date!);
                    const key = `${scan.from}-${scan.to}-${formatDate}`;

                    try {
                        const res = await axiosInstance.post('/tickets', {
                            from: scan.from,
                            to: scan.to,
                            date: formatDate,
                        });

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

                        navigate('/');
                    }
                }),
            );

            setIsLoading(false);
        };

        const timer = setInterval(fetchAllTickets, 30000);

        return () => clearInterval(timer);
    }, [scans, ticketsObj, isLoading, navigate]);

    const ticketsArray: ITicket[] = Object.values(ticketsObj).flat();

    const handleStop = () => {
        navigate('/');
    };

    const handleTestNotificationAudio = () => {
        notificationAudio.current.play();
        if (notificationsEnabled) {
            addNotification({
                title: 'Test Notification',
                message:
                    'This is a test notification from Train Ticket Tracker',
                theme: 'darkblue',
                duration: 8000,
                native: true,
                icon: '/favicon.ico',
                vibrate: [200, 100, 200],
                onClick: () => {
                    window.focus();
                },
            });
        }
    };

    const handleEnableNotification = async () => {
        if (!('Notification' in window)) {
            toast.error('This browser does not support notifications');
            return;
        }

        if (Notification.permission === 'denied') {
            toast.error(
                'Notifications are blocked. Please enable them in your browser settings.',
            );
            return;
        }

        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                setNotificationsEnabled(true);
                toast.success('Push notifications enabled!');
            } else if (permission === 'denied') {
                toast.error(
                    'Push notification permission denied. Please enable notifications in your browser settings.',
                );
            } else {
                toast.error('Push notification permission not granted');
            }
        } catch (error) {
            console.error('Notification permission error:', error);
            toast.error('Failed to request notification permission');
        }
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
                    onClick={handleTestNotificationAudio}
                >
                    {notificationsEnabled ? (
                        <>
                            <MdNotificationsActive />
                            Test Notification and Audio
                        </>
                    ) : (
                        <>
                            <HiMiniSpeakerWave />
                            Test Audio
                        </>
                    )}
                </Button>

                {!notificationsEnabled && (
                    <Button
                        className="bg-[#892bb1] hover:bg-[#722294] cursor-pointer"
                        onClick={handleEnableNotification}
                    >
                        <MdNotifications />
                        Enable Notification
                    </Button>
                )}

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
                                            <Link
                                                to={ticket.link}
                                                target="_blank"
                                            >
                                                <Button
                                                    size="sm"
                                                    className="cursor-pointer bg-[#22864f] hover:bg-green-800"
                                                >
                                                    Purchase
                                                </Button>
                                            </Link>
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
