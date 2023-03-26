import React, { ReactNode } from 'react';
import { User } from '../dto/User';

type UserContextType = { users: User[]; addUser: (user: User) => void };

export const UsersContext = React.createContext<UserContextType>({} as UserContextType);

export class UserContextProvider extends React.Component<{ children: ReactNode }, UserContextType> {
  constructor(props: { children: ReactNode }) {
    super(props);

    this.state = {
      users: [],
      addUser: this.addUser,
    };
  }

  addUser = (user: User) => {
    this.setState((state) => {
      const users = state.users;
      users.push(user);
      return {
        users: users,
      };
    });
  };

  render() {
    return <UsersContext.Provider value={this.state}>{this.props.children}</UsersContext.Provider>;
  }
}

export default UserContextProvider;
