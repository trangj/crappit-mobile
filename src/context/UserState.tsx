import { AxiosResponse } from 'axios';
import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import Toast from 'react-native-toast-message';
import { User } from '../types/entities/user';
import { loadState, removeState, saveState } from '../asyncStorage';
import axios from '../axiosConfig';

type LoginProps = { username: string; password: string };
type RegisterProps = {
  username: string;
  email: string;
  password: string;
  password2: string;
};

type UserProviderProps = {
  user: User | null;
  fetching: boolean;
  logoutUser: () => Promise<void>;
  loginUser: (login: LoginProps) => Promise<AxiosResponse<any> | undefined>;
  registerUser: (
    register: RegisterProps
  ) => Promise<AxiosResponse<any> | undefined>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserProviderProps>({} as UserProviderProps);

// eslint-disable-next-line react/prop-types
export function UserProvider({ children }: any) {
  const [current_user, setUser] = useState<User | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        axios.defaults.headers.common.Cookie = await loadState('cookies');
        const res = await axios.get('/api/user/me');
        setUser(res.data.user);
        setFetching(false);
      } catch (err) {
        setFetching(false);
      }
    };
    fetchUser();
  }, []);

  async function logoutUser() {
    try {
      await axios.post('/api/user/logout');
      removeState('cookies');
      delete axios.defaults.headers.common.Cookie;
      setUser(null);
    } catch (err: any) {
      Toast.show({
        type: err.response.data.status.severity,
        text1: err.response.data.status.text,
      });
      throw err;
    }
  }

  async function loginUser(login: LoginProps) {
    try {
      const res = await axios.post('/api/user/login', login);
      saveState(res.headers['set-cookie'], 'cookies');
      axios.defaults.headers.common.Cookie = res.headers['set-cookie'] as any;
      setUser(res.data.user);
      return res;
    } catch (err: any) {
      Toast.show({
        type: err.response.data.status.severity,
        text2: err.response.data.status.text,
      });
      throw err;
    }
  }

  async function registerUser(register: RegisterProps) {
    try {
      const res = await axios.post('/api/user/register', register);
      saveState(res.headers['set-cookie'], 'cookies');
      axios.defaults.headers.common.Cookie = res.headers['set-cookie'] as any;
      setUser(res.data.user);
      return res;
    } catch (err: any) {
      Toast.show({
        type: err.response.data.status.severity,
        text2: err.response.data.status.text,
      });
      throw err;
    }
  }

  const value = useMemo(() => ({
    user: current_user,
    fetching,
    loginUser,
    logoutUser,
    registerUser,
    setUser,
  }), [current_user, fetching]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
