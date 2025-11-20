import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfiguracionUsuarioModule } from './configuracion-usuario/configuracion-usuario.module';
import { EstadisticaUsuarioModule } from './estadistica-usuario/estadistica-usuario.module';
import { ActividadModule } from './actividad/actividad.module';
import { PreguntaModule } from './pregunta/pregunta.module';
import { SesionEntrenamientoModule } from './sesion-entrenamiento/sesion-entrenamiento.module';
import { ResultadoActividadModule } from './resultado-actividad/resultado-actividad.module';
import { TipoActividadModule } from './actividad/tipo-actividad/tipo-actividad.module';
import { NivelDificultadModule } from './nivel-dificultad/nivel-dificultad.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'neuroplay',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
    ConfiguracionUsuarioModule,
    EstadisticaUsuarioModule,
    ActividadModule,
    TipoActividadModule,
    PreguntaModule,
    SesionEntrenamientoModule,
    ResultadoActividadModule,
    NivelDificultadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
