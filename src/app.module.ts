import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthController } from './controllers/auth.controller';
import { DefaultController } from './controllers/default.controller';
import { FieldObserversController } from './controllers/field-observers.controller';
import { FieldsController } from './controllers/fields.controller';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { FieldObserverService } from './services/field-observer.service';
import { FieldService } from './services/field.service';
import { WeatherService } from './services/weather.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' }
    })
  ],
  controllers: [
    DefaultController,
    AuthController,
    FieldsController,
    FieldObserversController
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    AuthService,
    FieldService,
    FieldObserverService,
    WeatherService
  ]
})
export class AppModule {}
