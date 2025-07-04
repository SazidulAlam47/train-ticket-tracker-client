import { Button } from '@/components/ui/button';
import { authKey } from '@/constants/auth.constant';
import { loginSchema } from '@/schemas/schemas';
import TFrom from '@/shared/Form/TForm';
import TInput from '@/shared/Form/TInput';
import axiosInstance from '@/utils/axiosInstance';
import { setToLocalStorage } from '@/utils/localStorage';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldValues } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = async (data: FieldValues) => {
        try {
            const res = await axiosInstance.post('/auth/login', data);
            const token = res.data.data.token;
            console.log({ token, res });
            if (token) {
                setToLocalStorage(authKey, token);
                navigate('/');
                toast.success('Login Successful');
            } else {
                toast.error('Invalid credentials');
            }
        } catch (error) {
            console.log(error);
            toast.error('Invalid credentials');
        }
    };

    return (
        <div className="bg-white p-4 rounded-2xl max-w-xl mx-auto">
            <div className="mb-4 space-y-0.5">
                <h1 className="text-center text-2xl font-bold text-gray-800">
                    Train Ticket Tracker
                </h1>
                <p className="text-center text-sm text-gray-500">
                    Login with your Rail Sheba Account
                </p>
            </div>
            <TFrom
                onSubmit={handleLogin}
                resolver={zodResolver(loginSchema)}
                className="flex flex-col gap-4"
            >
                <TInput
                    name="mobile_number"
                    label="Mobile Number"
                    placeholder="Enter your Mobile Number"
                />
                <TInput
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your Password"
                />
                <Button
                    type="submit"
                    size="lg"
                    className="text-base cursor-pointer bg-[#1ca559] hover:bg-[#167457]"
                >
                    Login
                </Button>
            </TFrom>

            <p className="text-sm text-center mt-5 text-[#2c3e50]">
                Don't have an account ?{' '}
                <a
                    href="https://eticket.railway.gov.bd/register"
                    target="_blank"
                    className="font-bold text-[#178b4c] hover:text-[#107a40]"
                >
                    Register
                </a>
            </p>
            <p className="text-sm text-center mt-2 text-[#2c3e50]">
                Use the{' '}
                <a
                    href="https://github.com/SazidulAlam47/train-ticket-tracker-sync-extension"
                    target="_blank"
                    className="font-bold text-[#178b4c] hover:text-[#107a40]"
                >
                    Train Ticket Tracker Sync Extension
                </a>{' '}
                to sync your Rail Sheba account.
            </p>
        </div>
    );
};

export default Login;
