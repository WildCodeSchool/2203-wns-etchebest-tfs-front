import { Role } from "./types";

export const GUARD_ROUTES = {
  profil: {
    page:[Role.ADMIN,Role.DEV]
  },
  admin: {
    page:[Role.LEAD,Role.ADMIN]
  },
  projects: {
    page: [Role.ADMIN,Role.LEAD,Role.DEV,Role.INTERN],
  },
  project: {
    page: [Role.ADMIN,Role.LEAD,Role.DEV,Role.INTERN],
    actions: {
      create: [Role.ADMIN,Role.LEAD],
      delete: [Role.ADMIN,Role.LEAD],
      update: [Role.ADMIN,Role.LEAD, Role.DEV],
    }
  },
  ticket: {
    page: [Role.ADMIN,Role.LEAD,Role.DEV,Role.INTERN],
    actions: {
      create: [Role.ADMIN,Role.LEAD, Role.DEV],
      delete: [Role.ADMIN,Role.LEAD],
      update: [Role.ADMIN,Role.LEAD,Role.DEV],
    }
  },
}