import { LeaderboardService } from './leaderboard.service';
export declare class LeaderboardController {
    private readonly leaderboardService;
    private readonly logger;
    constructor(leaderboardService: LeaderboardService);
    getFriendsLeaderboard(req: any): Promise<{
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
    getAdherenceLeaderboard(req: any): Promise<{
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
