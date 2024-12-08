
export enum Pages {
  HOME = '/app/home',
  MISSIONS = '/app/missions',
  FRIENDS = '/app/friends',
  ROOT = '/',
  APP = '/app',
  FORBIDDEN = '/forbidden',
  ADMIN_MISSIONS = '/admin/missions',
  ADMIN_USERS = '/admin/users',
  ADMIN = '/admin',
  LOGIN = '/login',
  LOGOUT = '/logout',
  FRIEND_INVITATION = '/app/friend-invitation',
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

export const DIRECT_URL_INVITATION_MESSAGE = 'InvitationUrl';