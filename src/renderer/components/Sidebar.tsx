import { ViewListIcon, HeartIcon, TrashIcon } from '@heroicons/react/outline';
export default function Sidebar(props: any) {
  return (
    <div className="bg-gray-50 h-screen border-r-2">
      <button
        className={`flex justify-start items-center py-2 px-1 w-full ${props.default ? 'bg-gray-200': ''}`}
      >
        <ViewListIcon className="h-4 pl-2 mr-1" />
        All Passkeys
      </button>
      <button className={`flex justify-start items-center py-2 px-1 w-full ${props.favorite ? 'bg-gray-200': ''}`}>
        <HeartIcon className="h-4 pl-2 mr-1" />
        Favorites
      </button>
      <button className={`flex justify-start items-center py-2 px-1 w-full ${props.trash ? 'bg-gray-200': ''}`}>
        <TrashIcon className="h-4 pl-2 mr-1" />
        Trash
      </button>
    </div>
  );
}
