import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema, CONFIG_KEYS } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.stage.${process.env.STAGE}`
      ],
      validationSchema: configValidationSchema
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get(CONFIG_KEYS.DATABASE_HOST),
        port: configService.get(CONFIG_KEYS.DATABASE_PORT),
        username: configService.get(CONFIG_KEYS.DATABASE_USERNAME),
        password: configService.get(CONFIG_KEYS.DATABASE_PASSWORD),
        database: configService.get(CONFIG_KEYS.DATABASE_NAME),
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
