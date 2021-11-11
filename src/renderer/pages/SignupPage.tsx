import { useState, useRef, useEffect } from 'react';
import { PlusIcon, EyeIcon, LockClosedIcon } from '@heroicons/react/outline';
import validateSignUpForm from 'helpers/validationHelpers';
import { useHistory } from 'react-router-dom';

export default function SignupPage() {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const history = useHistory();

  const onSignupSubmitHandler = (e: any) => {
    e.preventDefault();
    let user = {
      username,
      password,
      confirmPassword
    }

    const validateResponse: string = validateSignUpForm(user);

    // @TODO push to DB
    if (validateResponse === 'Success'){
      // Push to DB
      alert('Success');
      history.push('/');

    } else {
      alert (validateResponse);
    }

  }

  const usernameOnChangeHandler = (e: any) => {
    setUsername(e.target.value);
  }
  const passwordOnChangeHandler = (e: any) => {
    setPassword(e.target.value);
  }
  const confirmPasswordOnChangeHandler = (e: any) => {
    setConfirmPassword(e.target.value);
  }

  const toggleRevealPassword = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const toggleRevealConfirmPassword = () => {
    setConfirmPasswordVisible((prevState) => !prevState);
  };


  useEffect(() => {
    if (passwordVisible && passwordRef.current) {
      passwordRef.current.type = 'text';
    } else {
      if (passwordRef.current) passwordRef.current.type = 'password';
    }
    if (confirmPasswordVisible && confirmPasswordRef.current) {
      confirmPasswordRef.current.type = 'text';
    } else {
      if (confirmPasswordRef.current)
        confirmPasswordRef.current.type = 'password';
    }
  }, [passwordVisible, confirmPasswordVisible]);

  return (
    <div className="h-screen w-full bg-gray-50 ">
      <div className="w-[30%] mx-auto pt-20 flex items-center space-x-2">
        <h1 className="font-bold text-lg">Create an Account for your vault</h1>
        <LockClosedIcon className="inline h-4 " />
      </div>

      <form className="w-[30%] mx-auto pt-8" onSubmit={onSignupSubmitHandler}>
        <div className="shadow-md space-y-2 bg-white p-2">
          <div className="">
            <label className=" text-md block" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              className="focus:outline-none  w-full"
              id="username"
              required
              value={username}
              onChange={usernameOnChangeHandler}
            />
          </div>
          <hr className="text-gray-400" />
          <div className="">
            <label className=" text-md block" htmlFor="key">
              Key
            </label>
            <div className="flex items-center">
              <input
                type="password"
                id="key"
                required
                className="focus:outline-none  w-full"
                ref={passwordRef}
                value={password}
                onChange={passwordOnChangeHandler}
              />
              <EyeIcon
                onClick={toggleRevealPassword}
                className={`h-6 pl-2 transition duration-200 active:ease-in-out ${
                  passwordVisible ? 'text-blue-500' : ''
                }`}
              />
            </div>
          </div>
          <hr className="text-gray-400" />
          <div className="">
            <label className=" text-md block" htmlFor="confirmkey">
              Confirm key
            </label>
            <div className="flex items-center">
              <input
                type="password"
                id="confirmkey"
                required
                className="focus:outline-none  w-full"
                ref={confirmPasswordRef}
                value={confirmPassword}
                onChange={confirmPasswordOnChangeHandler}
              />
              <EyeIcon
                onClick={toggleRevealConfirmPassword}
                className={`h-6 pl-2 transition duration-200 active:ease-in-out ${
                  confirmPasswordVisible ? 'text-blue-500' : ''
                }`}
              />
            </div>
          </div>
        </div>
        <div className="pt-2">
          <p className="text-sm text-gray-400">
            Please note that you would not be able to change the key so do not
            forget it.
          </p>
        </div>
        <div className="mt-3 flex justify-end">
          <button
            className="bg-blue-500 hover:shadow-lg text-white px-4 py-2 cursor-pointer rounded-md flex items-center active:scale-90 transition duration-500 ease-out"
            type="submit"
          >
            Sign up
            <PlusIcon className="h-4 pl-2" />
          </button>
        </div>
      </form>
    </div>
  );
}
