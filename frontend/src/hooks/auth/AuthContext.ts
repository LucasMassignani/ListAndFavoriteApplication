import { createContext } from 'react';
import IAuthContextData from './interfaces/IAuthContextData';

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export default AuthContext;
