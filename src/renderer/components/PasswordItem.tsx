import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/react/solid';
import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import {} from 'react';
import AppContext from 'renderer/context/AppContext';
import {
  encryptPasswords,
  generateEncryptionKey,
} from 'helpers/encryptionHelpers';
import axios from 'axios';
import addToDatabase from 'helpers/databaseHelpers';
import deepCompareObj from 'helpers/objectCompareHelper';

export default function PasswordItem(props: any) {
  const [liked, setLiked] = useState<boolean>(props.favorite);
  const propsPasswordObj = {
    name: props.name,
    username: props.username,
    url: props.url,
    password: props.password,
    note: props.note,
    favorite: props.favorite,
  };
  const {
    passwords,
    setPasswords,
    setActivePassword,
    accessToken,
    pqSecureKey,
    passphrase,
  } = useContext(AppContext);

  const history = useHistory();

  // useEffect(() => {
  //   setLiked(props.favorite);
  // }, []);

  useEffect(() => {
    const newPasswords = passwords?.map((entry) => {
      let isSame = deepCompareObj(entry, propsPasswordObj);
      console.log(isSame);
      if (isSame) {
        entry.favorite = liked;
        return entry;
      } else {
        return entry;
      }
    });
    addToDatabase(newPasswords, passphrase, accessToken, pqSecureKey);
    setPasswords(newPasswords);
    console.log(newPasswords);
  }, [liked]);

  const toggledLiked = () => {
    setLiked((prevState) => !prevState);
  };

  const onClickHandler = () => {
    setActivePassword({
      name: props.name,
      username: props.username,
      url: props.url,
      password: props.password,
      note: props.note,
      favorite: props.favorite,
    });
    history.push('/viewentry');
  };

  return (
    <div className="cursor-pointer bg-gray-50 p-1 border-b-2 flex items-center justify-between">
      <div onClick={onClickHandler}>
        <p className="text-sm">{props.name || 'My Facebook Password'}</p>
        <p className="text-xs text-gray-400">{props.url || 'facebook.com'}</p>
      </div>
      {liked ? (
        <SolidHeartIcon
          onClick={toggledLiked}
          className="h-5 mr-3 text-red-500 active:scale-90 transition duration-200 ease-in-out"
        />
      ) : (
        <HeartIcon
          onClick={toggledLiked}
          className="h-5 mr-3 active:scale-90 transition duration-200 ease-in-out"
        />
      )}
    </div>
  );
}
