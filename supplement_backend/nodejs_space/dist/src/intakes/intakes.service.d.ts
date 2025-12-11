import { PrismaService } from '../prisma/prisma.service';
import { CreateIntakeDto } from './dto/create-intake.dto';
export declare class IntakesService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreateIntakeDto): Promise<{
        user_supplement: {
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
        };
    } & {
        created_at: Date;
        id: number;
        user_id: number;
        taken_at: Date;
        user_supplement_id: number;
    }>;
    findAll(userId: number, startDate?: string, endDate?: string, userSupplementId?: number): Promise<({
        user_supplement: {
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
        };
    } & {
        created_at: Date;
        id: number;
        user_id: number;
        taken_at: Date;
        user_supplement_id: number;
    })[]>;
    getToday(userId: number): Promise<({
        user_supplement: {
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
        };
    } & {
        created_at: Date;
        id: number;
        user_id: number;
        taken_at: Date;
        user_supplement_id: number;
    })[]>;
    getDailyProgress(userId: number): Promise<{
        date: string;
        supplements: {
            supplementId: number;
            supplementName: string | null;
            takenToday: number;
            shouldTake: number;
            percentComplete: number;
            isComplete: boolean;
            schedules: string[];
        }[];
        summary: {
            totalActive: number;
            totalComplete: number;
            overallPercentComplete: number;
        };
    }>;
    getSupplementStats(userId: number, supplementId: number): Promise<{
        supplementId: number;
        supplementName: string | null;
        totalIntakes: number;
        firstIntake: Date;
        lastIntake: Date;
        last30Days: {
            intakes: number;
            expected: number;
            adherencePercent: number;
        };
    }>;
}
