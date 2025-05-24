import { TicketContext } from '@/Providers/ticket.context';
import { useContext } from 'react';

const useTicketContext = () => {
    return useContext(TicketContext);
};

export default useTicketContext;
