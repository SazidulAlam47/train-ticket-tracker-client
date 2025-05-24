import AutoSuggestionInput from '@/components/shared/AutoSuggestionInput/AutoSuggestionInput';
import MyDatePicker from '@/components/shared/MyDatePicker/MyDatePicker';
import { Label } from '@/components/ui/label';
import { TicketContext } from '@/Providers/ticket.context';
import type { TScan } from '@/types/scan.type';
import { useContext, type SetStateAction } from 'react';

type TStationInputSingleProps = {
    index: number;
    scan: TScan;
};

const StationInputSingle = ({ index, scan }: TStationInputSingleProps) => {
    const { scans, setScans } = useContext(TicketContext);

    const updateField = (
        field: keyof TScan,
        value: SetStateAction<string> | SetStateAction<Date | undefined>,
    ) => {
        const updatedScans = [...scans];
        updatedScans[index] = { ...updatedScans[index], [field]: value };
        setScans(updatedScans);
    };

    return (
        <div className="bg-gray-50 p-6 mb-6 rounded-lg shadow-md border border-gray-300">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Scan {index + 1}
            </h3>

            <Label className="block text-gray-600 mb-2">From:</Label>
            <AutoSuggestionInput
                value={scan.from}
                setValue={(val) => updateField('from', val)}
                placeholder="Type your departure station"
            />
            <Label className="block text-gray-600 mt-4 mb-2">To:</Label>
            <AutoSuggestionInput
                value={scan.to}
                setValue={(val) => updateField('to', val)}
                placeholder="Type your destination station"
            />
            <Label className="block text-gray-600 mt-4 mb-2">Date:</Label>
            <MyDatePicker
                date={scan.date}
                setDate={(date) => updateField('date', date)}
            />
        </div>
    );
};

export default StationInputSingle;
