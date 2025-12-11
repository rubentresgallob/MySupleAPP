import { StreaksService } from './streaks.service';
export declare class StreaksController {
    private readonly streaksService;
    private readonly logger;
    constructor(streaksService: StreaksService);
    getUserStreak(req: any): Promise<{
        current_streak: number;
        longest_streak: number;
        last_completed_date: null;
    } | {
        current_streak: number;
        longest_streak: number;
        last_completed_date: string;
    } | {
        current_streak: number;
        longest_streak: number;
        last_completed_date: null;
        message: string;
    }>;
    getSupplementStreak(req: any, id: number): Promise<{
        current_streak: number;
        longest_streak: number;
        last_completed_date: null;
        supplementId: number;
        supplementName: string | null;
    } | {
        current_streak: number;
        longest_streak: number;
        last_completed_date: string;
        supplementId: number;
        supplementName: string | null;
    }>;
}
