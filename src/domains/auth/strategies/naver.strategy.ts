import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { AuthService } from '../auth.service';
import { NAVER_CALLBACK_URL, NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } from 'src/common/env';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
    constructor(private readonly authService: AuthService) {
        super({
            clientID: NAVER_CLIENT_ID,
            callbackURL: NAVER_CALLBACK_URL,
            clientSecret: NAVER_CLIENT_SECRET,
        });
    }

    async validate(profile: any) {
        const naverId = profile.id;
        const email = profile.email && profile.emails[0]?.value;

        const user = await this.authService.validateNaver(naverId);

        if (!user) return { naverId, email, type: 'naver' };

        return { user, type: 'naver' };
    }
}
