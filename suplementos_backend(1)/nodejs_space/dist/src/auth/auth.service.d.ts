import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService);
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
    getProfile(userId: number): Promise<{
        created_at: Date;
        updated_at: Date;
        id: number;
        email: string;
        username: string;
    } | null>;
    validateUser(email: string, password: string): Promise<any>;
}
