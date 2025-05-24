import {
    useContext,
    useEffect,
    type Dispatch,
    type SetStateAction,
} from 'react';
import StationInputSingle from './StationInputSingle';
import Heading from '@/components/shared/Heading';
import { Button } from '@/components/ui/button';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { TicketContext } from '@/Providers/ticket.context';
import toast from 'react-hot-toast';

type TStationInputProps = {
    setShowTable: Dispatch<SetStateAction<boolean>>;
    inputCount: number;
    setInputCount: Dispatch<SetStateAction<number>>;
};

const StationInput = ({
    setShowTable,
    inputCount,
    setInputCount,
}: TStationInputProps) => {
    const { scans, setScans } = useContext(TicketContext);

    useEffect(() => {
        setScans(
            Array.from({ length: inputCount }, () => ({
                from: '',
                to: '',
                date: undefined,
            })),
        );
    }, [inputCount, setScans]);

    const handleScan = () => {
        let error = false;

        for (const scan of scans) {
            if (!scan.from) {
                toast.error('Please enter you departure station');
                error = true;
                break;
            }
            if (!scan.to) {
                toast.error('Please enter you destination station');
                error = true;
                break;
            }
            if (!scan.date) {
                toast.error('Please enter you journey date');
                error = true;
                break;
            }
        }

        if (!error) {
            setShowTable(true);
        }
    };

    return (
        <div className="bg-white p-4 rounded-2xl max-w-3xl mx-auto">
            <Heading />
            <Button
                variant="secondary"
                className="mb-4 cursor-pointer"
                size="sm"
                onClick={() => setInputCount(0)}
            >
                <IoMdArrowRoundBack />
                Go Back
            </Button>
            {scans.length &&
                scans.map((scan, index) => (
                    <StationInputSingle key={index} index={index} scan={scan} />
                ))}
            <Button
                type="submit"
                size="lg"
                className="w-full text-base cursor-pointer bg-blue-500 hover:bg-blue-600"
                onClick={handleScan}
            >
                Scan
            </Button>
        </div>
    );
};

export default StationInput;
