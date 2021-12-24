import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AuthModule} from './auth/auth.module';
import {DbModule} from './db/db.module';
import {ControllersModule} from './controllers/controllers.module';

@Module({
  imports: [AuthModule, DbModule, ControllersModule],
  controllers: [AppController],
})
export class AppModule {}
