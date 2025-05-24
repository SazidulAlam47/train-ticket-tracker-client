import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

type ContainerProps = {
    asChild?: boolean;
    children: ReactNode;
    className?: string;
} & HTMLAttributes<HTMLDivElement>;

const Container = forwardRef<HTMLDivElement, ContainerProps>(
    ({ asChild, children, className, ...props }, ref) => {
        const Component = asChild ? Slot : 'div';

        return (
            <Component
                ref={ref}
                className={cn('container mx-auto px-3 md:px-6', className)}
                {...props}
            >
                {children}
            </Component>
        );
    },
);

Container.displayName = 'Container'; // Good practice for debugging with React DevTools

export default Container;
