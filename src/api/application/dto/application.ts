import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { Application } from '../application.type';

export class CreateApplicationDto implements Omit<Application, 'id'> {
  @ApiProperty({
    example: 'https://google.com',
  })
  @IsString()
  @MinLength(3)
  public readonly img: string;

  @ApiProperty({
    example: 'https://google.com',
  })
  @IsString()
  @MinLength(3)
  public readonly url: string;

  @ApiProperty({
    example: 'c58f025f-21a2-41a0-b71e-684a9eeed59b',
  })
  public readonly applicationGroupId: string;
}

export class UpdateApplicationDto implements Partial<Omit<Application, 'id'>> {
  @ApiProperty({
    example: 'https://google.com',
  })
  @IsString()
  @MinLength(3)
  public readonly img: string;

  @ApiProperty({
    example: 'https://google.com',
  })
  @IsString()
  @MinLength(3)
  public readonly url: string;

  @ApiProperty({
    example: 'c58f025f-21a2-41a0-b71e-684a9eeed59b',
  })
  public readonly applicationGroupId: string;
}

export class ApplicationDto implements Application {
  @ApiProperty({
    example: 'c58f025f-21a2-41a0-b71e-684a9eeed59b',
  })
  public readonly id: string;

  @ApiProperty({
    example: 'https://google.com',
  })
  @IsString()
  @MinLength(3)
  public readonly img: string;

  @ApiProperty({
    example: 'https://google.com',
  })
  @IsString()
  @MinLength(3)
  public readonly url: string;

  @ApiProperty({
    example: 'c58f025f-21a2-41a0-b71e-684a9eeed59b',
  })
  public readonly applicationGroupId: string;

  constructor(partial: Partial<ApplicationDto>) {
    Object.assign(this, partial);
  }
}
