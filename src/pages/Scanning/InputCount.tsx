import ErrorMessage from '@/components/shared/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

type Inputs = {
    inputCount: number;
};

type TInputCountProps = {
    setInputCount: Dispatch<SetStateAction<number>>;
};

const InputCount = ({ setInputCount }: TInputCountProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        setInputCount(data.inputCount);
    };

    return (
        <div className="bg-white p-4 rounded-2xl">
            <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
                Train Ticket Tracker
            </h1>
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Label htmlFor="picture">Enter number of scans</Label>
                <Input
                    type="number"
                    placeholder="Enter number of scans"
                    {...register('inputCount', {
                        required: 'Please enter a number',
                        min: {
                            value: 1,
                            message: 'Please enter a positive number',
                        },
                    })}
                />
                <ErrorMessage message={errors.inputCount?.message} />
                <Button
                    type="submit"
                    className="cursor-pointer bg-green-500 hover:bg-green-600"
                >
                    Generate
                </Button>
            </form>
        </div>
    );
};

export default InputCount;
