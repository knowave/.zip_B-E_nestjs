import { Injectable } from '@nestjs/common';
import { PrivateApartmentRepository } from './repositories/private-apartment.repository';
import { PrivateApartmentImageRepository } from './repositories/private-apartment-image.repository';
import { GetPrivateApartmentListQuery } from './dto/request/get-private-apartment-list.req';
import { plainToInstance } from 'class-transformer';
import { GetPrivateApartmentListResponse } from './dto/response/get-private-apartment-list.res';

@Injectable()
export class PrivateApartmentService {
    constructor(
        private readonly privateApartmentRepository: PrivateApartmentRepository,
        private readonly privateApartmentImageRepository: PrivateApartmentImageRepository,
    ) {}

    async getPrivateApartmentList({ page, take, ...getPrivateApartmentListQuery }: GetPrivateApartmentListQuery) {
        const skip = (page - 1) * take;

        const [privateApartmentList, totalCount] = await this.privateApartmentRepository.findManyPagination({
            skip,
            take,
            ...getPrivateApartmentListQuery,
        });

        return plainToInstance(
            GetPrivateApartmentListResponse,
            <GetPrivateApartmentListResponse>{
                privateApartmentList,
                currentPage: page,
                totalPage: Math.ceil(totalCount / take),
                totalCount,
            },
            {
                excludeExtraneousValues: true,
                enableImplicitConversion: true,
            },
        );
    }
}
