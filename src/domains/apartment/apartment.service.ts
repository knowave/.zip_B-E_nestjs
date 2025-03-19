import { Injectable } from '@nestjs/common';
import { GetApartmentListQuery } from './dto/request/get-apartment-list.req';
import { plainToInstance } from 'class-transformer';
import { UploadImageUrlListBody } from './dto/request/upload-image-url-list.req';
import { BaseException } from 'src/common/exceptions/error';
import { NOT_FOUND_ERROR } from 'src/common/exceptions/error-code/not-found.error';
import { HttpService } from '@nestjs/axios';
import { APT_API_SECRET_KEY } from 'src/common/env';
import { GetApartmentListResponse } from './dto/response/get-apartment-list.res';
import { ApartmentRepository } from './repositories/apartment.repository';
import { ApartmentImageRepository } from './repositories/apartment-image.repository';
import { ApartmentImage } from './entities/apartment-image.entity';
import { Cron } from '@nestjs/schedule';
import { Apartment } from './entities/apartment.entity';

@Injectable()
export class ApartmentService {
    constructor(
        private readonly apartmentRepository: ApartmentRepository,
        private readonly apartmentImageRepository: ApartmentImageRepository,
        private readonly httpService: HttpService,
    ) {}

    async getApartmentList({ page, take, supplyAreaName, startDate, endDate }: GetApartmentListQuery) {
        const skip = (page - 1) * take;

        const [apartmentList, totalCount] = await this.apartmentRepository.findManyPagination({
            skip,
            take,
            supplyAreaName,
            startDate,
            endDate,
        });

        return plainToInstance(
            GetApartmentListResponse,
            <GetApartmentListResponse>{
                apartmentList,
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
        const createApartmentImageList: ApartmentImage[] = imageUrlList.map((imageUrl) => {
            return this.apartmentImageRepository.create({
                imageUrl,
            });
        });

        await this.apartmentImageRepository.bulkSave(createApartmentImageList);
    }

    async getApartmentById(id: string) {
        const apartment = await this.apartmentRepository.findOneById(id);

        if (!apartment) throw new BaseException(NOT_FOUND_ERROR.APARTMENT);

        return apartment;
    }

    async incrementLikeCount(id: string) {
        await this.apartmentRepository.incrementLikeCount(id);
    }

    async decrementLikeCount(id: string) {
        await this.apartmentRepository.decrementLikeCount(id);
    }

    async incrementCommentCount(id: string) {
        await this.apartmentRepository.incrementCommentCount(id);
    }

    async decrementCommentCount(id: string) {
        await this.apartmentRepository.decrementCommentCount(id);
    }

    async incrementViewCount(id: string) {
        await this.apartmentRepository.incrementViewCount(id);
    }

    async decrementViewCount(id: string) {
        await this.apartmentRepository.decrementViewCount(id);
    }

    async createApartmentList() {
        const createApartmentList: Apartment[] = [];

        for (let i = 1; i <= 10; i++) {
            const page = i;
            const perPage = 10;
            const url = `https://api.odcloud.kr/api/15072462/v1/uddi:4f4e5a40-79d9-46a2-9139-82384b6af774?page=${page}&perPage=${perPage}&serviceKey=${APT_API_SECRET_KEY}`;

            const options = {
                method: 'GET',
                url,
                headers: {},
            };

            const res = await this.httpService.axiosRef(options);
            const data = res.data.data;

            data.forEach((item) => {
                createApartmentList.push(
                    this.apartmentRepository.create({
                        contractPeriod: item['계약기간'],
                        announcementName: item['공고명'],
                        announcementDate: item['공고일자'],
                        announcementType: item['공고종류'],
                        numberOfUnits: item['금회분양세대수'],
                        block: item['블록'],
                        businessDistrict: item['사업지구'],
                        isCapitalArea: item['수도권여부'],
                        monthlyRent: item['월임대료'],
                        leaseDeposit: item['임대보증금'],
                        housingType: item['주택형'],
                        regionalOffice: item['지역본부'],
                        totalHouseholds: item['총세대수'],
                    }),
                );
            });
        }

        await this.apartmentRepository.bulkSave(createApartmentList);
    }
}
