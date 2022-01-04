import Sidebar from 'renderer/components/Sidebar';
import { EyeIcon } from '@heroicons/react/outline';
import { useRef, useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import AppContext from 'renderer/context/AppContext';
import {
  generateEncryptionKey,
  encryptPasswords,
} from '../../helpers/encryptionHelpers';
import axios from 'axios';
import StatusModal from 'renderer/components/StatusModal';

interface password {
  name: string;
  username: string;
  url: string;
  password: string;
  note: string;
  favorite: boolean;
}

export default function NewEntry() {
  const inputRef = useRef<HTMLInputElement>(null);
  // const isFirstRender = useRef<boolean>(false);
  // const [runEffect, setRunEffect] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const { modalActive, setModalActive } = useContext(AppContext);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [URL, setURL] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const { passwords, setPasswords, accessToken, passphrase } =
    useContext(AppContext);
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

  // useEffect(() => {
  //   async function encryptAndSavePasswords() {
  //     if (password.length === 0)  isFirstRender.current = true;
  //     if (isFirstRender.current) {
  //       try {
  //         let encryptionKey = await generateEncryptionKey(passphrase);
  //         let passwordsStringified = JSON.stringify(passwords);
  //         console.log('key ' + encryptionKey);
  //         console.log(passwordsStringified);
  //         let encryptedPasswords = await encryptPasswords(
  //           JSON.stringify(passwords),
  //           encryptionKey
  //         );
  //         console.log(encryptedPasswords);
  //         await axios.post(
  //           'http://localhost:3000/api/users/data',
  //           {
  //             data: encryptedPasswords,
  //           },
  //           {
  //             headers: {
  //               authorization: accessToken,
  //             },
  //           }
  //         );
  //         history.push('/dashboard');
  //         alert('Submited Successfully');
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     } else {
  //       isFirstRender.current = true;
  //     }

  //   }
  //   encryptAndSavePasswords();
  // }, [runEffect]);

  const onBackClickHandler = () => {
    history.push('/dashboard');
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    let passwordToSave = {
      name,
      username,
      url: URL,
      password,
      note,
      favorite: false,
    };

    // console.log()
    let passwordsToSave = [...passwords, passwordToSave];
    try {
      let encryptionKey = generateEncryptionKey(passphrase);
      let passwordsStringified = JSON.stringify(passwordsToSave);
      console.log('key ' + encryptionKey);
      console.log(passwordsStringified);
      let encryptedPasswords = encryptPasswords(
        passwordsStringified,
        encryptionKey
      );
      console.log(encryptedPasswords);
      await axios.post(
        'http://localhost:3000/api/users/data',
        {
          data: encryptedPasswords,
        },
        {
          headers: {
            authorization: accessToken,
          },
        }
      );
      setPasswords(passwordsToSave);
      setModalActive(true);

      // alert('Submited Successfully');
    } catch (error) {
      console.log(error.message);
    }

    // setRunEffect(() => !runEffect);

    //
  };
  const successModalBtnHandler = () => {
    setModalActive(false);
    history.push('/dashboard');
  };
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">
        <Sidebar default={true} />
      </div>
      {modalActive ? (
        <StatusModal
          isOpen={true}
          title={'Success'}
          content={'Added Password Successfully'}
          buttonText={'Go to Dashboard'}
          btnFunction={successModalBtnHandler}
        />
      ) : (
        ''
      )}
      <div className="col-start-2 col-end-5 bg-gray-50">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col h-screen items-center "
        >
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
                value={URL}
                onChange={(e) => setURL(e.target.value)}
                required
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
                value={note}
                onChange={(e) => setNote(e.target.value)}
                required
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
