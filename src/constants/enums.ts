
export enum Pages {
  HOME = '/home',
  MISSIONS = '/missions',
  FRIENDS = '/friends',
  ROOT = '/',
  FORBIDDEN = '/forbidden',
  ADMIN_MISSIONS = '/admin/missions',
  ADMIN_USERS = '/admin/users',
  ADMIN = '/admin',
  LOGIN = '/login',
  LOGOUT = '/logout',
}

export enum MissionFilterType {
  COMPLETED = 'completed',
  REMAINING = 'remaining',
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