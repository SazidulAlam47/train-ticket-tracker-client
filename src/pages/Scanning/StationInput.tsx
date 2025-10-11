import { useEffect } from 'react';
import StationInputSingle from './StationInputSingle';
import Heading from '@/components/shared/Heading';
import { Button } from '@/components/ui/button';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { HiSparkles } from 'react-icons/hi';
import toast from 'react-hot-toast';
import useTicketContext from '@/hooks/useTicketContext';
import { useNavigate } from 'react-router';

const StationInput = () => {
    const { scans, setScans, inputCount } = useTicketContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!inputCount) {
            navigate('/');
        }
        setScans(
            Array.from({ length: inputCount }, () => ({
                from: '',
                to: '',
                date: undefined,
            })),
        );
    }, [inputCount, setScans, navigate]);

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
            navigate('/ticket-table');
        }
    };

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="bg-white px-2.5 py-3 md:p-4 rounded-2xl max-w-4xl mx-auto">
            <Heading />
            <Button
                variant="secondary"
                className="mb-4 cursor-pointer"
                size="sm"
                onClick={handleGoBack}
            >
                <IoMdArrowRoundBack />
                Go Back
            </Button>
            <div className="space-y-5 mb-5">
                {scans.length ? (
                    scans.map((scan, index) => (
                        <StationInputSingle
                            key={index}
                            index={index}
                            scan={scan}
                        />
                    ))
                ) : (
                    <div className="text-center py-8">
                        <HiSparkles className="text-4xl text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">
                            No scanning stations configured
                        </p>
                    </div>
                )}
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
