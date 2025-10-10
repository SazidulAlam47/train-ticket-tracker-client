import Heading from '@/components/shared/Heading';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/helpers/axiosInstance';
import useTicketContext from '@/hooks/useTicketContext';
import { inputCountSchema } from '@/schemas/schemas';
import TFrom from '@/shared/Form/TForm';
import TInput from '@/shared/Form/TInput';
import { removeFromLocalStorage } from '@/utils/localStorage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsInfoCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router';

const InputCount = () => {
    const [name, setName] = useState('');
    const { setInputCount } = useTicketContext();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get('/users/profile')
            .then((res) => setName(res.data.data.name))
            .catch((error) => {
                console.error(error.message);
                removeFromLocalStorage('token');
                removeFromLocalStorage('ssdk');
                removeFromLocalStorage('uudid');
                navigate('/login');
                toast('Please Login to Scan Tickets', {
                    icon: (
                        <BsInfoCircleFill
                            size={18}
                            className="text-[#3498db]"
                        />
                    ),
                });
            });
    }, [navigate]);

    const handleSubmit = (data: FieldValues) => {
        setInputCount(data.inputCount);
        navigate('/input-stations');
    };

    const handleLogout = () => {
        removeFromLocalStorage('token');
        removeFromLocalStorage('ssdk');
        removeFromLocalStorage('uudid');
        navigate('/login');
        toast.success('Logout Successful');
    };

    if (!name) {
        return (
            <div className="bg-white p-4 rounded-2xl max-w-lg mx-auto text-center">
                <Heading />
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                    <div className="relative">
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#1ca559] rounded-full animate-spin"></div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-700">
                            Loading your account...
                        </p>
                        <p className="text-xs text-gray-500">
                            Please wait a moment
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="max-w-xl mx-auto">
                <div className="bg-white p-3 rounded-2xl ml-auto w-fit flex items-center gap-3">
                    <h3>{name}</h3>
                    <Button
                        size="default"
                        className="text-base cursor-pointer bg-[#df3c4f] hover:bg-red-700"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </div>
            </div>
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
