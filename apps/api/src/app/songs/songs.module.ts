import { Module } from '@nestjs/common';

import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

/** Songs feature. */
@Module({
    controllers: [SongsController],
    providers: [SongsService],
})
export class SongsModule {}
