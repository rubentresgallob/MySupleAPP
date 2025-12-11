import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            username: string;
            created_at: Date;
        };
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            username: string;
            created_at: Date;
        };
    }>;
    getProfile(req: any): Promise<{
        created_at: Date;
        updated_at: Date;
        id: number;
        email: string;
        username: string;
    } | null>;
}
