import { User } from "../entities/users/user";

export type PropsUser = {
  id?: number;
  name: string;
  email: string;
  active: boolean;
  password: string;
  confirmPassword?: string;
  createAt?: Date;
  updateAt?: Date;
  deleted?: boolean
};

export type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type CreateUserResponse = User;
