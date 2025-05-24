import type { ReactNode } from 'react';
import { useState } from 'react';
import type { TScan } from '@/types/scan.type';
import { TicketContext } from './ticket.context';

const TicketProvider = ({ children }: { children: ReactNode }) => {
    const [scans, setScans] = useState<TScan[]>([]);

    const value = {
        scans,
        setScans,
    };

    return (
        <TicketContext.Provider value={value}>
            {children}
        </TicketContext.Provider>
    );
};

export default TicketProvider;
