import { Module } from '@nestjs/common';

import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';

/** Communities feature. */
@Module({
    controllers: [CommunitiesController],
    providers: [CommunitiesService],
})
export class CommunitiesModule {}
