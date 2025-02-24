import { Injectable } from '@nestjs/common';
import { PublicApartmentRepository } from './public-apartment.repository';
import { GetPublicApartmentListQuery } from './dto/request/get-public-apartment-list.req';
import { plainToInstance } from 'class-transformer';
import { GetPublicApartmentListResponse } from './dto/response/get-public-apartment-list.res';

@Injectable()
export class PublicApartmentService {
    constructor(private readonly publicApartmentRepository: PublicApartmentRepository) {}

    async getPublicApartmentList({ page, take, supplyAreaName, startDate, endDate }: GetPublicApartmentListQuery) {
        const skip = (page - 1) * take;

        const [publicApartmentList, totalCount] = await this.publicApartmentRepository.findManyPagination({
            skip,
            take,
            supplyAreaName,
            startDate,
            endDate,
        });

        return plainToInstance(GetPublicApartmentListResponse, <GetPublicApartmentListResponse>{
            publicApartmentList,
            currentPage: page,
            totalPage: Math.ceil(totalCount / take),
            totalCount,
        });
    }
}
