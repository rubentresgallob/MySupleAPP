import { PrismaService } from './prisma/prisma.service';
import type { Response } from 'express';
export declare class AppController {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    testFiles(): {
        publicPath: string;
        indexPath: string;
        publicExists: boolean;
        indexExists: boolean;
        publicContents: string[];
    };
    serveIndex(res: Response): void | Response<any, Record<string, any>>;
    initDemoData(): Promise<{
        message: string;
        credentials?: undefined;
    } | {
        message: string;
        credentials: {
            email: string;
            password: string;
        };
    }>;
}
