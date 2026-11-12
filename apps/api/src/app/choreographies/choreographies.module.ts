import { Module } from '@nestjs/common';

import { ChoreographiesController } from './choreographies.controller';
import { ChoreographiesService } from './choreographies.service';

/** Choreographies feature. */
@Module({
    controllers: [ChoreographiesController],
    providers: [ChoreographiesService],
})
export class ChoreographiesModule {}
