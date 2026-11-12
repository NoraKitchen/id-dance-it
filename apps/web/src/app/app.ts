import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DEV_USER_IDS } from './core/dev-auth/dev-user';
import { DevUserSelectionService } from './core/dev-auth/dev-user-selection.service';
import { AuthService } from './services/auth.service';

@Component({
    imports: [RouterModule],
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    private readonly authService = inject(AuthService);
    private readonly devUserSelection = inject(DevUserSelectionService);

    /**
     * Temporary development-user label.
     * Remove with the development controls in the template.
     */
    protected readonly selectedDevUserLabel = computed(() => {
        const selectedUser = this.devUserSelection.selectedUser();
        if (selectedUser === DEV_USER_IDS.admin) {
            return 'Admin';
        }
        if (selectedUser === DEV_USER_IDS.dancer) {
            return 'Dancer';
        }
        return 'None (logged out)';
    });

    /** Temporary development control. Selects the admin mock user. */
    protected selectAdmin(): void {
        this.devUserSelection.selectUser(DEV_USER_IDS.admin);
    }

    /** Temporary development control. Selects the dancer mock user. */
    protected selectDancer(): void {
        this.devUserSelection.selectUser(DEV_USER_IDS.dancer);
    }

    /** Temporary development control. Clears the selected mock user. */
    protected clearSelectedDevUser(): void {
        this.devUserSelection.clearSelection();
    }

    /**
     * Temporary development control.
     * Loads the current user and writes the result to the console.
     */
    protected loadCurrentUser(): void {
        this.authService.getCurrentUser().subscribe({
            next: (currentUser) => {
                console.log(currentUser);
            },
            error: (error: unknown) => {
                console.error(error);
            },
        });
    }
}
