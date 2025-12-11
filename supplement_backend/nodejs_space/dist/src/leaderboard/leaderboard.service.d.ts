import { PrismaService } from '../prisma/prisma.service';
import { StreaksService } from '../streaks/streaks.service';
export declare class LeaderboardService {
    private prisma;
    private streaksService;
    private readonly logger;
    constructor(prisma: PrismaService, streaksService: StreaksService);
    getFriendsLeaderboard(userId: number): Promise<{
        leaderboard: {
            userId: number;
            username: string | undefined;
            currentStreak: number;
            longestStreak: number;
            isCurrentUser: boolean;
            rank: number;
        }[];
        totalUsers: number;
    }>;
    getAdherenceLeaderboard(userId: number): Promise<{
        leaderboard: {
            userId: number;
            username: string | undefined;
            adherencePercent: number;
            intakesTaken: number;
            intakesExpected: number;
            activeSupplements: number;
            isCurrentUser: boolean;
            rank: number;
        }[];
        totalUsers: number;
        period: string;
    }>;
}
