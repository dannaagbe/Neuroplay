import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserRole } from '../users/user-role.enum';

@Injectable()
export class DocenteGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    if (user.rol !== UserRole.DOCENTE) {
      throw new ForbiddenException(
        'Solo los docentes pueden acceder a este recurso',
      );
    }

    return true;
  }
}
