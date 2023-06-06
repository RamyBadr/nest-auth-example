import { RolesBuilder } from 'nest-access-control';
export enum AppRoles {
  REGULAR = 'regular',
  USER_MANAGE_OWN_USER = 'USER_MANAGE_OWN_USER',
  ADMIN_CREATE_ANY_USER = 'ADMIN_CREATE_ANY_USER',
  ADMIN_UPDATE_ANY_USER = 'ADMIN_UPDATE_ANY_USER'
}
export const accRoles: RolesBuilder = new RolesBuilder();
accRoles
  .grant(AppRoles.REGULAR) // define new or modify existing role. also takes an array.
  .createAny('user')
  .deleteOwn('user')
  .readOwn('user', ['email'])
  .updateOwn('user', ['email', 'password'])
  .grant(AppRoles.ADMIN_CREATE_ANY_USER) // switch to another role without breaking the chain
  .extend(AppRoles.REGULAR) // inherit role capabilities. also takes an array
  .updateAny('user', ['email']) // explicitly defined attributes
  .deleteAny('user');
