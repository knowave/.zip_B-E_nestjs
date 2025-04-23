import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Public()
    @Get('/health')
    getHealth(): string {
        return 'OK';
    }
}
