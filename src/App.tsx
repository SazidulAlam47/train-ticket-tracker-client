import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [tickets, setTickets] = useState({});

    useEffect(() => {
        const payload = {
            from: 'Dhaka',
            to: 'Sylhet',
            date: '2025-05-30',
        };
        axios
            .post(
                'https://train-ticket-tracker-server.onrender.com/api/v1/tickets',
                payload,
            )
            .then((res) => setTickets(res.data));
    }, []);

    console.log(tickets);

    return (
        <div>
            <p>This is App</p>
        </div>
    );
};

export default App;
