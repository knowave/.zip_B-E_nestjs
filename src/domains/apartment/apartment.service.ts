import { Injectable } from '@nestjs/common';
import { GetApartmentListQuery } from './dto/request/get-apartment-list.req';
import { plainToInstance } from 'class-transformer';
import { UploadImageUrlListBody } from './dto/request/upload-image-url-list.req';
import { BaseException } from 'src/common/exceptions/error';
import { NOT_FOUND_ERROR } from 'src/common/exceptions/error-code/not-found.error';
import { format, subDays } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { HttpService } from '@nestjs/axios';
import { BAD_REQUEST_ERROR } from 'src/common/exceptions/error-code/bad-request.error';
import { PUB_API_SECRET_KEY } from 'src/common/env';
import { GetApartmentListResponse } from './dto/response/get-apartment-list.res';
import { ApartmentRepository } from './repositories/apartment.repository';
import { ApartmentImageRepository } from './repositories/apartment-image.repository';
import { ApartmentImage } from './entities/apartment-image.entity';

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

    async createPublicApartmentList() {
        const UATC_list = ['06', '39', '05'];

        const now = new Date();
        const koreaTime = toZonedTime(now, 'Asia/Seoul');
        const yesterday = format(subDays(koreaTime, 1), 'yyyy-MM-dd');

        for (const UATC of UATC_list) {
            const options = {
                method: 'GET',
                url: `http://apis.data.go.kr/B552555/lhLeaseNoticeInfo1/lhLeaseNoticeInfo1?serviceKey=${PUB_API_SECRET_KEY}&PG_SZ=300&PAGE=1&PAN_ST_DT=${yesterday}&UPP_AIS_TP_CD=${UATC_list[UATC]}`,
                headers: {},
            };

            const res = await this.httpService.axiosRef(options);
            // res.data.pipe();
        }
    }
}
