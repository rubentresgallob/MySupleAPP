import { IntakesService } from './intakes.service';
import { CreateIntakeDto } from './dto/create-intake.dto';
export declare class IntakesController {
    private readonly intakesService;
    private readonly logger;
    constructor(intakesService: IntakesService);
    create(req: any, createIntakeDto: CreateIntakeDto): Promise<{
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
    findAll(req: any, startDate?: string, endDate?: string, userSupplementId?: string): Promise<({
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
    getToday(req: any): Promise<({
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
    getDailyProgress(req: any): Promise<{
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
    getStats(req: any, supplementId: number): Promise<{
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
