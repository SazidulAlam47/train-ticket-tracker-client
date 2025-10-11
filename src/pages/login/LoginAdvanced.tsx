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
import { BsInfoCircleFill } from 'react-icons/bs';
import Heading from '@/components/shared/Heading';

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
        <div className="bg-white p-4 rounded-xl max-w-2xl mx-auto">
            <div className="mb-4 space-y-0.5">
                <Heading />
            </div>

            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <BsInfoCircleFill className="w-3 h-3 text-green-600" />
                    </div>
                    <div className="flex-1 text-sm">
                        <p className="text-green-800 font-medium mb-2">
                            Please enter your token, ssdk and uudid from local
                            storage to use this service. These credentials will
                            be stored securely in your browser. These
                            credentials are valid for 24 hours. After that,
                            you'll need to get new token, ssdk, and uudid from
                            the e-ticket website again.
                        </p>
                        <div className="space-y-1.5 text-green-700">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                                <span>
                                    <span className="font-medium">
                                        Desktop/PC Users:
                                    </span>{' '}
                                    <Link
                                        to="/instructions/pc-instructions.jpg"
                                        target="_blank"
                                        className="text-green-700 hover:text-green-900 underline"
                                    >
                                        View step-by-step guide with screenshots
                                    </Link>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                                <span>
                                    <span className="font-medium">
                                        Mobile Device Users:
                                    </span>{' '}
                                    <Link
                                        to="/instructions/mobile-instructions.jpg"
                                        target="_blank"
                                        className="text-green-700 hover:text-green-900 underline"
                                    >
                                        Follow mobile-specific instructions
                                    </Link>
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                                <span>
                                    <span className="font-medium">
                                        Mobile Browser Inspector:
                                    </span>{' '}
                                    <Link
                                        to="/code/inspect.js"
                                        target="_blank"
                                        className="text-green-700 hover:text-green-900 underline"
                                    >
                                        Get JavaScript code for mobile
                                        inspection
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
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
