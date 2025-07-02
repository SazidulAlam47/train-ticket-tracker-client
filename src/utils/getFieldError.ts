/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldError } from 'react-hook-form';

const getFieldError = (errors: any, path: string): FieldError | undefined => {
    return path.split('.').reduce((acc: any, key) => acc?.[key], errors) as
        | FieldError
        | undefined;
};

export default getFieldError;
