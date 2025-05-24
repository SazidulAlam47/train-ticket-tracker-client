import AutoSuggestionInput from '@/components/shared/AutoSuggestionInput/AutoSuggestionInput';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const StationInputSingle = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');

    return (
        <div className="bg-gray-50 p-6 mb-6 rounded-lg shadow-md border border-gray-300">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Scan 1</h3>

            <Label className="block text-gray-600 mb-2">From:</Label>
            <AutoSuggestionInput
                value={from}
                setValue={setFrom}
                placeholder="Type your departure station"
            />
            <Label className="block text-gray-600 mt-4 mb-2">To:</Label>
            <AutoSuggestionInput
                value={to}
                setValue={setTo}
                placeholder="Type your destination station"
            />
            <Label className="block text-gray-600 mt-4 mb-2">Date:</Label>
            <input
                type="date"
                value={date}
                min={new Intl.DateTimeFormat('en-CA', {
                    timeZone: 'Asia/Dhaka',
                }).format(new Date())} // Today's date in Dhaka time
                max={new Intl.DateTimeFormat('en-CA', {
                    timeZone: 'Asia/Dhaka',
                }).format(new Date(Date.now() + 10 * 24 * 60 * 60 * 1000))} // Today + 10 days in Dhaka time
                onClick={(e) => (e.target as HTMLInputElement).showPicker()}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-2 py-1.5 border bg-white border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-[#007bff] cursor-pointer"
            />
        </div>
    );
};

export default StationInputSingle;
