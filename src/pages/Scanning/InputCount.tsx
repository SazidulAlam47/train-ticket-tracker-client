import ErrorMessage from '@/components/shared/ErrorMessage';
import Heading from '@/components/shared/Heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useTicketContext from '@/hooks/useTicketContext';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

type Inputs = {
    inputCount: number;
};

const InputCount = () => {
    const { setInputCount } = useTicketContext();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setInputCount(data.inputCount);
    };

    return (
        <div className="bg-white p-4 rounded-2xl max-w-xl mx-auto">
            <Heading />
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="space-y-2">
                    <Label htmlFor="inputCount">Number of scans</Label>
                    <Input
                        className="h-9 text-base"
                        type="number"
                        id="inputCount"
                        placeholder="Enter number of scans"
                        {...register('inputCount', {
                            required: 'Please enter a number',
                            min: {
                                value: 1,
                                message: 'Please enter a positive number',
                            },
                        })}
                    />
                </div>
                <ErrorMessage message={errors.inputCount?.message} />
                <Button
                    type="submit"
                    size="lg"
                    className="text-base cursor-pointer bg-[#1ca559] hover:bg-[#167457]"
                >
                    Generate
                </Button>
            </form>
            <p className="text-sm text-center mt-5 text-[#2c3e50]">
                This project is open source. Check it out on{' '}
                <a
                    href="https://github.com/SazidulAlam47/train-ticket-tracker-client"
                    target="_blank"
                    className="font-bold text-[#167457] hover:text-[#1c6650]"
                >
                    GitHub
                </a>
                .
            </p>
        </div>
    );
};

export default InputCount;
