import Vault from 'renderer/components/Vault';
import Header from 'renderer/components/Header';
import Sidebar from 'renderer/components/Sidebar';
import { useState, useEffect, useContext } from 'react';
import {
  decryptPasswords,
  generateEncryptionKey,
} from 'helpers/encryptionHelpers';
import PassphraseModal from 'renderer/components/PassphraseModal';
import AppContext from 'renderer/context/AppContext';
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

export default function Dashboard() {
  const [searchParams, setsearchParams] = useState<string>('');
  const [passwordsToRender, setPasswordsToRender] = useState<password[]>([]);

  const {
    validPassphrase,
    accessToken,
    setPasswords,
    passphrase,
    passwords,
    pqSecureKey,
    setPQSecureKey,
  } = useContext(AppContext);

  useEffect(() => {
    if (searchParams === '') {
      setPasswordsToRender(passwords);
    } else {
      const passwordsToRender = passwords?.filter((entry) => {
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

  const fetchPasswords = async () => {
    try {
      let response = await axios.get(
        `${process.env.SERVER_ADDRESS}/api/users/data`,
        {
          headers: {
            authorization: accessToken,
            key: pqSecureKey,
          },
        }
      );

      return response.data;
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    async function keyExchange() {
      try {
        let response = await axios.post(
          `${process.env.PROXY_ADDRESS}/proxy/keyexchange`,
          {
            accessToken: accessToken,
          }
        );
        setPQSecureKey(JSON.stringify(response.data));
      } catch (error) {
        console.log(error.message);
      }
    }

    keyExchange();
  }, []);

  useEffect(() => {
    async function populatePasswords() {
      try {
        let encryptedPasswords = await fetchPasswords();

        if (!encryptedPasswords.data) {
          return;
        }
        // console.log('encrypted data ' + encryptedPasswords.data )
        let encryptionKey = generateEncryptionKey(passphrase);
        let decryptedPasswords = decryptPasswords(
          encryptedPasswords.data,
          encryptionKey
        );
        // console.log("decrypted passwords " + decryptedPasswords)
        setPasswords(decryptedPasswords);
        setPasswordsToRender(decryptedPasswords);
      } catch (error) {
        console.log(error.message);
      }
    }
    if (validPassphrase === true) {
      populatePasswords();
    }
  }, [validPassphrase]);

  const getSearchParams = (value) => {
    setsearchParams(value);
  };

  return (
    <div className="grid grid-cols-4">
      <PassphraseModal isOpen={true} />
      <div className="col-span-1">
        <Sidebar default={true} />
      </div>
      <div className="col-start-2 col-end-5">
        <Header searchParams={getSearchParams} />
        <Vault passwords={passwordsToRender} />
      </div>
    </div>
  );
}
