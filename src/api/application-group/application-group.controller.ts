import {
  Body,
  Get,
  Controller,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Post,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import {
  ApplicationGroupDto,
  CreateApplicationGroupDto,
  UpdateApplicationGroupDto,
  GetApplicationGroupsQueryDto,
} from './dto/application-group';
import { ApplicationGroupService } from './application-group.service';

@Controller()
@ApiTags('Application Group')
export class ApplicationGroupController {
  constructor(
    private readonly applicationGroupService: ApplicationGroupService,
  ) {}

  @ApiOperation({ summary: 'Get Application groups' })
  @ApiOkResponse({
    description: 'Application groups',
    type: ApplicationGroupDto,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getApplicationGroups(
    @Query() query: GetApplicationGroupsQueryDto,
  ): Promise<Array<ApplicationGroupDto>> {
    const groups = await this.applicationGroupService.getApplicationGroups(
      query,
    );

    return groups.map((group) => new ApplicationGroupDto(group));
  }

  @ApiOperation({ summary: 'Create new Application group' })
  @ApiBody({ type: CreateApplicationGroupDto })
  @ApiCreatedResponse({
    description: 'Created ApplicationGroup',
    type: ApplicationGroupDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createApplicationGroup(
    @Body() body: CreateApplicationGroupDto,
  ): Promise<ApplicationGroupDto> {
    const group = await this.applicationGroupService.createApplicationGroup(
      body,
    );

    return new ApplicationGroupDto(group);
  }

  @ApiOperation({ summary: 'Get Application group' })
  @ApiOkResponse({
    description: 'Application group',
    type: ApplicationGroupDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Application Group does not exist' })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getApplicationGroup(@Param('id', ParseUUIDPipe) id: string) {
    const group = await this.applicationGroupService.getApplicationGroup({
      id,
    });

    return new ApplicationGroupDto(group);
  }

  @ApiOperation({ summary: 'Delete Application group' })
  @ApiOkResponse({
    description: 'Group deleted',
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async deleteApplicationGroup(@Param('id', ParseUUIDPipe) id: string) {
    await this.applicationGroupService.deleteApplicationGroup({ id });
  }

  @ApiOperation({ summary: 'Update Application group' })
  @ApiBody({ type: UpdateApplicationGroupDto })
  @ApiOkResponse({
    description: 'Application group updated',
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  async updateApplicationGroup(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateApplicationGroupDto,
  ) {
    await this.applicationGroupService.updateApplicationGroup({ id, ...body });
  }
}
