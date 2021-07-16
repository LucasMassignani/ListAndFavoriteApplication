import IUser from './IUser';

export default interface IAuthState {
  token: string;
  user: IUser;
}
