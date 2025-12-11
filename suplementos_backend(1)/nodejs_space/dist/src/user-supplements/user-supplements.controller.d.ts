import { UserSupplementsService } from './user-supplements.service';
import { CreateUserSupplementDto } from './dto/create-user-supplement.dto';
import { UpdateUserSupplementDto } from './dto/update-user-supplement.dto';
export declare class UserSupplementsController {
    private readonly userSupplementsService;
    private readonly logger;
    constructor(userSupplementsService: UserSupplementsService);
    create(req: any, createUserSupplementDto: CreateUserSupplementDto): Promise<{
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
    findAll(req: any): Promise<({
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
    findOne(req: any, id: number): Promise<{
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
    update(req: any, id: number, updateUserSupplementDto: UpdateUserSupplementDto): Promise<{
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
    remove(req: any, id: number): Promise<{
        message: string;
    }>;
}
