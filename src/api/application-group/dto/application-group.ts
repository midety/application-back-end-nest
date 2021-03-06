import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  MinLength,
  Max,
  Min,
  IsOptional,
  IsEnum,
  IsIn,
} from 'class-validator';
import { ApplicationDto } from 'src/api/application/dto/application';
import {
  ApplicationGroup,
  Order,
  Pagination,
  Sort,
} from '../application-group.type';
import { Application } from 'src/api/application/application.type';

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

export class UpdateApplicationGroupDto implements Omit<ApplicationGroup, 'id'> {
  @ApiProperty({
    required: true,
    minLength: 3,
    example: 'Group1',
  })
  @IsString()
  @MinLength(3)
  public readonly name: string;
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

export class GetApplicationGroupsQueryDto
  implements Pagination, Sort<ApplicationGroup>
{
  @ApiProperty({
    required: true,
    minimum: 1,
    maximum: 50,
    example: 1,
  })
  @IsNumber()
  @Min(1)
  @Max(50)
  public readonly page: number;

  @ApiProperty({
    required: true,
    minimum: 1,
    maximum: 10,
    example: 1,
  })
  @IsNumber()
  @Min(1)
  @Max(10)
  public readonly perPage: number;

  @ApiPropertyOptional({
    example: Order.ASC,
    enum: Order,
  })
  @IsOptional()
  @IsEnum(Order)
  public readonly order?: Order;

  @ApiPropertyOptional({
    example: 'name',
    enum: ['id', 'name'],
  })
  @IsIn(['id', 'name'])
  @IsOptional()
  public readonly orderBy?: 'id' | 'name';
}

export class ApplicationGroupFullDto extends ApplicationGroupDto {
  @ApiProperty({
    type: ApplicationDto,
    isArray: true,
  })
  public readonly applications: Array<Application>;
}
