import { Role } from "./types";

export const GUARD_ROUTES = {
  profil: {
    page:[Role.ADMIN,Role.USER]
  },
  test: {
    page:[Role.LEAD,Role.ADMIN]
  },
  projects: {
    page: [Role.ADMIN,Role.LEAD,Role.USER,Role.INTERN],
  },
  project: {
    page: [Role.ADMIN,Role.LEAD,Role.USER,Role.INTERN],
    actions: {
      create: [Role.ADMIN,Role.LEAD],
      delete: [Role.ADMIN,Role.LEAD],
      update: [Role.ADMIN,Role.LEAD, Role.USER],
    }
  },
  ticket: {
    page: [Role.ADMIN,Role.LEAD,Role.USER,Role.INTERN],
    actions: {
      create: [Role.ADMIN,Role.LEAD, Role.USER],
      delete: [Role.ADMIN,Role.LEAD],
      update: [Role.ADMIN,Role.LEAD,Role.USER],
    }
  },
}