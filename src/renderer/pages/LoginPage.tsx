import { EyeIcon } from '@heroicons/react/outline';
import { LockOpenIcon } from '@heroicons/react/outline';
import { PlusIcon } from '@heroicons/react/outline';
import { useState, useEffect, useRef } from 'react';

export default function LoginPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const toggleRevealPassword = () => {

    setPasswordVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (passwordVisible && inputRef.current) {
        inputRef.current.type = 'text';
    } else {
        if (inputRef.current) inputRef.current.type = 'password';
    }
  }, [passwordVisible]);
  return (
    <div className="h-screen w-full bg-gray-50 ">
      <div className="w-[30%] mx-auto pt-20">
        <h1 className="font-bold text-lg">
          Password Manager by{' '}
          <a
            className="text-blue-500 underline"
            href="https://github.com/Areezy"
            target="_blank"
          >
            Olamilekan
          </a>
        </h1>
        <p className="pt-3 text-lg">
          Secure your password with quantum safe cryptographic algorithms. The
          Future!
        </p>
      </div>

      <form className="w-[30%] mx-auto pt-8" action="">
        <div className="shadow-md space-y-2 bg-white p-2">
          <div className="">
            <label className=" text-md block" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              className="focus:outline-none  w-full"
              id="username"
            />
          </div>
          <hr className="text-gray-400" />
          <div className="">
            <label className=" text-md block" htmlFor="password">
              Password
            </label>
            <div className="flex items-center">
              <input
                type="password"
                id="password"
                ref={inputRef}
                className="focus:outline-none  w-full"
              />
              <EyeIcon
                onClick={toggleRevealPassword}
                className={`h-6 pl-2 transition duration-200 active:ease-in-out ${passwordVisible ? 'text-blue-500' : ''}`}
              />
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <button
            onClick={() => {}}
            className="bg-blue-500 hover:shadow-lg text-white px-4 py-2 cursor-pointer rounded-md flex items-center active:scale-90 transition duration-500 ease-out"
          >
            Log In
            <LockOpenIcon className="h-4 pl-2" />
          </button>
          <button
            onClick={() => {}}
            className="bg-blue-500 hover:shadow-lg text-white px-4 py-2 cursor-pointer rounded-md flex items-center active:scale-90 transition duration-500 ease-out"
          >
            Sign up
            <PlusIcon className="h-4 pl-2" />
          </button>
        </div>
      </form>
    </div>
  );
}
