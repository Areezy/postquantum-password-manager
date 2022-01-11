import PasswordItem from './PasswordItem';
import { useContext } from 'react';
import AppContext from 'renderer/context/AppContext';

export default function Vault({passwords}: any) {
  
  
  return (
    <div className="">
      {passwords?.map(({ name, username, url, note, password, favorite }, i) => {
        return <PasswordItem name={name} username={username} url={url} note={note} password={password} favorite={favorite} key={i}/>;
      })}
    </div>
  );
}
