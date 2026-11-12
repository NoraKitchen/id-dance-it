import { Controller, Get } from '@nestjs/common';

import { LoggedInUser } from './decorators/logged-in-user.decorator';

/** Authentication endpoints. */
@Controller('auth')
export class AuthController {
    /** Returns the identity associated with the authenticated request. */
    @Get('current-user')
    getCurrentUser(@LoggedInUser() loggedInUser: LoggedInUser): LoggedInUser {
        return loggedInUser;
    }
}
