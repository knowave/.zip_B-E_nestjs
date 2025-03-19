import { Controller, Get, Query } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetApartmentListQuery } from './dto/request/get-apartment-list.req';
import { GetApartmentListResponse } from './dto/response/get-apartment-list.res';

@ApiTags('apartment')
@Controller('apartment')
export class ApartmentController {
    constructor(private readonly apartmentService: ApartmentService) {}

    @Get()
    @ApiOperation({ summary: '아파트 공고 목록 조회' })
    @ApiQuery({ type: GetApartmentListQuery })
    @ApiResponse({ type: GetApartmentListResponse })
    async getApartmentList(@Query() query: GetApartmentListQuery) {
        return this.apartmentService.getApartmentList(query);
    }
}
