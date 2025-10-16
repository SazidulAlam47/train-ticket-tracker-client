import z from 'zod';

export const inputCountSchema = z.object({
    inputCount: z
        .string()
        .min(1, 'Please enter number of scans')
        .transform((value) => Number(value))
        .refine((value) => value > 0, {
            message: 'Scan count must be at least 1',
        })
        .refine((value) => value <= 10, {
            message: 'Scan count can not be more than 10',
        }),
});

export const loginSchema = z.object({
    token: z.string().min(1, 'Enter your token'),
    ssdk: z.string().min(1, 'Enter your ssdk'),
    uudid: z.string().min(1, 'Enter your uudid'),
});
