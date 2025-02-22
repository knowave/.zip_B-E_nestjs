import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { CreateUserBody } from './dto/request/create-user.req';
import { BaseException } from 'src/common/exceptions/error';
import { BAD_REQUEST_ERROR } from 'src/common/exceptions/error-code/bad-request.error';
import { UpdateUserBody } from './dto/request/update-user.req';
import { v4 as uuid } from 'uuid';

const mockUserRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOneById: jest.fn(),
    findOneByEmail: jest.fn(),
};

const existUser = {
    id: uuid(),
    email: 'exist@test.com',
    password: 'exist-password1',
    nickname: 'exist-user',
    imageUrl: 'https://test.com/exist.jpeg',
    region: '서울',
    createdAt: new Date(),
    updatedAt: new Date(),
};

describe('UserService', () => {
    let service: UserService;
    let repository: jest.Mocked<UserRepository>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: UserRepository,
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('createUser', () => {
        it('유저 생성 성공', async () => {
            const createUserDto: CreateUserBody = {
                email: 'test@test.com',
                password: 'test-password1',
                nickname: 'tester',
                imageUrl: 'https://test.com/image.jpeg',
                region: '서울',
                likeCount: 0,
            };

            mockUserRepository.findOneByEmail.mockResolvedValue(null);
            mockUserRepository.create.mockReturnValue(createUserDto);
            mockUserRepository.save.mockResolvedValue(createUserDto);

            const result = await service.createUser(createUserDto);

            expect(result).toEqual(undefined);
        });

        it('이메일이 중복되면 유저 생성 실패', async () => {
            const createUserDto: CreateUserBody = {
                email: 'test@test.com',
                password: 'test-password1',
                nickname: 'tester',
                imageUrl: 'https://test.com/image.jpeg',
                region: '서울',
                likeCount: 0,
            };

            mockUserRepository.findOneByEmail.mockResolvedValue(createUserDto);

            await expect(service.createUser(createUserDto)).rejects.toThrow(
                new BaseException(BAD_REQUEST_ERROR.ALREADY_EXIST_USER),
            );
        });
    });

    describe('updateUser', () => {
        console.log('update user test start');
        it('유저 정보 수정 성공', async () => {
            const updateUserDto: UpdateUserBody = {
                nickname: 'update-nickname',
                region: '경기',
                imageUrl: 'https://image.com/image.jpg',
            };

            mockUserRepository.findOneById.mockResolvedValue(existUser);
            mockUserRepository.save.mockResolvedValue(updateUserDto);

            const result = await service.updateUser(updateUserDto, existUser.id);

            expect(result).toEqual(undefined);
        });

        it('유저 본인이 사용하던 닉네임으로 변경하려고 하면 수정 실패', async () => {
            const updateUserDto: UpdateUserBody = {
                nickname: existUser.nickname,
                region: '경기',
                imageUrl: 'https://image.com/image.jpg',
            };

            mockUserRepository.findOneById.mockResolvedValue(existUser);

            //   console.log(await service.updateUser(updateUserDto, existUser.id));

            await expect(service.updateUser(updateUserDto, existUser.id)).rejects.toThrow(
                new BaseException({
                    ...BAD_REQUEST_ERROR.ALREADY_EXIST_NICKNAME,
                    message: updateUserDto.nickname,
                }),
            );
        });

        it('유저 본인이 사용하던 지역으로 변경하려고 하면 수정 실패', async () => {
            const updateUserDto: UpdateUserBody = {
                nickname: 'update-nickname1',
                region: existUser.region,
                imageUrl: 'https://image.com/image.jpg',
            };

            mockUserRepository.findOneById.mockResolvedValue(existUser);

            await expect(service.updateUser(updateUserDto, existUser.id)).rejects.toThrow(
                new BaseException({
                    ...BAD_REQUEST_ERROR.ALREADY_EXIST_REGION,
                    message: updateUserDto.region,
                }),
            );
        });
    });
});
