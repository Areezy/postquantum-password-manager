import axios from 'axios';
import { z } from 'zod';

interface userInfo {
  username: string;
  password: string;
  confirmPassword: string;
  passphrase: string;
  
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
      passphrase: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });

  try {
    let validationResult = userSchema.parse(userData);

    if (validationResult) {
      return 'Success';
    }
  }catch (error) {
    error.issues.map(err => {
      errorMessages.push(err.message);
    })
  }
  
  return errorMessages.join(' & ');

};

export const validatePassphrase = async (passphrase, token) => {
  let response = await axios.post('http://localhost:3000/api/users/verify', {
    passphrase: passphrase,
  }, {headers: {
    authorization: token
  }});
  if (response.status === 200) {
    return true
  }else {
    return false;
  }
}

export default validateSignUpForm;
