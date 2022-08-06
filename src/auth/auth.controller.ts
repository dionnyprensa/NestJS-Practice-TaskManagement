import { Body, Controller, Post, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredenntialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Post("/signup")
  signUp(@Body() authCredentialsDTO: AuthCredenntialsDTO): Promise<void> {
    return this.authService.signUp(authCredentialsDTO);
  }

  @Post("/signin")
  signIn(@Body() authCredentialsDTO: AuthCredenntialsDTO): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDTO);
  }
}
