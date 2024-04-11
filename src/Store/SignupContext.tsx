import React, {createContext, useReducer, useEffect, ReactNode} from 'react';
import * as Keychain from 'react-native-keychain';

interface User {
  username: string;
  password: string;
  email: string;
}

interface State {
  users: User[];
  isLoggedIn: boolean;
}

interface SignupProviderProps {
  children: ReactNode;
}

type Action =
  | {type: 'ADD_USER'; payload: User}
  | {type: 'FETCH_USERS'; payload: User[]}
  | {type: 'SET_LOGGED_IN'; payload: boolean};

const initialState: State = {
  users: [],
  isLoggedIn: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'FETCH_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'SET_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export const SignupContext = createContext<{
  state: State;
  addUser: (user: User) => Promise<void>;
  setLoggedIn: (value: boolean) => void;
}>({
  state: initialState,
  addUser: async () => {},
  setLoggedIn: () => {},
});

export const SignupProvider: React.FC<SignupProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addUser = async (user: User) => {
    try {
      const allCredentials = await Keychain.getGenericPassword();
      let userCredentials: string[] = [];
      if (allCredentials) {
        userCredentials = JSON.parse(allCredentials.password);
      }
      const newUserCredentials = JSON.stringify({
        username: user.username,
        password: user.password,
      });
      userCredentials.push(newUserCredentials);
      await Keychain.setGenericPassword(
        allCredentials.service,
        JSON.stringify(userCredentials),
      );
      dispatch({type: 'ADD_USER', payload: user});
    } catch (error) {
      console.error('Error adding user to Keychain:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const allCredentials = await Keychain.getGenericPassword();
      if (allCredentials) {
        const userCredentials: string[] = JSON.parse(allCredentials.password);
        const users: User[] = userCredentials.map(cred => {
          const {username, password} = JSON.parse(cred);
          return {username, password, email: ''};
        });
        dispatch({type: 'FETCH_USERS', payload: users});
      }
    } catch (error) {
      console.error('Error fetching users from Keychain:', error);
    }
  };

  const setLoggedIn = (value: boolean) => {
    dispatch({type: 'SET_LOGGED_IN', payload: value});
  };

  // Log users whenever state.users changes
  useEffect(() => {
    console.log('Users:', state.users);
  }, [state.users]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SignupContext.Provider value={{state, addUser, setLoggedIn}}>
      {children}
    </SignupContext.Provider>
  );
};
