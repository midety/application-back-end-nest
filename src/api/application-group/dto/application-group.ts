import {
  ApiProperty,
  ApiPropertyOptional,
  ApiPropertyOptions,
} from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  MinLength,
  Max,
  IsOptional,
  Min,
} from 'class-validator';
import { ApplicationGroup, Pagination } from '../application-group.type';

export class CreateApplicationGroupDto implements Omit<ApplicationGroup, 'id'> {
  @ApiPropertyOptional({
    required: true,
    minLength: 3,
    example: 'Group1',
  })
  @IsOptional()
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

  @ApiPropertyOptional({
    example: 'Group1',
  })
  public readonly name: string;

  constructor(partial: Partial<ApplicationGroupDto>) {
    Object.assign(this, partial);
  }
}

export class PaginationApplicationGroupDto implements Pagination {
  @ApiProperty({
    required: true,
    minimum: 1,
    maximum: 50,
    example: '1',
  })
  @IsNumber()
  @Min(1)
  @Max(50)
  public readonly page: number;

  @ApiPropertyOptional({
    required: true,
    minimum: 1,
    maximum: 10,
    example: '1',
  })
  @IsNumber()
  @Min(1)
  @Max(10)
  public readonly perPage: number;
}
