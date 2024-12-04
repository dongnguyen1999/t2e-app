
export enum Pages {
  HOME = '/t2e-app/app/home',
  MISSIONS = '/t2e-app/app/missions',
  FRIENDS = '/t2e-app/app/friends',
  ROOT = '/t2e-app/',
  APP = '/t2e-app/app',
  FORBIDDEN = '/t2e-app/forbidden',
  ADMIN_MISSIONS = '/t2e-app/admin/missions',
  ADMIN_USERS = '/t2e-app/admin/users',
  ADMIN = '/t2e-app/admin',
  LOGIN = '/t2e-app/login',
  LOGOUT = '/t2e-app/logout',
}

export enum MissionFilterType {
  COMPLETED = 2,
  REMAINING = 1,
}

export enum BloodStatus {
  CHARGING = 'CHARGING',
  DRAINING = 'DRAINING',
  SPOILING = 'SPOILING',
}

export enum FormikAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}