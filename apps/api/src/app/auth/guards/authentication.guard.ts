import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import type { AuthenticatedRequest } from '../logged-in-user';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { DevIdentityService } from '../dev-identity/dev-identity.service';

/**
 * Requires an authenticated identity on every route unless it is marked @Public().
 * The identity source is replaceable without changing domain controllers.
 */
@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly devIdentityService: DevIdentityService,
    ) {}

    /** Allows public routes and attaches the current user to protected requests. */
    canActivate(context: ExecutionContext): boolean {
        if (this.isPublicRoute(context)) {
            return true;
        }

        if (context.getType() !== 'http') {
            throw new UnauthorizedException();
        }

        const request = context
            .switchToHttp()
            .getRequest<AuthenticatedRequest>();
        const currentUser = this.devIdentityService.resolve(request);
        if (!currentUser) {
            throw new UnauthorizedException();
        }

        request.currentUser = currentUser;
        return true;
    }

    private isPublicRoute(context: ExecutionContext): boolean {
        return (
            this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
                context.getHandler(),
                context.getClass(),
            ]) === true
        );
    }
}
