import { Role } from "./types";

export const GUARD_ROUTES = {
  profil: [Role.ADMIN,Role.USER],
  test: [Role.ADMIN,Role.USER]
}