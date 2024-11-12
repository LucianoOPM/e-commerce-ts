import bcrypt from "bcrypt";
import config from "../config/config";

export class CryptPassword {
  static hashPassword(password: string): string {
    return bcrypt.hashSync(password, Number(config.SALT_ROUNDS));
  }

  static comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
