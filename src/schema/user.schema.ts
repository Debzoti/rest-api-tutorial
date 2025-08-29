import {object, string, TypeOf} from 'zod';

const createUserSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required',
        }),

        email: string({
            required_error: 'Email is required',
        }).email('Invalid email format'),
        
        password: string({
            required_error: 'Password is required',
        }).min(6, 'Password must be at least 6 characters long'),

        confirmPassword: string({
            required_error: 'Confirm Password is required',
        }).min(6, 'Confirm Password must be at least 6 characters long'),
        
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    }),
});

type createUserInput = TypeOf<typeof createUserSchema>;

export { createUserInput };
export default createUserSchema;