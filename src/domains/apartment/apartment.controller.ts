import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApartmentService } from './apartment.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetApartmentListQuery } from './dto/request/get-apartment-list.req';
import { GetApartmentListResponse } from './dto/response/get-apartment-list.res';
import { GetApartmentViewTopThreeResponse } from './dto/response/get-apartment-view-top-three.res';
import { Public } from 'src/common/decorators/public.decorator';
import { GetApartmentByIdResponse } from './dto/response/get-apartment-by-id.res';
import { GetApartmentPopularSearchKeywordResponse } from './dto/response/get-apartment-popular-search-keyword.res';
import { InsertApartmentKeywordBody } from './dto/request/insert-apartment-keyword.req';

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

    @Post('view-count/:id')
    @ApiOperation({ summary: '아파트 조회 수 증가' })
    async incrementViewCount(@Param('id') id: string) {
        return this.apartmentService.incrementViewCount(id);
    }

    @Public()
    @Get('top-three')
    @ApiOperation({ summary: '조회수 상위 3개 아파트 조회' })
    @ApiResponse({ type: GetApartmentViewTopThreeResponse })
    async getApartmentViewTopThree() {
        return this.apartmentService.getApartmentViewTopThree();
    }

    @Public()
    @Get('popular-search-keyword')
    @ApiResponse({ type: [GetApartmentPopularSearchKeywordResponse] })
    @ApiOperation({ summary: '아파트 인기 검색어 조회' })
    async getApartmentPopularSearchKeyword() {
        return this.apartmentService.getApartmentPopularSearchKeyword();
    }

    @Public()
    @Get(':id')
    @ApiOperation({ summary: '아파트 상세 조회' })
    @ApiResponse({ type: GetApartmentByIdResponse })
    async getApartmentById(@Param('id') id: string) {
        return this.apartmentService.getApartmentById(id);
    }

    @Public()
    @Post('popular-search-keyword')
    @ApiOperation({ summary: '아파트 인기 검색어 저장' })
    async insertApartmentKeyword(@Body() body: InsertApartmentKeywordBody) {
        return this.apartmentService.insertApartmentKeyword(body);
    }
}
