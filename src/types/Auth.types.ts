export interface ILogin {
  username: string;
  password: string;
}

export interface IAuthService {
  login(email: string, password: string): Promise<string>;
}

export interface UserPayload {
  username: string;
  email: string;
  birthdate: Date;
  id: string;
  rol: "user" | "admin" | "premium";
  first_name: string;
  last_name: string;
}
