import PasswordItem from './PasswordItem';
import { useContext } from 'react';
import AppContext from 'renderer/context/AppContext';

export default function Vault() {
  // TODO Refactor this to be used in all pages. receive password and render that to the screen
  const { passwords } = useContext(AppContext);
  return (
    <div className="">
      {passwords.map(({ name, username, url, note, password, favorite }) => {
        return <PasswordItem name={name} username={username} url={url} note={note} password={password} favorite={favorite} />;
      })}
    </div>
  );
}
