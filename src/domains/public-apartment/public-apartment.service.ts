import { Injectable } from '@nestjs/common';
import { PublicApartmentRepository } from './repositories/public-apartment.repository';
import { GetPublicApartmentListQuery } from './dto/request/get-public-apartment-list.req';
import { plainToInstance } from 'class-transformer';
import { GetPublicApartmentListResponse } from './dto/response/get-public-apartment-list.res';
import { UploadImageUrlListBody } from './dto/request/upload-image-url-list.req';
import { PublicApartmentImage } from './entities/public-apartment-image.entity';
import { PublicApartmentImageRepository } from './repositories/public-apartment-image.repository';
import { BaseException } from 'src/common/exceptions/error';
import { NOT_FOUND_ERROR } from 'src/common/exceptions/error-code/not-found.error';

@Injectable()
export class PublicApartmentService {
    constructor(
        private readonly publicApartmentRepository: PublicApartmentRepository,
        private readonly publicApartmentImageRepository: PublicApartmentImageRepository,
    ) {}

    async getPublicApartmentList({ page, take, supplyAreaName, startDate, endDate }: GetPublicApartmentListQuery) {
        const skip = (page - 1) * take;

        const [publicApartmentList, totalCount] = await this.publicApartmentRepository.findManyPagination({
            skip,
            take,
            supplyAreaName,
            startDate,
            endDate,
        });

        return plainToInstance(
            GetPublicApartmentListResponse,
            <GetPublicApartmentListResponse>{
                publicApartmentList,
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

    async uploadImageUrlList({ imageUrlList }: UploadImageUrlListBody) {
        const createPublicApartmentImageList: PublicApartmentImage[] = imageUrlList.map((imageUrl) => {
            return this.publicApartmentImageRepository.create({
                imageUrl,
            });
        });

        await this.publicApartmentImageRepository.bulkSave(createPublicApartmentImageList);
    }

    async getPublicApartmentById(id: string) {
        const publicApartment = await this.publicApartmentRepository.findOneById(id);

        if (!publicApartment) throw new BaseException(NOT_FOUND_ERROR.PUBLIC_APARTMENT);

        return publicApartment;
    }

    async incrementLikeCount(id: string) {
        await this.publicApartmentRepository.incrementLikeCount(id);
    }

    async decrementLikeCount(id: string) {
        await this.publicApartmentRepository.decrementLikeCount(id);
    }

    async incrementCommentCount(id: string) {
        await this.publicApartmentRepository.incrementCommentCount(id);
    }

    async decrementCommentCount(id: string) {
        await this.publicApartmentRepository.decrementCommentCount(id);
    }

    async incrementViewCount(id: string) {
        await this.publicApartmentRepository.incrementViewCount(id);
    }

    async decrementViewCount(id: string) {
        await this.publicApartmentRepository.decrementViewCount(id);
    }
}
