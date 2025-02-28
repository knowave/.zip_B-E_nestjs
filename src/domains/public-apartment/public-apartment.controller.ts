import { Controller, Get, Query } from '@nestjs/common';
import { PublicApartmentService } from './public-apartment.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetPublicApartmentListQuery } from './dto/request/get-public-apartment-list.req';
import { GetPublicApartmentListResponse } from './dto/response/get-public-apartment-list.res';

@ApiTags('public-apartment')
@Controller('public-apartment')
export class PublicApartmentController {
    constructor(private readonly publicApartmentService: PublicApartmentService) {}

    @Get()
    @ApiOperation({ summary: '공영 아파트 공고 목록 조회' })
    @ApiQuery({ type: GetPublicApartmentListQuery })
    @ApiResponse({ type: GetPublicApartmentListResponse })
    async getPublicApartmentList(@Query() query: GetPublicApartmentListQuery) {
        return this.publicApartmentService.getPublicApartmentList(query);
    }
}
