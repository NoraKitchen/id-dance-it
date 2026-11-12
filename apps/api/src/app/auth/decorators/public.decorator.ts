import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/** Allows a route or controller to be called without authentication. */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
