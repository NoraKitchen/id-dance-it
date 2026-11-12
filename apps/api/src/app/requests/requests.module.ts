import { Module } from '@nestjs/common';

import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';

/** Requests feature. */
@Module({
    controllers: [RequestsController],
    providers: [RequestsService],
})
export class RequestsModule {}
