import type { ITicket } from '@/types/ticket.type';
import toast from 'react-hot-toast';
import { FaTrainSubway } from 'react-icons/fa6';

const newTicketToast = (ticket: ITicket) => {
    toast(
        () => (
            <div>
                <div>
                    <strong>New Ticket:</strong> {ticket.from} → {ticket.to}
                </div>
                <div>
                    <strong>Date:</strong>{' '}
                    {ticket.departureDateTime.split(',')[0]}
                </div>
                <div>
                    <strong>Train Name:</strong> {ticket.trainName}
                </div>
                <div>
                    <strong>Seats:</strong> {ticket.seats}
                </div>
            </div>
        ),
        {
            position: 'bottom-right',
            duration: 10000,
            style: {
                width: 'auto',
                maxWidth: 'none',
                padding: '12px 18px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                fontSize: '14px',
            },
            icon: <FaTrainSubway color="#164973" size={20} />,
        },
    );
};

export default newTicketToast;
