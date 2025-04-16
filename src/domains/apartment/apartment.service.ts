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
import { Apartment } from './entities/apartment.entity';
import { RedisService } from '../redis/redis.service';
import { GetApartmentViewTopThreeResponse } from './dto/response/get-apartment-view-top-three.res';
import { GetApartmentByIdResponse, GetApartmentComment } from './dto/response/get-apartment-by-id.res';

@Injectable()
export class ApartmentService {
    private readonly cacheKey = 'apartment-view-top-ten';

    constructor(
        private readonly apartmentRepository: ApartmentRepository,
        private readonly apartmentImageRepository: ApartmentImageRepository,
        private readonly httpService: HttpService,
        private readonly redisService: RedisService
    ) {}

    async getApartmentList({ page, take, supplyAreaName, startDate, endDate }: GetApartmentListQuery) {
        const skip = (page - 1) * take;

        const [apartmentList, totalCount] = await this.apartmentRepository.findManyPagination({
            skip,
            take,
            supplyAreaName,
            startDate,
            endDate
        });

        return plainToInstance(
            GetApartmentListResponse,
            <GetApartmentListResponse>{
                apartmentList,
                currentPage: page,
                totalPage: Math.ceil(totalCount / take),
                totalCount
            },
            {
                excludeExtraneousValues: true,
                enableImplicitConversion: true
            }
        );
    }

    async uploadImageUrlList({ imageUrlList }: UploadImageUrlListBody) {
        const createApartmentImageList: ApartmentImage[] = imageUrlList.map(imageUrl => {
            return this.apartmentImageRepository.create({
                imageUrl
            });
        });

        await this.apartmentImageRepository.bulkSave(createApartmentImageList);
    }

    async getApartmentById(id: string) {
        const apartment = await this.apartmentRepository.findOneById(id);

        if (!apartment) throw new BaseException(NOT_FOUND_ERROR.APARTMENT);

        return plainToInstance(
            GetApartmentByIdResponse,
            <GetApartmentByIdResponse>{
                ...apartment,
                comments: apartment.comments.map(comment => {
                    return plainToInstance(GetApartmentComment, <GetApartmentComment>{
                        id: comment.id,
                        content: comment.content,
                        isPrivate: comment.isPrivate,
                        likeCount: comment.likeCount,
                        username: comment.user.nickname ?? comment.user.email,
                        createdAt: comment.createdAt,
                        updatedAt: comment.updatedAt
                    });
                })
            },
            {
                excludeExtraneousValues: true,
                enableImplicitConversion: true
            }
        );
    }

    async incrementLikeCount(id: string) {
        await this.redisService.del(this.cacheKey);
        await this.apartmentRepository.incrementLikeCount(id);
    }

    async decrementLikeCount(id: string) {
        await this.redisService.del(this.cacheKey);
        await this.apartmentRepository.decrementLikeCount(id);
    }

    async incrementCommentCount(id: string) {
        await this.redisService.del(this.cacheKey);
        await this.apartmentRepository.incrementCommentCount(id);
    }

    async decrementCommentCount(id: string) {
        await this.redisService.del(this.cacheKey);
        await this.apartmentRepository.decrementCommentCount(id);
    }

    async incrementViewCount(id: string) {
        await this.redisService.del(this.cacheKey);
        await this.apartmentRepository.incrementViewCount(id);
    }

    async decrementViewCount(id: string) {
        await this.redisService.del(this.cacheKey);
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
                headers: {}
            };

            const res = await this.httpService.axiosRef(options);
            const data = res.data.data;

            data.forEach(item => {
                createApartmentList.push(
                    this.apartmentRepository.create({
                        contractPeriod: item['계약기간'],
                        announcementName: item['공고명'],
                        announcementDate: item['공고일자'],
                        announcementType: item['공고종류'],
                        numberOfUnits: item['금회분양세대수'],
                        block: item['블록'],
                        businessDistrict: item['사업지구'],
                        isCapitalArea: item['수도권여부'] === '수도권' ? true : false,
                        monthlyRent: item['월임대료'],
                        leaseDeposit: item['임대보증금'],
                        housingType: item['주택형'],
                        regionalOffice: item['지역본부'],
                        totalHouseholds: item['총세대수']
                    })
                );
            });
        }

        await this.redisService.del(this.cacheKey);
        await this.apartmentRepository.bulkSave(createApartmentList);
    }

    async getApartmentViewTopThree() {
        const ttl = 60 * 60 * 24; // 24시간

        const cachedData = await this.redisService.get(this.cacheKey);

        if (cachedData) {
            return plainToInstance(
                GetApartmentViewTopThreeResponse,
                <GetApartmentViewTopThreeResponse>{
                    apartmentList: JSON.parse(cachedData)
                },
                {
                    excludeExtraneousValues: true,
                    enableImplicitConversion: true
                }
            );
        }

        const apartmentList = await this.apartmentRepository.getApartmentViewTopThree();
        await this.redisService.set(this.cacheKey, JSON.stringify(apartmentList), ttl);

        return plainToInstance(
            GetApartmentViewTopThreeResponse,
            <GetApartmentViewTopThreeResponse>{
                apartmentList
            },
            {
                excludeExtraneousValues: true,
                enableImplicitConversion: true
            }
        );
    }
}
