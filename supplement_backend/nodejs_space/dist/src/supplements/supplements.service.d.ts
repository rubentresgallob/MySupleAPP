import { PrismaService } from '../prisma/prisma.service';
export declare class SupplementsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    findAll(page?: number, limit?: number): Promise<{
        data: {
            name: string;
            category: string;
            forms: string[];
            typical_dosage: string;
            functions: string[];
            benefits: string[];
            notes: string;
            created_at: Date;
            updated_at: Date;
            id: number;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        name: string;
        category: string;
        forms: string[];
        typical_dosage: string;
        functions: string[];
        benefits: string[];
        notes: string;
        created_at: Date;
        updated_at: Date;
        id: number;
    }>;
    search(query: string): Promise<{
        data: {
            name: string;
            category: string;
            forms: string[];
            typical_dosage: string;
            functions: string[];
            benefits: string[];
            notes: string;
            created_at: Date;
            updated_at: Date;
            id: number;
        }[];
        count: number;
    }>;
}
