import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRole } from '../users/user-role.enum';

export const GetUserRole = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserRole => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.rol;
  },
);