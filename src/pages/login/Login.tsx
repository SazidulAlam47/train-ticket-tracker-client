import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div className="bg-white p-4 rounded-2xl max-w-xl mx-auto">
            <div className="mb-6 space-y-0.5">
                <h1 className="text-center text-2xl font-bold text-gray-800">
                    Train Ticket Tracker
                </h1>
            </div>

            <div className="space-y-4">
                <div className="text-center space-y-0">
                    <h2 className="text-lg font-semibold text-gray-700">
                        Get Started in 2 Simple Steps
                    </h2>
                    <p className="text-sm text-gray-500">
                        Install our Chrome extension and sync your Rail Sheba
                        account in one click.
                    </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-[#1ca559] text-white rounded-full flex items-center justify-center text-sm font-bold">
                            1
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                Install the Chrome Extension
                            </p>
                            <p className="text-xs text-gray-500">
                                Click the button below to install the Chrome
                                extension from GitHub.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-[#1ca559] text-white rounded-full flex items-center justify-center text-sm font-bold">
                            2
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                Sync Your Account
                            </p>
                            <p className="text-xs text-gray-500">
                                Open the extension and click "Sync Account".
                                Your account will sync automatically.
                            </p>
                        </div>
                    </div>
                </div>
                <a
                    className="block"
                    target="_blank"
                    href="https://github.com/SazidulAlam47/train-ticket-tracker-sync-extension"
                >
                    <Button className="w-full text-base cursor-pointer bg-[#1ca559] hover:bg-[#167457]">
                        Install Chrome Extension
                    </Button>
                </a>
            </div>

            <p className="text-sm text-center text-gray-600 pt-3">
                You can also use{' '}
                <Link
                    to="/login-advanced"
                    className="font-semibold text-[#178b4c] hover:text-[#107a40] hover:underline"
                >
                    Advanced Login
                </Link>{' '}
                to log in manually.
            </p>
        </div>
    );
};

export default Login;
