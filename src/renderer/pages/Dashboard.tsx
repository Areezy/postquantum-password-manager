import Vault from 'renderer/components/Vault';
import Header from 'renderer/components/Header';
import Sidebar from 'renderer/components/Sidebar';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-4">
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
