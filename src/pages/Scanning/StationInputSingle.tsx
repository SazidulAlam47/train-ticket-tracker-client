import AutoSuggestionInput from '@/components/shared/AutoSuggestionInput/AutoSuggestionInput';
import MyDatePicker from '@/components/shared/MyDatePicker/MyDatePicker';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

const StationInputSingle = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState<Date>();

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
            <MyDatePicker date={date} setDate={setDate} />
        </div>
    );
};

export default StationInputSingle;
