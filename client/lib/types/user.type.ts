export interface IUser {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: string;
  is_active: boolean;
  last_login: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface ILoginResponse {
  data: {
    access_token: string;
    refresh_token: string;
    user: {
      _id: string;
      email: string;
      role: string;
      first_name: string;
      last_name: string;
      avatar?: string;
    };
    tenant: { _id: string; name: string };
  };
}
