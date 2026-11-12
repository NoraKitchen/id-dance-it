import { HttpInterceptorFn, type HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { DevUserSelectionService } from './dev-user-selection.service';

const API_PATH_PREFIX = '/api';

/**
 * Temporary development-only interceptor.
 * Attaches the selected mock user to our own /api requests.
 * Delete this directory when real authentication is implemented.
 */
export const devAuthInterceptor: HttpInterceptorFn = (request, next) => {
    if (!isOwnApiRequest(request)) {
        return next(request);
    }

    const devUserId = inject(DevUserSelectionService).selectedUser();
    if (!devUserId) {
        return next(request);
    }

    return next(
        request.clone({
            setHeaders: {
                'X-Dev-User': devUserId,
            },
        }),
    );
};

/** Matches relative and same-origin /api URLs, and skips external hosts. */
function isOwnApiRequest(request: HttpRequest<unknown>): boolean {
    const requestUrl = new URL(request.url, window.location.origin);
    if (requestUrl.origin !== window.location.origin) {
        return false;
    }

    return (
        requestUrl.pathname === API_PATH_PREFIX ||
        requestUrl.pathname.startsWith(`${API_PATH_PREFIX}/`)
    );
}
