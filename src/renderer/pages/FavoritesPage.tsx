import Header from 'renderer/components/Header';
import Sidebar from 'renderer/components/Sidebar';
// import Vault from 'renderer/components/Vault';
import { useState, useEffect, useContext } from 'react';
import AppContext from 'renderer/context/AppContext';
import PasswordItem from 'renderer/components/PasswordItem';
import Vault from 'renderer/components/Vault';

interface password {
  name: string;
  username: string;
  url: string;
  password: string;
  note: string;
  favorite: boolean;
}

export default function FavoritesPage() {
  const { passwords } = useContext(AppContext);
  const [searchParams, setsearchParams] = useState<string>('');
  const [passwordsToRender, setPasswordsToRender] = useState<password[]>([]);
  const filteredPassword = passwords?.filter((password) => {
    return password.favorite === true;
  });

  useEffect(() => {

    setPasswordsToRender(filteredPassword);
  }, []);

  useEffect(() => {
    if (searchParams === '') {
      setPasswordsToRender(filteredPassword);
    } else {
      const passwordsToRender = filteredPassword?.filter((entry) => {
        let name = entry.name;
        let url = entry.url;

        return (
          name.toLowerCase().includes(searchParams.toLowerCase()) ||
          url.toLowerCase().includes(searchParams.toLowerCase())
        );
      });
      setPasswordsToRender(passwordsToRender);
    }
    console.log('render', passwordsToRender);
  }, [searchParams]);

  const getSearchParams = (value) => {
    setsearchParams(value);
  };

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">
        <Sidebar favorites={true} />
      </div>
      <div className="col-start-2 col-end-5">
        <Header searchParams={getSearchParams} />
        <Vault passwords={passwordsToRender} />

        {/* 
        <div>
          {passwordsToRender?.map(
            ({ name, username, url, note, password, favorite }, i) => {
              return (
                <PasswordItem
                  name={name}
                  username={username}
                  url={url}
                  note={note}
                  password={password}
                  favorite={favorite}
                  key={i}
                />
              );
            }
          )}
        </div> */}
      </div>
    </div>
  );
}
