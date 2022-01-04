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

export default function Dashboard() {
  // const [open, setOpen] = useState<Boolean>(false);
  const { validPassphrase, accessToken, setPasswords, passphrase } = useContext(AppContext);


  const fetchPasswords = async () => {
    try {
      let response = await axios.get('http://localhost:3000/api/users/data', {
        headers: {
          authorization: accessToken,
        },
      });

      return response.data;
    } catch (err) {
      console.log(err.message);
    }
  };

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
      } catch (error) {
        console.log(error.message);
      }
    }
    if (validPassphrase === true) {
      populatePasswords();
    }
  }, [validPassphrase]);

  return (
    <div className="grid grid-cols-4">
      <PassphraseModal isOpen={true} />
      <div className="col-span-1">
        <Sidebar default={true} />
      </div>
      <div className="col-start-2 col-end-5">
        <Header />
        <Vault />
      </div>
    </div>
  );
}
