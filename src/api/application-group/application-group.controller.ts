import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
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
import { TagDto, CreateTagDto, UpdateTagDto } from './dto/tag';
import { ApplicationGroupService } from './application-group.service';

@Controller()
@ApiTags('Tag')
export class TagController {
  constructor(private readonly tagService: ApplicationGroupService) {}

  @ApiOperation({ summary: 'Get tags' })
  @ApiOkResponse({
    description: 'Tags',
    type: TagDto,
    isArray: true,
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getTags(): Promise<Array<TagDto>> {
    const tags = await this.tagService.getTags({});

    return tags.map((tag) => new TagDto(tag));
  }

  @ApiOperation({ summary: 'Create new tag' })
  @ApiBody({ type: CreateTagDto })
  @ApiCreatedResponse({
    description: 'Created tag',
    type: TagDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTag(@Body() body: CreateTagDto): Promise<TagDto> {
    const tag = await this.tagService.createTag(body);

    return new TagDto(tag);
  }

  @ApiOperation({ summary: 'Get tag' })
  @ApiOkResponse({
    description: 'Tag',
    type: TagDto,
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Tag does not exist' })
  @HttpCode(HttpStatus.OK)
  @Get('/:id')
  async getTag(@Param('id', ParseUUIDPipe) id: string) {
    const tag = await this.tagService.getTag({ id });

    return new TagDto(tag);
  }

  @ApiOperation({ summary: 'Delete tag' })
  @ApiOkResponse({
    description: 'Tag deleted',
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  async deleteTag(@Param('id', ParseUUIDPipe) id: string) {
    await this.tagService.deleteTag({ id });
  }

  @ApiOperation({ summary: 'Update tag' })
  @ApiBody({ type: UpdateTagDto })
  @ApiOkResponse({
    description: 'Tag updated',
  })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @HttpCode(HttpStatus.OK)
  @Put('/:id')
  async updateTag(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateTagDto,
  ) {
    await this.tagService.updateTag({ id, ...body });
  }
}
