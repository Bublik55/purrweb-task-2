import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntityIds } from './utills';
@Injectable()
export class UserOwnerGuard extends AuthGuard('jwt') {
  constructor() {
    super({});
  }

  canActivate(context: ExecutionContext) {
    const userEntityIds = UserEntityIds(context);
    if (userEntityIds.entityID == userEntityIds.userID) {
      return true;
    } else throw new ForbiddenException('Forbidden operation for user');
  }
}
