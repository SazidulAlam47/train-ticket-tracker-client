import MyAutosuggestInput from '@/components/shared/MyAutosuggestInput';
import MyDatePicker from '@/components/shared/MyDatePicker';
import { Label } from '@/components/ui/label';
import useTicketContext from '@/hooks/useTicketContext';
import type { TScan } from '@/types/scan.type';
import { type SetStateAction } from 'react';

type TStationInputSingleProps = {
    index: number;
    scan: TScan;
};

const StationInputSingle = ({ index, scan }: TStationInputSingleProps) => {
    const { scans, setScans } = useTicketContext();

    const updateField = (
        field: keyof TScan,
        value: SetStateAction<string> | SetStateAction<Date | undefined>,
    ) => {
        const updatedScans = [...scans];
        updatedScans[index] = { ...updatedScans[index], [field]: value };
        setScans(updatedScans);
    };

    return (
        <div className="bg-gray-50 p-3.5 md:p-6 rounded-lg shadow-md border border-gray-300">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Scan {index + 1}
            </h3>

            <Label className="block text-gray-600 mb-2">From:</Label>
            <MyAutosuggestInput
                value={scan.from}
                setValue={(val) => updateField('from', val)}
                placeholder="Enter your departure station"
            />
            <Label className="block text-gray-600 mt-4 mb-2">To:</Label>
            <MyAutosuggestInput
                value={scan.to}
                setValue={(val) => updateField('to', val)}
                placeholder="Enter your destination station"
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
