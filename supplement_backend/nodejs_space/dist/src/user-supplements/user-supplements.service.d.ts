import { PrismaService } from '../prisma/prisma.service';
import { CreateUserSupplementDto } from './dto/create-user-supplement.dto';
import { UpdateUserSupplementDto } from './dto/update-user-supplement.dto';
export declare class UserSupplementsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreateUserSupplementDto): Promise<{
        supplement_database: {
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
        } | null;
    } & {
        created_at: Date;
        updated_at: Date;
        id: number;
        user_id: number;
        form: string;
        schedules: string[];
        active: boolean;
        custom_name: string | null;
        dosage_amount: number;
        dosage_unit: string;
        times_per_day: number;
        supplement_database_id: number | null;
    }>;
    findAll(userId: number): Promise<({
        supplement_database: {
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
        } | null;
    } & {
        created_at: Date;
        updated_at: Date;
        id: number;
        user_id: number;
        form: string;
        schedules: string[];
        active: boolean;
        custom_name: string | null;
        dosage_amount: number;
        dosage_unit: string;
        times_per_day: number;
        supplement_database_id: number | null;
    })[]>;
    findOne(userId: number, id: number): Promise<{
        supplement_database: {
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
        } | null;
    } & {
        created_at: Date;
        updated_at: Date;
        id: number;
        user_id: number;
        form: string;
        schedules: string[];
        active: boolean;
        custom_name: string | null;
        dosage_amount: number;
        dosage_unit: string;
        times_per_day: number;
        supplement_database_id: number | null;
    }>;
    update(userId: number, id: number, dto: UpdateUserSupplementDto): Promise<{
        supplement_database: {
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
        } | null;
    } & {
        created_at: Date;
        updated_at: Date;
        id: number;
        user_id: number;
        form: string;
        schedules: string[];
        active: boolean;
        custom_name: string | null;
        dosage_amount: number;
        dosage_unit: string;
        times_per_day: number;
        supplement_database_id: number | null;
    }>;
    remove(userId: number, id: number): Promise<{
        message: string;
    }>;
}
