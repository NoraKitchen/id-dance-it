import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthController } from './auth.controller';
import { DevIdentityService } from './dev-identity/dev-identity.service';
import { AuthenticationGuard } from './guards/authentication.guard';

@Module({
    controllers: [AuthController],
    providers: [
        DevIdentityService,
        {
            provide: APP_GUARD,
            useClass: AuthenticationGuard,
        },
    ],
})
export class AuthModule {}
