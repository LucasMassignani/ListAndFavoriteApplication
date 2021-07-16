import ISignInCredentials from './ISignInCredentials';
import IUser from './IUser';

export default interface IAuthContextData {
  user: IUser;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): void;
}
