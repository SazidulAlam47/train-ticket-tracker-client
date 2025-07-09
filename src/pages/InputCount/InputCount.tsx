import Heading from '@/components/shared/Heading';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/helpers/axiosInstance';
import useTicketContext from '@/hooks/useTicketContext';
import { inputCountSchema } from '@/schemas/schemas';
import TFrom from '@/shared/Form/TForm';
import TInput from '@/shared/Form/TInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router';

const InputCount = () => {
    const { setInputCount } = useTicketContext();
    const navigate = useNavigate();

    const handleSubmit = (data: FieldValues) => {
        setInputCount(data.inputCount);
        navigate('/input-stations');
    };

    useEffect(() => {
        axiosInstance.get('/test');
    }, []);

    return (
        <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl max-w-xl mx-auto">
                <Heading />
                <TFrom
                    onSubmit={handleSubmit}
                    resolver={zodResolver(inputCountSchema)}
                    className="flex flex-col gap-4"
                >
                    <TInput
                        name="inputCount"
                        label="Number of scans"
                        type="number"
                        placeholder="Enter number of scans"
                    />
                    <Button
                        type="submit"
                        size="lg"
                        className="text-base cursor-pointer bg-[#1ca559] hover:bg-[#167457]"
                    >
                        Generate
                    </Button>
                </TFrom>
                <p className="text-sm text-center mt-5 text-[#2c3e50]">
                    This project is open source. Check it out on{' '}
                    <a
                        href="https://github.com/SazidulAlam47/train-ticket-tracker-client"
                        target="_blank"
                        className="font-bold text-[#178b4c] hover:text-[#107a40]"
                    >
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default InputCount;
