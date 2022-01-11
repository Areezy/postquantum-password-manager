import { SearchIcon, PlusIcon } from '@heroicons/react/outline';
import { useHistory } from 'react-router';

export default function Header(props) {
  const history = useHistory();

  const onNewEntryClickHandler = () => {
    history.push('/newentry');
  }

  const searchValue = (event: any) => {
    props.searchParams(event.target.value);
  }

  return (
    <header className="w-full flex justify-between">
      <div className="w-[60%] flex p-1 bg-blue-500">
        <input
          type="text"
          className="rounded-sm w-full p-1"
          placeholder="Search Vault"
          name=""
          id=""
          onChange={searchValue}
        />
        <button className="p-1 text-white flex mx-2 items-center active:scale-90 transition duration-200 ease-out">
          <SearchIcon className="h-6 text-white font-bold" />
        </button>
      </div>
      <button onClick={onNewEntryClickHandler}  className="py-1 px-2 mr-2 text-white flex items-center bg-blue-500 hover:shadow-lg active:scale-90 rounded-md transition duration-200 ease-out">
        Add New Entry
        <PlusIcon className="h-4 text-white ml-1" />
      </button>
    </header>
  );
}
