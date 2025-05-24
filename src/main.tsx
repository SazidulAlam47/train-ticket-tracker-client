import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import TicketProvider from './Providers/ticket.provider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TicketProvider>
            <App />
        </TicketProvider>
    </StrictMode>,
);
