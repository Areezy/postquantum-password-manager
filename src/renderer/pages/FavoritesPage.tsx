import Header from 'renderer/components/Header';
import Sidebar from 'renderer/components/Sidebar';
// import Vault from 'renderer/components/Vault';
import { useContext } from 'react';
import AppContext from 'renderer/context/AppContext';
import PasswordItem from 'renderer/components/PasswordItem';

export default function FavoritesPage() {
  const { passwords } = useContext(AppContext);
  const filteredPassword = passwords?.filter((password) => {
    return password.favorite;
  })
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">
        <Sidebar favorites={true} />
      </div>
      <div className="col-start-2 col-end-5">
        <Header />
        <div>{filteredPassword?.map(({ name, username, url, note, password, favorite }) => {
        return <PasswordItem name={name} username={username} url={url} note={note} password={password} favorite={favorite} />;
      })}</div>
      </div>
    </div>
  );
}
