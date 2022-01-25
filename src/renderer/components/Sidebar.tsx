import { ViewListIcon, HeartIcon, TrashIcon } from '@heroicons/react/outline';
import { useHistory } from 'react-router';
import { useContext } from 'react';
import AppContext from 'renderer/context/AppContext';

export default function Sidebar(props: any) {
  const history = useHistory();
  const { setAccessToken, setPasswords, setValidPassphrase, setPQSecureKey, setPassphrase, setActivePassword, } = useContext(AppContext);

  const onFavoriteButtonClickHander = () => {
    history.push('/favorites');
  };

  const onDashboardClickHander = () => {
    history.push('/dashboard');
  };

  const logout = () => {
    setAccessToken("");
    setPasswords([]);
    setPassphrase("");
    setPQSecureKey("");
    setValidPassphrase(false);
    history.push('/');
  };

  return (
    <div className="bg-gray-50 h-screen border-r-2 flex flex-col justify-between">
      <div>
        <button
          onClick={onDashboardClickHander}
          className={`flex justify-start items-center py-2 px-1 w-full ${
            props.default ? 'bg-gray-200' : ''
          }`}
        >
          <ViewListIcon className="h-4 pl-2 mr-1" />
          All Passkeys
        </button>
        <button
          onClick={onFavoriteButtonClickHander}
          className={`flex justify-start items-center py-2 px-1 w-full ${
            props.favorites ? 'bg-gray-200' : ''
          }`}
        >
          <HeartIcon className="h-4 pl-2 mr-1" />
          Favorites
        </button>
        <button
          className={`flex justify-start items-center py-2 px-1 w-full ${
            props.trash ? 'bg-gray-200' : ''
          }`}
        >
          <TrashIcon className="h-4 pl-2 mr-1" />
          Trash
        </button>
      </div>
      <div>
        <button
          onClick={logout}
          className="w-full p-4 bg-blue-500 text-white text-center hover:bg-blue-400 active:scale-90 transition duration-200 ease-out"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
