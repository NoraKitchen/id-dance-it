import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/** Identity returned by the authentication API. */
export interface CurrentUser {
    readonly id: string;
    readonly displayName: string;
}

/**
 * Loads the authenticated user.
 */
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly http = inject(HttpClient);

    getCurrentUser(): Observable<CurrentUser> {
        return this.http.get<CurrentUser>('/api/auth/current-user');
    }
}
