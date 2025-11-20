export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  avatar?: string;
  email_verified?: boolean;
  is_active?: boolean;
  role: 'admin' | 'user';
  last_login?: Date;
}
