import type { ITicket } from '@/types/ticket.type';
import toast from 'react-hot-toast';
import { FaTrainSubway } from 'react-icons/fa6';
import addNotification from 'react-push-notification';

const newTicketToast = (ticket: ITicket) => {
    toast(
        (t) => (
            <div className="relative">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="absolute -top-[12px] -right-[18px] text-gray-500 hover:text-gray-700 text-sm cursor-pointer"
                >
                    ✖
                </button>
                <p>
                    <strong>New Ticket:</strong> {ticket.from} → {ticket.to}
                </p>
                <p>
                    <strong>Date:</strong>{' '}
                    {ticket.departureDateTime.split(',')[0]}
                </p>
                <p>
                    <strong>Train Name:</strong> {ticket.trainName}
                </p>
                <p>
                    <strong>Seats:</strong> {ticket.seats}
                </p>
            </div>
        ),
        {
            position: 'bottom-right',
            duration: 8000,
            style: {
                width: 'auto',
                maxWidth: 'none',
                padding: '12px 18px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontSize: '14px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #ddd',
            },
            icon: <FaTrainSubway color="#164973" size={20} />,
        },
    );

    addNotification({
        title: 'New Train Ticket Found!',
        message: `${ticket.from} → ${ticket.to}\n${ticket.trainName}\nDate: ${ticket.departureDateTime.split(',')[0]}\n${ticket.seats} seats available`,
        theme: 'darkblue',
        duration: 10000,
        native: true,
        icon: '/favicon.ico',
        vibrate: [200, 100, 200],
        onClick: () => {
            window.open(ticket.link, '_blank');
        },
    });
};

export default newTicketToast;
