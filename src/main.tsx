import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import TicketProvider from './Providers/ticket.provider.tsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TicketProvider>
            <App />
            <Toaster />
        </TicketProvider>
    </StrictMode>,
);
