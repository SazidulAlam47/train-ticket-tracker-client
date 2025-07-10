import z from 'zod';

export const inputCountSchema = z.object({
    inputCount: z
        .string()
        .min(1, 'Please enter number of scans')
        .transform((value) => Number(value))
        .refine((value) => value > 0, {
            message: 'Please enter a positive number',
        }),
});
