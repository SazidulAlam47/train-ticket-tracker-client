import { Button } from '@/components/ui/button';
import { loginSchema } from '@/schemas/schemas';
import TFrom from '@/shared/Form/TForm';
import TInput from '@/shared/Form/TInput';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/localStorage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

const LoginAdvanced = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = getFromLocalStorage('token');
        const ssdk = getFromLocalStorage('ssdk');
        const uudid = getFromLocalStorage('uudid');

        if (token && ssdk && uudid) {
            navigate('/input-count');
        }
    }, [navigate]);

    const handleLogin = async (data: FieldValues) => {
        setToLocalStorage('token', data.token);
        setToLocalStorage('ssdk', data.ssdk);
        setToLocalStorage('uudid', data.uudid);
        navigate('/');
        toast.success('Credentials saved');
    };

    return (
        <div className="bg-white p-4 rounded-2xl max-w-xl mx-auto">
            <div className="mb-4 space-y-0.5">
                <h1 className="text-center text-2xl font-bold text-gray-800">
                    Train Ticket Tracker
                </h1>
                <p className="text-center text-sm text-gray-500">
                    Input the values manually from localStorage
                </p>
            </div>
            <TFrom
                onSubmit={handleLogin}
                resolver={zodResolver(loginSchema)}
                className="flex flex-col gap-4"
            >
                <TInput name="token" label="token" placeholder="token" />
                <TInput name="ssdk" label="ssdk" placeholder="ssdk" />
                <TInput name="uudid" label="uudid" placeholder="uudid" />

                <Button
                    type="submit"
                    size="lg"
                    className="text-base cursor-pointer bg-[#1ca559] hover:bg-[#167457]"
                >
                    Save
                </Button>
            </TFrom>

            <p className="text-sm text-center text-gray-600 pt-3">
                Prefer automatic sync?{' '}
                <Link
                    to="/login"
                    className="font-semibold text-[#178b4c] hover:text-[#107a40] hover:underline"
                >
                    Use Chrome Extension
                </Link>{' '}
                for one-click login.
            </p>
        </div>
    );
};

export default LoginAdvanced;
