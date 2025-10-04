import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { correo: string; password: string }) {
    if (!body || !body.correo || !body.password) {
      throw new BadRequestException('Correo y password son requeridos');
    }
    const user = await this.authService.validateUser(body.correo, body.password);
    if (!user) {
      return { message: 'Correo o password incorrectos' };
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: any) {
    if (!body || !body.correo || !body.password) {
      throw new BadRequestException('Correo y password son requeridos');
    }
    return this.authService.register(body);
  }
}
