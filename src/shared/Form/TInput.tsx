import ErrorMessage from '@/components/shared/ErrorMessage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import getFieldError from '@/utils/getFieldError';
import { useFormContext } from 'react-hook-form';

type THInputProps = {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
};

const TInput = ({ label, name, type = 'text', placeholder }: THInputProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const fieldError = getFieldError(errors, name);

    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Input
                className={cn(
                    'h-9 text-base font-normal placeholder:font-light',
                    {
                        'border-red-500': fieldError,
                    },
                )}
                type={type}
                id={name}
                placeholder={placeholder}
                {...register(name)}
            />
            <ErrorMessage message={fieldError?.message || ''} />
        </div>
    );
};

export default TInput;
