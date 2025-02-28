import { Injectable } from '@nestjs/common';
import { PrivateApartmentRepository } from './repositories/private-apartment.repository';
import { PrivateApartmentImageRepository } from './repositories/private-apartment-image.repository';
import { GetPrivateApartmentListQuery } from './dto/request/get-private-apartment-list.req';
import { plainToInstance } from 'class-transformer';
import { GetPrivateApartmentListResponse } from './dto/response/get-private-apartment-list.res';
import { BaseException } from 'src/common/exceptions/error';
import { NOT_FOUND_ERROR } from 'src/common/exceptions/error-code/not-found.error';

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

    async getPrivateApartmentById(id: string) {
        const privateApartment = await this.privateApartmentRepository.findOneById(id);

        if (!privateApartment) throw new BaseException(NOT_FOUND_ERROR.PRIVATE_APARTMENT);

        return privateApartment;
    }

    async incrementLikeCount(id: string) {
        await this.privateApartmentRepository.incrementLikeCount(id);
    }

    async decrementLikeCount(id: string) {
        await this.privateApartmentRepository.decrementLikeCount(id);
    }

    async incrementCommentCount(id: string) {
        await this.privateApartmentRepository.incrementCommentCount(id);
    }

    async decrementCommentCount(id: string) {
        await this.privateApartmentRepository.decrementCommentCount(id);
    }

    async incrementViewCount(id: string) {
        await this.privateApartmentRepository.incrementViewCount(id);
    }

    async decrementViewCount(id: string) {
        await this.privateApartmentRepository.decrementViewCount(id);
    }
}
