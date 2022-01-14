import {Module} from '@nestjs/common';

import {AuthModule} from './auth/auth.module';
import {ControllersModule} from './controllers/controllers.module';
import {DbModule} from './db/db.module';
import {AppController} from './app.controller';

@Module({
  imports: [AuthModule, DbModule, ControllersModule],
  controllers: [AppController],
})
export class AppModule {}
