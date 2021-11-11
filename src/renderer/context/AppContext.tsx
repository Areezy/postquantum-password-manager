import React, { useState } from 'react';

type AppContextState = {
  name: string;
  username: string;
  url: string;
  password: string;
  note: string;
};

const AppContextInitialValue = {
  passwords: [
    {
      name: 'My Facebook Password',
      username: 'Lekan',
      url: 'www.facebook.com',
      password: '12345',
      note: 'This is my facebook account',
    },
    {
      name: 'My Twitter Password',
      username: 'Lekan',
      url: 'www.twitter.com',
      password: '12345',
      note: 'This is my twitter account',
    },
  ],
  setPasswords: (_passwords: AppContextState[]) => {},
  activePassword: {
    name: 'My Facebook Password',
    username: 'Lekan',
    url: 'www.facebook.com',
    password: '12345',
    note: 'This is my facebook account',
  },
  setActivePassword: (_passwords: AppContextState) => {},
};

const AppContext = React.createContext(AppContextInitialValue);

export function AppContextProvider(props: any) {
  const [passwords, setPasswords] = useState(AppContextInitialValue.passwords);
  const [activePassword, setActivePassword] = useState(AppContextInitialValue.activePassword);
  
  return (
    <AppContext.Provider
      value={{
        passwords: passwords,
        setPasswords: setPasswords,
        activePassword: activePassword,
        setActivePassword: setActivePassword
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
