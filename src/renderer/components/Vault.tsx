import PasswordItem from './PasswordItem';
import { useContext } from 'react';
import AppContext from 'renderer/context/AppContext';

export default function Vault() {
  const { passwords } = useContext(AppContext);
  return (
    <div className="">
      {passwords.map(({ name, username, url, note, password }) => {
        return <PasswordItem name={name} username={username} url={url} note={note} password={password} />;
      })}
    </div>
  );
}
