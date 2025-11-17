export interface IUser {
  name?: string;
  email: string;
  phone?: string;
  password: string;
  avatar?: string;
  is_active?: boolean;
  role: 'admin' | 'user';
  last_login?: Date;
}
