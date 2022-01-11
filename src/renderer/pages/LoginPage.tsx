import { LockOpenIcon, PlusIcon, EyeIcon } from '@heroicons/react/outline';
import { useState, useEffect, useRef, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import AppContext from '../context/AppContext';
import StatusModal from 'renderer/components/StatusModal';

interface stateType {
  username: string;
}

export default function LoginPage() {
  const { setAccessToken, modalActive, setModalActive } =
    useContext(AppContext);
  const location = useLocation<stateType>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(
    location.state?.username || ''
  );
  const [password, setPassword] = useState<string>();

  const history = useHistory();


  const toggleRevealPassword = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSignUpClick = () => {
    history.push('/signup');
  };

  const handleLogInClick = async (e: any) => {
    e.preventDefault();
    let userData = { username: username, password: password };
    try {
      const response = await axios.post(
        `${process.env.SERVER_ADDRESS}/api/users/login`,
        userData
      );
      if (response.status === 200) {
        setAccessToken(response.data.token);
        history.push('/dashboard');
      } else {
        setModalActive(true);
      }
    } catch (error: any) {
      console.log(error.message);
      setModalActive(true);
    }
  };

  const usernameOnChangeHandler = (e: any) => {
    setUsername(e.target.value);
  };

  const passwordOnChangeHandler = (e: any) => {
    setPassword(e.target.value);
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
      {modalActive ? (
        <StatusModal
          isOpen={true}
          error={true}
          title={'Login Failed'}
          content={'Check your credentials'}
          buttonText={'Try again'}
        />
      ) : (
        ''
      )}

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
              className="focus:outline-none  hover:bg-gray-100  w-full"
              id="username"
              onChange={usernameOnChangeHandler}
              value={username}
            />
          </div>
          <hr className="text-gray-400" />
          <div className="">
            <label className=" text-md block" htmlFor="key">
              Password
            </label>
            <div className="flex items-center">
              <input
                type="password"
                id="key"
                ref={inputRef}
                className="focus:outline-none hover:bg-gray-100 w-full"
                onChange={passwordOnChangeHandler}
                value={password}
              />
              <EyeIcon
                onClick={toggleRevealPassword}
                className={`h-6 pl-2 transition duration-200 active:ease-in-out ${
                  passwordVisible ? 'text-blue-500' : ''
                }`}
              />
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-between">
          <button
            onClick={handleLogInClick}
            className="bg-blue-500 hover:shadow-lg text-white px-4 py-2 cursor-pointer rounded-md flex items-center active:scale-90 transition duration-200 ease-out"
          >
            Log In
            <LockOpenIcon className="h-4 pl-2" />
          </button>
          <button
            onClick={handleSignUpClick}
            className="bg-blue-500 hover:shadow-lg text-white px-4 py-2 cursor-pointer rounded-md flex items-center active:scale-90 transition duration-200 ease-out"
          >
            Sign up
            <PlusIcon className="h-4 pl-2" />
          </button>
        </div>
      </form>
    </div>
  );
}
