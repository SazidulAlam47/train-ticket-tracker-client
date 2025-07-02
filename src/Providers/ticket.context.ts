import type { TScan } from '@/types/scan.type';
import { createContext, type Dispatch, type SetStateAction } from 'react';

export type TicketContextType = {
    scans: TScan[];
    setScans: Dispatch<SetStateAction<TScan[]>>;
    inputCount: number;
    setInputCount: Dispatch<SetStateAction<number>>;
};

export const TicketContext = createContext<TicketContextType>({
    scans: [],
    setScans: () => {},
    inputCount: 0,
    setInputCount: () => {},
});
