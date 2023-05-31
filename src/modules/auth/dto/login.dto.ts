import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

class LoginDto {
  @ApiProperty({
    description: `User's email`,
    example: 'john.doe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: `User's password`,
    example: 'aab123456',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export default LoginDto;
