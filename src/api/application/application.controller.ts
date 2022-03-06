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
  ApplicationDto,
  CreateApplicationDto,
  UpdateApplicationDto,
} from './dto/application';
import { ApplicationService } from './application.service';

@Controller()
@ApiTags('Application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @ApiOperation({ summary: 'Get Applications' })
  @ApiOkResponse({
    description: 'Applications',
    type: ApplicationDto,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getApplications(): Promise<Array<ApplicationDto>> {
    const apps = await this.applicationService.getApplications();

    return apps.map((app) => new ApplicationDto(app));
  }

  @ApiOperation({ summary: 'Create new Application' })
  @ApiBody({ type: CreateApplicationDto })
  @ApiCreatedResponse({
    description: 'Created Application',
    type: ApplicationDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createApplication(
    @Body() body: CreateApplicationDto,
  ): Promise<ApplicationDto> {
    const app = await this.applicationService.createApplication(body);

    return new ApplicationDto(app);
  }

  @ApiOperation({ summary: 'Get Application ' })
  @ApiOkResponse({
    description: 'Application ',
    type: ApplicationDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Application  does not exist' })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getApplication(@Param('id', ParseUUIDPipe) id: string) {
    const app = await this.applicationService.getApplication({
      id,
    });

    return new ApplicationDto(app);
  }

  @ApiOperation({ summary: 'Delete Application ' })
  @ApiOkResponse({
    description: ' deleted',
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async deleteApplication(@Param('id', ParseUUIDPipe) id: string) {
    await this.applicationService.deleteApplication({ id });
  }

  @ApiOperation({ summary: 'Update Application ' })
  @ApiBody({ type: UpdateApplicationDto })
  @ApiOkResponse({
    description: 'Application  updated',
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  async updateApplication(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateApplicationDto,
  ) {
    await this.applicationService.updateApplication({ id, ...body });
  }
}
