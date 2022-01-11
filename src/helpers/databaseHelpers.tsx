import { encryptPasswords, generateEncryptionKey } from "./encryptionHelpers";
import axios from "axios";


const addToDatabase = async (passwordsToSave, passphrase, accessToken, pqSecureKey) => {
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
        `${process.env.SERVER_ADDRESS}/api/users/data`,
        {
          data: encryptedPasswords,
        },
        {
          headers: {
            authorization: accessToken,
            key: pqSecureKey,
          },
        }
      );
    } catch (err) {
      console.log(err.message);
    }
};

export default addToDatabase;