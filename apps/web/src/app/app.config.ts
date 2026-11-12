import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    ApplicationConfig,
    isDevMode,
    provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { appRoutes } from './app.routes';
import { devAuthInterceptor } from './core/dev-auth/dev-auth.interceptor';

/**
 * Registers the temporary mock-auth interceptor only for development builds.
 * Remove this branch, and the core/dev-auth import, when real authentication is added.
 */
function provideApplicationHttpClient() {
    if (!isDevMode()) {
        return provideHttpClient();
    }

    return provideHttpClient(withInterceptors([devAuthInterceptor]));
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(appRoutes),
        provideApplicationHttpClient(),
    ],
};
