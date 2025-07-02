import z from 'zod';

export const loginSchema = z.object({
    mobile_number: z
        .string()
        .min(1, 'Please Enter your Mobile Number')
        .regex(/^01\d{9}$/, {
            message: 'Number must be 11 digits and start with 01',
        }),
    password: z.string().min(1, 'Please Enter your Password'),
});

export const inputCountSchema = z.object({
    inputCount: z
        .string()
        .min(1, 'Please Number of scans')
        .transform((value) => Number(value))
        .refine((value) => value > 0, {
            message: 'Please enter a positive number',
        }),
});
