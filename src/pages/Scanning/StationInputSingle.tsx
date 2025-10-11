import MyAutosuggestInput from '@/components/shared/MyAutosuggestInput';
import MyDatePicker from '@/components/shared/MyDatePicker';
import { Label } from '@/components/ui/label';
import useTicketContext from '@/hooks/useTicketContext';
import type { TScan } from '@/types/scan.type';
import { type SetStateAction } from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

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
        <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl border border-blue-200 shadow-md hover:shadow-lg transition-all duration-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Scan {index + 1}
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-green-500" />
                        <Label className="text-gray-700 font-medium">
                            From
                        </Label>
                    </div>
                    <MyAutosuggestInput
                        value={scan.from}
                        setValue={(val) => updateField('from', val)}
                        placeholder="Select departure station"
                    />
                </div>

                <div className="space-y-2 relative">
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" />
                        <Label className="text-gray-700 font-medium">To</Label>
                    </div>
                    <MyAutosuggestInput
                        value={scan.to}
                        setValue={(val) => updateField('to', val)}
                        placeholder="Select destination station"
                    />
                    <div className="hidden md:block absolute top-8 -left-5 text-blue-500">
                        <FaArrowRight className="text-xl" />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-500" />
                        <Label className="text-gray-700 font-medium">
                            Journey Date
                        </Label>
                    </div>
                    <MyDatePicker
                        date={scan.date}
                        setDate={(date) => updateField('date', date)}
                    />
                </div>
            </div>
        </div>
    );
};

export default StationInputSingle;
