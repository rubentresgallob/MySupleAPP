import { SupplementsService } from './supplements.service';
export declare class SupplementsController {
    private readonly supplementsService;
    private readonly logger;
    constructor(supplementsService: SupplementsService);
    findAll(page?: string, limit?: string): Promise<{
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
}
