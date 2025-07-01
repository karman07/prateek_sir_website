export enum Roles {
  User = 'user',
  Admin = 'admin',
  SuperAdmin = 'superadmin',
}

import { SetMetadata } from '@nestjs/common';
export const RolesAllowed = (...roles: string[]) => SetMetadata('roles', roles);
