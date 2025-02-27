import { Controller, Get, Query } from '@nestjs/common';
import { PrivateApartmentService } from './private-apartment.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { GetPrivateApartmentListQuery } from './dto/request/get-private-apartment-list.req';
import { GetPrivateApartmentListResponse } from './dto/response/get-private-apartment-list.res';

@Controller('private-apartment')
export class PrivateApartmentController {
    constructor(private readonly privateApartmentService: PrivateApartmentService) {}

    @Get()
    @ApiOperation({ summary: '민영 아파트 공고 목록 조회' })
    @ApiQuery({ type: GetPrivateApartmentListQuery })
    @ApiResponse({ type: GetPrivateApartmentListResponse })
    async getPrivateList(@Query() query: GetPrivateApartmentListQuery) {
        return this.privateApartmentService.getPrivateApartmentList(query);
    }
}
