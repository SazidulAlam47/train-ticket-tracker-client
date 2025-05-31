import { useEffect } from 'react';
import StationInputSingle from './StationInputSingle';
import Heading from '@/components/shared/Heading';
import { Button } from '@/components/ui/button';
import { IoMdArrowRoundBack } from 'react-icons/io';
import toast from 'react-hot-toast';
import useTicketContext from '@/hooks/useTicketContext';

const StationInput = () => {
    const { scans, setScans, inputCount, setInputCount, setShowTable } =
        useTicketContext();

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
        <div className="bg-white px-2.5 py-3 md:p-4 rounded-2xl max-w-3xl mx-auto">
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
            <div className="space-y-5 mb-5">
                {scans.length &&
                    scans.map((scan, index) => (
                        <StationInputSingle
                            key={index}
                            index={index}
                            scan={scan}
                        />
                    ))}
            </div>
            <Button
                type="submit"
                size="lg"
                className="w-full text-base cursor-pointer bg-[#2f6493] hover:bg-[#164973]"
                onClick={handleScan}
            >
                Scan
            </Button>
        </div>
    );
};

export default StationInput;
