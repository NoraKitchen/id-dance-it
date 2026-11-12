import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ChoreographiesModule } from './choreographies/choreographies.module';
import { CommunitiesModule } from './communities/communities.module';
import { EventsModule } from './events/events.module';
import { RequestsModule } from './requests/requests.module';
import { SongsModule } from './songs/songs.module';
import { UsersModule } from './users/users.module';

/** Root module. Feature modules own their controllers and services. */
@Module({
    imports: [
        AuthModule,
        UsersModule,
        CommunitiesModule,
        EventsModule,
        RequestsModule,
        ChoreographiesModule,
        SongsModule,
    ],
})
export class AppModule {}
