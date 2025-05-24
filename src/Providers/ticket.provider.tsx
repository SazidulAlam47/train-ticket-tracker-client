import type { ReactNode } from 'react';
import { useState } from 'react';
import type { TScan } from '@/types/scan.type';
import { TicketContext } from './ticket.context';

const TicketProvider = ({ children }: { children: ReactNode }) => {
    const [scans, setScans] = useState<TScan[]>([]);
    const [inputCount, setInputCount] = useState(0);
    const [showTable, setShowTable] = useState(false);

    const value = {
        scans,
        setScans,
        inputCount,
        setInputCount,
        showTable,
        setShowTable,
    };

    return (
        <TicketContext.Provider value={value}>
            {children}
        </TicketContext.Provider>
    );
};

export default TicketProvider;
