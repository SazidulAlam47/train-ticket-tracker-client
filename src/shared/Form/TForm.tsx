/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import type { FieldValues, SubmitHandler } from 'react-hook-form';

type TFormConfig = {
    defaultValues?: Record<string, unknown>;
    resolver?: any;
};

type THFormProps = {
    children: ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
    className?: string;
} & TFormConfig;

const TFrom = ({
    children,
    onSubmit,
    defaultValues,
    resolver,
    className,
}: THFormProps) => {
    const formConfig: TFormConfig = {};

    if (defaultValues) {
        formConfig.defaultValues = defaultValues;
    }
    if (resolver) {
        formConfig.resolver = resolver;
    }

    const methods = useForm(formConfig);

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className={className}
            >
                {children}
            </form>
        </FormProvider>
    );
};

export default TFrom;
