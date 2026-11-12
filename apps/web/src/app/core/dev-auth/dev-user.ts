/**
 * Temporary development-only mock users.
 * Delete this directory when real authentication replaces the X-Dev-User header.
 */
export const DEV_USER_STORAGE_KEY = 'dev-auth.selected-user';

export const DEV_USER_IDS = {
    admin: 'admin',
    dancer: 'dancer',
} as const;

export type DevUserId = (typeof DEV_USER_IDS)[keyof typeof DEV_USER_IDS];

/** Returns the stored id when it is one of the known mock users. */
export function readDevUserId(storedValue: string | null): DevUserId | null {
    if (
        storedValue === DEV_USER_IDS.admin ||
        storedValue === DEV_USER_IDS.dancer
    ) {
        return storedValue;
    }

    return null;
}
