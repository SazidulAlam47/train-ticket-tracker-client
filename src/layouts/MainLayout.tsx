import bgImage from '@/assets/page-bg.svg';
import Container from '@/components/shared/Container';
import axios from 'axios';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

const MainLayout = () => {
    // send a request to active the backend
    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL);
    }, []);

    return (
        <main className="flex justify-center items-center min-h-[100dvh]">
            <Container className="py-3">
                <img
                    src={bgImage}
                    alt="Train"
                    className="fixed bottom-0 right-0 w-4xl -z-10 opacity-90"
                />
                <div className="fixed bottom-0 top-0 right-0 left-0 -z-20 bg-[#e4eae8]" />
                <Outlet />
            </Container>
        </main>
    );
};

export default MainLayout;
