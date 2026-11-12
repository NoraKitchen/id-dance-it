import { Injectable, Logger, type OnModuleInit } from '@nestjs/common';

import type { AuthenticatedRequest, LoggedInUser } from '../logged-in-user';

const DEV_USER_HEADER = 'x-dev-user';
const PRODUCTION_NODE_ENV = 'production';

const DEV_USERS = new Map<string, LoggedInUser>([
    ['admin', { id: 'dev-joe', displayName: 'Admin Joe' }],
    ['dancer', { id: 'dev-jane', displayName: 'Dancer Jane' }],
]);

/**
 * Resolves development-only identities from the X-Dev-User header.
 * A real authentication mechanism can replace this service later.
 */
@Injectable()
export class DevIdentityService implements OnModuleInit {
    private readonly logger = new Logger(DevIdentityService.name);

    /** Logs whether mock authentication is active for this process. */
    onModuleInit(): void {
        if (this.isMockAuthenticationEnabled()) {
            this.logger.log(
                'Mock authentication is enabled. Send the X-Dev-User header to select a development user.',
            );
            return;
        }

        this.logger.log('Mock authentication is disabled.');
    }

    /**
     * Returns the development user for this request.
     * Returns undefined when mock authentication is off or the header is missing or unknown.
     */
    resolve(request: AuthenticatedRequest): LoggedInUser | undefined {
        if (!this.isMockAuthenticationEnabled()) {
            return undefined;
        }

        const devUserKey = this.readDevUserKey(request.headers);
        if (!devUserKey) {
            return undefined;
        }

        return this.findDevUser(devUserKey);
    }

    /** Mock authentication is available whenever the process is not in production. */
    private isMockAuthenticationEnabled(): boolean {
        return process.env.NODE_ENV !== PRODUCTION_NODE_ENV;
    }

    private readDevUserKey(
        headers: AuthenticatedRequest['headers'],
    ): string | undefined {
        const headerValue = headers[DEV_USER_HEADER];
        if (typeof headerValue !== 'string') {
            return undefined;
        }

        const devUserKey = headerValue.trim().toLowerCase();
        if (!devUserKey) {
            return undefined;
        }

        return devUserKey;
    }

    private findDevUser(devUserKey: string): LoggedInUser | undefined {
        const devUser = DEV_USERS.get(devUserKey);
        if (!devUser) {
            return undefined;
        }

        return {
            id: devUser.id,
            displayName: devUser.displayName,
        };
    }
}
