import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';

/** Identity of the logged-in user. */
export interface LoggedInUser {
    readonly id: string;
    readonly displayName: string;
}

/** HTTP request carrying the logged-in user. */
export interface AuthenticatedRequest {
    headers: Readonly<Record<string, string | string[] | undefined>>;
    currentUser?: LoggedInUser;
}

/**
 * Returns the logged-in user attached by the authentication guard.
 * Controllers use this instead of reading authentication headers.
 */
export const LoggedInUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext): LoggedInUser => {
        const request = context
            .switchToHttp()
            .getRequest<AuthenticatedRequest>();

        if (!request.currentUser) {
            throw new UnauthorizedException();
        }

        return request.currentUser;
    },
);
