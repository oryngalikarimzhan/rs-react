import React, { ReactNode, useState } from 'react';

import { User } from 'models/index';

type UserContextType = { users: User[]; addUser: (user: User) => void };

const UsersContext = React.createContext<UserContextType>({} as UserContextType);

function UsersContextProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState([] as User[]);

  const addUser = (user: User) => setUsers([...users, user]);

  return <UsersContext.Provider value={{ users, addUser }}>{children}</UsersContext.Provider>;
}

export { UsersContext, UsersContextProvider };
