import { PrismaService } from '../prisma/prisma.service';
export declare class StreaksService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getUserStreak(userId: number): Promise<{
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
    getSupplementStreak(userId: number, supplementId: number): Promise<{
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
    private calculateGlobalStreak;
    private calculateSupplementStreak;
    private isDayCompleteForUser;
    private isDayCompleteForSupplement;
    private calculateLongestStreak;
    private calculateLongestStreakForSupplement;
}
