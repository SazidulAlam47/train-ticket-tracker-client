import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import TicketProvider from './Providers/ticket.provider.tsx';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router';
import router from './routers/Router.tsx';
import { Notifications } from 'react-push-notification';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <TicketProvider>
            <RouterProvider router={router} />
            <Toaster />
            <Notifications />
        </TicketProvider>
    </StrictMode>,
);
