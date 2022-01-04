import React, { useState } from 'react';

interface password  {
  name: string;
  username: string;
  url: string;
  password: string;
  note: string;
  favorite: boolean;
};

interface AppContextProviderProps {
  passwords?: password[];
  setPasswords: (passwords: password[]) => void;
  activePassword?: password;
  setActivePassword: (passwords: password) => void;
  accessToken: string,
  setAccessToken: (token: string) => void;
  validPassphrase: boolean,
  setValidPassphrase: (valid: boolean) => void;
  passphrase: string,
  setPassphrase: (passphrase: string) => void;
  modalActive: boolean;
  setModalActive: (modalActive: boolean) => void;
}


const AppContext = React.createContext<AppContextProviderProps | null>(null);

export function AppContextProvider(props: any) {
  const [passwords, setPasswords] = useState<password[]>([]);
  const [activePassword, setActivePassword] = useState<password>();
  const [accessToken, setAccessToken] = useState<string>();
  const [validPassphrase, setValidPassphrase] = useState<boolean>();
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [passphrase, setPassphrase] = useState<string>();
  // const [activePassword, setActivePassword] = useState(AppContextInitialValue.activePassword);
  
  const providerValue: AppContextProviderProps = {
    passwords,
    setPasswords,
    activePassword,
    setActivePassword,
    accessToken,
    setAccessToken,
    validPassphrase,
    setValidPassphrase,
    passphrase,
    setPassphrase,
    modalActive,
    setModalActive
  };

  return (
    <AppContext.Provider
      value={
        providerValue
      }
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
