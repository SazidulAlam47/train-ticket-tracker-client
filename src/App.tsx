import { useState } from 'react';
import Container from './components/shared/Container';
import TicketTable from './pages/TicketTable/TicketTable';
import bgImage from '@/assets/page-bg.svg';
import Scanning from './pages/Scanning/Scanning';

const App = () => {
    const [showTable, setShowTable] = useState(false);
    return (
        <main className="flex justify-center items-center min-h-screen p-5">
            <Container>
                <img
                    src={bgImage}
                    alt=""
                    className="fixed bottom-0 right-0 w-4xl -z-10 opacity-90"
                />
                <div className="fixed bottom-0 top-0 right-0 left-0 -z-20 bg-[#e4eae8]" />
                {showTable ? (
                    <TicketTable />
                ) : (
                    <Scanning setShowTable={setShowTable} />
                )}
            </Container>
        </main>
    );
};

export default App;
