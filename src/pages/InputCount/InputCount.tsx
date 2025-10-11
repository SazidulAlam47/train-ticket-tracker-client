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
import { FiLogOut, FiUser } from 'react-icons/fi';
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
                    <div className="text-center space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Loading your account
                        </h3>
                        <p className="text-sm text-gray-600">
                            Please wait while we verify your credentials
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="max-w-xl mx-auto">
                <div className="bg-white p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#1ca559] to-[#167457] rounded-full flex items-center justify-center">
                            <FiUser className="text-white text-lg" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Welcome back
                            </p>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {name}
                            </h3>
                        </div>
                    </div>
                    <Button
                        className="text-sm font-medium px-4 py-2 bg-[#e72a40] hover:bg-[#c0162a] text-white flex items-center gap-2"
                        onClick={handleLogout}
                    >
                        <FiLogOut className="text-sm" />
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
                    <div className="space-y-2">
                        <TInput
                            name="inputCount"
                            label="Number of scans"
                            type="number"
                            placeholder="Enter number of scans (e.g., 1)"
                        />
                    </div>
                    <Button
                        type="submit"
                        size="lg"
                        className="text-base cursor-pointer bg-[#1ca559] hover:bg-[#167457]"
                    >
                        Generate
                    </Button>
                </TFrom>
                <p className="text-sm text-center mt-5 text-gray-600 leading-relaxed">
                    This project is open source. Check it out on{' '}
                    <a
                        href="https://github.com/SazidulAlam47/train-ticket-tracker-client"
                        target="_blank"
                        className="font-bold text-[#1ca559] hover:text-[#167457] hover:underline transition-colors duration-200"
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
