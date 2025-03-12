import { compareSync, hashSync } from "bcryptjs";

export const hash = (password: string) => {
  return hashSync(password);
}

export const compare = (password: string, hashed: string): boolean => {
  return compareSync(password, hashed);
}

