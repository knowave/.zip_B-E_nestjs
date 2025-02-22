import { PickType } from '@nestjs/swagger';
import { CreateUserBody } from './create-user.req';

export class UpdateUserBody extends PickType(CreateUserBody, ['nickname', 'region', 'imageUrl']) {}
