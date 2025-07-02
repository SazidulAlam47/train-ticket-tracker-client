import Heading from '@/components/shared/Heading';
import { Button } from '@/components/ui/button';
import { authKey } from '@/constants/auth.constant';
import useTicketContext from '@/hooks/useTicketContext';
import { inputCountSchema } from '@/schemas/schemas';
import TFrom from '@/shared/Form/TForm';
import TInput from '@/shared/Form/TInput';
import axiosInstance from '@/utils/axiosInstance';
import { removeFromLocalStorage } from '@/utils/localStorage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsInfoCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router';

const InputCount = () => {
    const { setInputCount } = useTicketContext();
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (data: FieldValues) => {
        setInputCount(data.inputCount);
        navigate('/input-stations');
    };

    useEffect(() => {
        axiosInstance
            .get('/auth/profile')
            .then((res) => setName(res.data.data.name))
            .catch((error) => {
                console.error(error.message);
                removeFromLocalStorage(authKey);
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

    const handleLogout = () => {
        removeFromLocalStorage(authKey);
        navigate('/login');
        toast.success('Logout Successful');
    };

    return (
        <div className="space-y-4">
            <div className="max-w-xl mx-auto">
                <div className="bg-white p-3 rounded-2xl ml-auto w-fit flex items-center gap-3">
                    <h3>{name || 'Loading...'}</h3>
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
            </div>
        </div>
    );
};

export default InputCount;
