import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateUserDto {
  @ApiProperty({
    description: `name`,
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: `email`,
    example: 'john@gmail.com',
  })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({
    description: `password`,
    example: 'asd12345',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export default CreateUserDto;
