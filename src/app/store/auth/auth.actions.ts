import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  ATTEMPT_SIGN_UP = 'ATTEMPT_SIGN_UP',
  EP_SIGN_IN = 'EP_SIGN_IN',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  SET_TOKEN = 'SET_TOKEN',
  LOGOUT = 'LOGOUT',
  DELETE_USER = 'DELETE_USER',
  PERSISTED_SIGN_IN = 'PERSISTED_SIGN_IN',
  USER_REENTRY = 'USER_REENTRY'
}

export class SignIn implements Action {
  readonly type = AuthActionTypes.SIGN_IN;
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGN_UP;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class SetToken implements Action {
  readonly type = AuthActionTypes.SET_TOKEN;
  constructor(public token: string) {}
}

export class DeleteUser implements Action {
  readonly type = AuthActionTypes.DELETE_USER;
}

export class PersistedSignIn implements Action {
  readonly type = AuthActionTypes.PERSISTED_SIGN_IN;
  constructor(public token: string) {}
}

export class SignUpAttempt implements Action {
  readonly type = AuthActionTypes.ATTEMPT_SIGN_UP;
  constructor(public user: { username: string, password: string }) {}
}

export class EPSignIn implements Action {
  readonly type = AuthActionTypes.EP_SIGN_IN;
  constructor(public info: { username: string, password: string }) {}
}

export class UserReentry implements Action {
  readonly type = AuthActionTypes.USER_REENTRY;
  constructor(public user: any) {}
}

export type AuthActions =
SignIn |
SignUp |
Logout |
SetToken |
DeleteUser |
PersistedSignIn;