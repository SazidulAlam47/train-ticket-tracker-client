import { Label } from '../ui/label';

type TErrorMessageProps = {
    message: string | undefined;
};

const ErrorMessage = ({ message }: TErrorMessageProps) => {
    if (!message) {
        return null;
    }
    return <Label className="text-red-600">{message}</Label>;
};

export default ErrorMessage;
