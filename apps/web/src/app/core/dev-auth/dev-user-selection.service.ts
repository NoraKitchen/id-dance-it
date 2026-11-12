import { Injectable, signal } from '@angular/core';

import {
    DEV_USER_STORAGE_KEY,
    type DevUserId,
    readDevUserId,
} from './dev-user';

/**
 * Temporary development-only selection of a mock user.
 * Delete this directory when real authentication is implemented.
 */
@Injectable({
    providedIn: 'root',
})
export class DevUserSelectionService {
    private readonly selectedUserId = signal<DevUserId | null>(
        this.readStoredUser(),
    );

    /** The mock user selected for subsequent API requests, if any. */
    readonly selectedUser = this.selectedUserId.asReadonly();

    /** Stores a mock user and applies it to later requests. */
    selectUser(devUserId: DevUserId): void {
        localStorage.setItem(DEV_USER_STORAGE_KEY, devUserId);
        this.selectedUserId.set(devUserId);
    }

    /** Removes the mock user from application state and localStorage. */
    clearSelection(): void {
        localStorage.removeItem(DEV_USER_STORAGE_KEY);
        this.selectedUserId.set(null);
    }

    private readStoredUser(): DevUserId | null {
        const storedUser = readDevUserId(
            localStorage.getItem(DEV_USER_STORAGE_KEY),
        );
        if (storedUser) {
            return storedUser;
        }

        localStorage.removeItem(DEV_USER_STORAGE_KEY);
        return null;
    }
}
