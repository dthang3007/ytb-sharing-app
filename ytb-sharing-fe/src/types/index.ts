export interface VideoQuery {
  limit: number;
  cursor: number;
}

export interface Video {
  id: number;
  link: string;
  description: string;
  title: string;
  user: {
    email: string;
  };
}

export interface Signin {
  email: string;
  password: string;
}

export interface Signup extends Signin {
  name: string;
}

export interface AuthStoreState {
  auth: IAuth | null;
  setAuth: (auth: IAuth | null) => void;
}

export interface IAuth {
  accessToken: string;
  email: string;
}

export interface CreateVideoParams {
  title: string;
  description: string;
  link: string;
}

export interface INotifi {
  _id: string;
  nameSender: string;
  title: string;
  isReaded: boolean;
}

export interface NotiStore {
  count: number;
  noti: INotifi[];
  setNoti: (data: INotifi[]) => void;
}
