import Sidebar from 'renderer/components/Sidebar';
import { EyeIcon } from '@heroicons/react/outline';
import { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router';

export default function NewEntry() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const toggleRevealPassword = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const history = useHistory();

  useEffect(() => {
    if (passwordVisible && inputRef.current) {
      inputRef.current.type = 'text';
    } else {
      if (inputRef.current) inputRef.current.type = 'password';
    }
  }, [passwordVisible]);

  const onBackClickHandler = () => {
    history.push('/dashboard');
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    alert('Submited Successfully');
  };

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">
        <Sidebar default={true} />
      </div>
      <div className="col-start-2 col-end-5 bg-gray-50">
        <form onSubmit={onSubmitHandler} className="flex flex-col h-screen items-center ">
          <h1 className="text-lg font-bold mt-3">Add New Entry</h1>
          <div className="shadow-md w-[60%] mt-3 border-2 bg-white ">
            <div className="hover:bg-gray-100 p-2">
              <label className=" text-md block" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className="focus:outline-none bg-transparent w-full"
                id="name"
              />
            </div>
            <hr className="text-gray-400 m-0" />
            <div className="hover:bg-gray-100 p-2">
              <label className=" text-md block" htmlFor="username">
                Username
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="username"
                  className="focus:outline-none bg-transparent  w-full"
                />
              </div>
            </div>
            <hr className="text-gray-400" />
            <div className="hover:bg-gray-100 p-2">
              <label className=" text-md block" htmlFor="password">
                Password
              </label>
              <div className="flex items-center">
                <input
                  type="password"
                  className="focus:outline-none bg-transparent  w-full"
                  id="password"
                  ref={inputRef}
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
            <div className="hover:bg-gray-100 p-2">
              <label className=" text-md block" htmlFor="url">
                URL
              </label>
              <input
                type="text"
                className="focus:outline-none bg-transparent  w-full"
                id="url"
              />
            </div>
          </div>
          <div className="hover:bg-gray-100 bg-white shadow-md w-[60%] relative h-[20%] border-2 mt-4 p-2">
            <label className="h-[20%] text-md block" htmlFor="notes">
              Notes
            </label>
            <div className="w-full h-[80%]">
              <textarea
                className="focus:outline-none bg-transparent box-border h-full w-full"
                id="notes"
              />
            </div>
          </div>
          <div className="flex justify-between mt-3 w-[60%] ">
            <button
              onClick={onBackClickHandler}
              className="bg-blue-500 hover:shadow-lg text-white px-4 py-2 cursor-pointer rounded-md flex items-center active:scale-90 transition duration-200 ease-out"
            >
              Back
              {/* <PlusIcon className="h-4 pl-2" /> */}
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:shadow-lg text-white px-4 py-2 cursor-pointer rounded-md flex items-center active:scale-90 transition duration-200 ease-out"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
