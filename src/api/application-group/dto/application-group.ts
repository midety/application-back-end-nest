import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional } from 'class-validator';
import { ApplicationGroup } from '../application-group.type';

export class CreateApplicationGroupDto implements Omit<ApplicationGroup, 'id'> {
  @ApiProperty({
    required: true,
    minLength: 3,
    example: 'Group1',
  })
  @IsString()
  @MinLength(3)
  public readonly name: string;
}

export class UpdateApplicationGroupDto
  implements Partial<Omit<ApplicationGroup, 'id'>>
{
  @ApiPropertyOptional({
    required: true,
    minLength: 3,
    example: 'Group1',
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  public readonly name?: string;
}

export class ApplicationGroupDto implements ApplicationGroup {
  @ApiProperty({
    example: 'c58f025f-21a2-41a0-b71e-684a9eeed59b',
  })
  public readonly id: string;

  @ApiProperty({
    example: 'Group1',
  })
  public readonly name: string;

  constructor(partial: Partial<ApplicationGroupDto>) {
    Object.assign(this, partial);
  }
}
