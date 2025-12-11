"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LeaderboardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const streaks_service_1 = require("../streaks/streaks.service");
let LeaderboardService = LeaderboardService_1 = class LeaderboardService {
    prisma;
    streaksService;
    logger = new common_1.Logger(LeaderboardService_1.name);
    constructor(prisma, streaksService) {
        this.prisma = prisma;
        this.streaksService = streaksService;
    }
    async getFriendsLeaderboard(userId) {
        const friendships = await this.prisma.friendship.findMany({
            where: {
                OR: [{ requester_id: userId }, { receiver_id: userId }],
                status: 'accepted',
            },
        });
        const friendIds = friendships.map((f) => f.requester_id === userId ? f.receiver_id : f.requester_id);
        const allUserIds = [userId, ...friendIds];
        const leaderboard = await Promise.all(allUserIds.map(async (id) => {
            const user = await this.prisma.user.findUnique({
                where: { id },
                select: { id: true, username: true },
            });
            const streak = await this.streaksService.getUserStreak(id);
            return {
                userId: id,
                username: user?.username,
                currentStreak: streak.current_streak,
                longestStreak: streak.longest_streak,
                isCurrentUser: id === userId,
            };
        }));
        leaderboard.sort((a, b) => {
            if (b.currentStreak !== a.currentStreak) {
                return b.currentStreak - a.currentStreak;
            }
            return b.longestStreak - a.longestStreak;
        });
        const rankedLeaderboard = leaderboard.map((entry, index) => ({
            rank: index + 1,
            ...entry,
        }));
        this.logger.log(`Friends leaderboard generated for user ${userId}: ${rankedLeaderboard.length} entries`);
        return {
            leaderboard: rankedLeaderboard,
            totalUsers: rankedLeaderboard.length,
        };
    }
    async getAdherenceLeaderboard(userId) {
        const friendships = await this.prisma.friendship.findMany({
            where: {
                OR: [{ requester_id: userId }, { receiver_id: userId }],
                status: 'accepted',
            },
        });
        const friendIds = friendships.map((f) => f.requester_id === userId ? f.receiver_id : f.requester_id);
        const allUserIds = [userId, ...friendIds];
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const leaderboard = await Promise.all(allUserIds.map(async (id) => {
            const user = await this.prisma.user.findUnique({
                where: { id },
                select: { id: true, username: true },
            });
            const activeSupplements = await this.prisma.user_supplement.findMany({
                where: {
                    user_id: id,
                    active: true,
                },
            });
            let totalExpected = 0;
            let totalTaken = 0;
            for (const supplement of activeSupplements) {
                const expectedFor30Days = 30 * supplement.times_per_day;
                totalExpected += expectedFor30Days;
                const intakeCount = await this.prisma.intake.count({
                    where: {
                        user_supplement_id: supplement.id,
                        taken_at: {
                            gte: thirtyDaysAgo,
                        },
                    },
                });
                totalTaken += intakeCount;
            }
            const adherencePercent = totalExpected > 0
                ? Math.round((totalTaken / totalExpected) * 100)
                : 0;
            return {
                userId: id,
                username: user?.username,
                adherencePercent,
                intakesTaken: totalTaken,
                intakesExpected: totalExpected,
                activeSupplements: activeSupplements.length,
                isCurrentUser: id === userId,
            };
        }));
        leaderboard.sort((a, b) => b.adherencePercent - a.adherencePercent);
        const rankedLeaderboard = leaderboard.map((entry, index) => ({
            rank: index + 1,
            ...entry,
        }));
        this.logger.log(`Adherence leaderboard generated for user ${userId}: ${rankedLeaderboard.length} entries`);
        return {
            leaderboard: rankedLeaderboard,
            totalUsers: rankedLeaderboard.length,
            period: 'Last 30 days',
        };
    }
};
exports.LeaderboardService = LeaderboardService;
exports.LeaderboardService = LeaderboardService = LeaderboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        streaks_service_1.StreaksService])
], LeaderboardService);
//# sourceMappingURL=leaderboard.service.js.map