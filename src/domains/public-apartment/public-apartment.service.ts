import { Injectable } from '@nestjs/common';
import { PublicApartmentRepository } from './repositories/public-apartment.repository';
import { GetPublicApartmentListQuery } from './dto/request/get-public-apartment-list.req';
import { plainToInstance } from 'class-transformer';
import { GetPublicApartmentListResponse } from './dto/response/get-public-apartment-list.res';
import { UploadImageUrlListBody } from './dto/request/upload-image-url-list.req';
import { PublicApartmentImage } from './entities/public-apartment-image.entity';
import { PublicApartmentImageRepository } from './repositories/public-apartment-image.repository';

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

        return plainToInstance(GetPublicApartmentListResponse, <GetPublicApartmentListResponse>{
            publicApartmentList,
            currentPage: page,
            totalPage: Math.ceil(totalCount / take),
            totalCount,
        });
    }   

    async uploadImageUrlList({ imageUrlList }: UploadImageUrlListBody) {
        const createPublicApartmentImageList: PublicApartmentImage[] = imageUrlList.map((imageUrl) => {
            return this.publicApartmentImageRepository.create({
                imageUrl,
            });
        });

        await this.publicApartmentImageRepository.bulkSave(createPublicApartmentImageList);
    }
}
