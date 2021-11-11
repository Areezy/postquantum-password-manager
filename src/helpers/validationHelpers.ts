import { z } from 'zod';

interface userInfo {
  username: string;
  password: string;
  confirmPassword: string;
}

const validateSignUpForm = (userData: userInfo): string => {
  let errorMessages: string[] = [];

  const userSchema = z
    .object({
      username: z
        .string()
        .min(3, { message: 'Username must not be less than 3 characters' }),
      password: z.string(),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });

  let validationResult = userSchema.safeParse(userData);

  if (validationResult.success) {
    return 'Success';
  }

  validationResult?.error.issues.map(err => {
    errorMessages.push(err.message);
  })


  return errorMessages.join(' & ');
};

export default validateSignUpForm;
