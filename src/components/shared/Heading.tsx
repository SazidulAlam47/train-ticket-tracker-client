import { cn } from '@/lib/utils';

type THeadingProps = {
    className?: string;
};

const Heading = ({ className }: THeadingProps) => {
    return (
        <h1
            className={cn(
                'text-center text-2xl font-bold text-gray-800 mb-1',
                className,
            )}
        >
            Train Ticket Tracker
        </h1>
    );
};

export default Heading;
