import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateUserDto {
  @ApiProperty({
    description: `name`,
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: `email`,
    example: 'john@gmail.com',
  })
  @IsOptional()
  @IsString()
  readonly email: string;

  @ApiProperty({
    description: `password`,
    example: 'asd12345',
  })
  @IsOptional()
  @IsString()
  readonly password: string;
}

export default UpdateUserDto;
