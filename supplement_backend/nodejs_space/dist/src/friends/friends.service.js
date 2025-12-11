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
var FriendsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const streaks_service_1 = require("../streaks/streaks.service");
let FriendsService = FriendsService_1 = class FriendsService {
    prisma;
    streaksService;
    logger = new common_1.Logger(FriendsService_1.name);
    constructor(prisma, streaksService) {
        this.prisma = prisma;
        this.streaksService = streaksService;
    }
    async sendRequest(userId, identifier) {
        const targetUser = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: identifier }, { username: identifier }],
            },
        });
        if (!targetUser) {
            this.logger.warn(`User not found with identifier: ${identifier}`);
            throw new common_1.NotFoundException('User not found');
        }
        if (targetUser.id === userId) {
            throw new common_1.BadRequestException('Cannot send friend request to yourself');
        }
        const existingFriendship = await this.prisma.friendship.findFirst({
            where: {
                OR: [
                    { requester_id: userId, receiver_id: targetUser.id },
                    { requester_id: targetUser.id, receiver_id: userId },
                ],
            },
        });
        if (existingFriendship) {
            if (existingFriendship.status === 'accepted') {
                throw new common_1.BadRequestException('Already friends with this user');
            }
            if (existingFriendship.status === 'pending') {
                throw new common_1.BadRequestException('Friend request already pending');
            }
            const updated = await this.prisma.friendship.update({
                where: { id: existingFriendship.id },
                data: {
                    status: 'pending',
                    requester_id: userId,
                    receiver_id: targetUser.id,
                },
            });
            this.logger.log(`Friend request updated: ${userId} -> ${targetUser.id}`);
            return {
                message: 'Friend request sent',
                friendship: updated,
            };
        }
        const friendship = await this.prisma.friendship.create({
            data: {
                requester_id: userId,
                receiver_id: targetUser.id,
                status: 'pending',
            },
            include: {
                requester: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
                receiver: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                    },
                },
            },
        });
        this.logger.log(`Friend request sent: ${userId} -> ${targetUser.id}`);
        return {
            message: 'Friend request sent',
            friendship,
        };
    }
    async acceptRequest(userId, requestId) {
        const friendship = await this.prisma.friendship.findUnique({
            where: { id: requestId },
            include: {
                requester: {
                    select: { id: true, username: true, email: true },
                },
                receiver: {
                    select: { id: true, username: true, email: true },
                },
            },
        });
        if (!friendship) {
            this.logger.warn(`Friend request not found: ${requestId}`);
            throw new common_1.NotFoundException('Friend request not found');
        }
        if (friendship.receiver_id !== userId) {
            this.logger.warn(`User ${userId} attempted to accept request ${requestId} not addressed to them`);
            throw new common_1.ForbiddenException('You can only accept requests sent to you');
        }
        if (friendship.status !== 'pending') {
            throw new common_1.BadRequestException('Friend request is not pending');
        }
        const updated = await this.prisma.friendship.update({
            where: { id: requestId },
            data: { status: 'accepted' },
            include: {
                requester: {
                    select: { id: true, username: true, email: true },
                },
                receiver: {
                    select: { id: true, username: true, email: true },
                },
            },
        });
        this.logger.log(`Friend request accepted: ${requestId}`);
        return {
            message: 'Friend request accepted',
            friendship: updated,
        };
    }
    async rejectRequest(userId, requestId) {
        const friendship = await this.prisma.friendship.findUnique({
            where: { id: requestId },
        });
        if (!friendship) {
            this.logger.warn(`Friend request not found: ${requestId}`);
            throw new common_1.NotFoundException('Friend request not found');
        }
        if (friendship.receiver_id !== userId) {
            this.logger.warn(`User ${userId} attempted to reject request ${requestId} not addressed to them`);
            throw new common_1.ForbiddenException('You can only reject requests sent to you');
        }
        await this.prisma.friendship.update({
            where: { id: requestId },
            data: { status: 'rejected' },
        });
        this.logger.log(`Friend request rejected: ${requestId}`);
        return { message: 'Friend request rejected' };
    }
    async getFriends(userId) {
        const friendships = await this.prisma.friendship.findMany({
            where: {
                OR: [{ requester_id: userId }, { receiver_id: userId }],
                status: 'accepted',
            },
            include: {
                requester: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        created_at: true,
                    },
                },
                receiver: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        created_at: true,
                    },
                },
            },
        });
        const friends = friendships.map((friendship) => {
            const friend = friendship.requester_id === userId
                ? friendship.receiver
                : friendship.requester;
            return {
                friendshipId: friendship.id,
                friend,
                friendsSince: friendship.created_at,
            };
        });
        return friends;
    }
    async removeFriend(userId, friendId) {
        const friendship = await this.prisma.friendship.findFirst({
            where: {
                OR: [
                    { requester_id: userId, receiver_id: friendId },
                    { requester_id: friendId, receiver_id: userId },
                ],
                status: 'accepted',
            },
        });
        if (!friendship) {
            this.logger.warn(`Friendship not found between ${userId} and ${friendId}`);
            throw new common_1.NotFoundException('Friendship not found');
        }
        await this.prisma.friendship.delete({
            where: { id: friendship.id },
        });
        this.logger.log(`Friendship removed between ${userId} and ${friendId}`);
        return { message: 'Friend removed successfully' };
    }
    async getPendingRequests(userId) {
        const requests = await this.prisma.friendship.findMany({
            where: {
                receiver_id: userId,
                status: 'pending',
            },
            include: {
                requester: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        created_at: true,
                    },
                },
            },
            orderBy: { created_at: 'desc' },
        });
        return requests.map((request) => ({
            requestId: request.id,
            from: request.requester,
            receivedAt: request.created_at,
        }));
    }
    async getFriendProgress(userId, friendId) {
        const friendship = await this.prisma.friendship.findFirst({
            where: {
                OR: [
                    { requester_id: userId, receiver_id: friendId },
                    { requester_id: friendId, receiver_id: userId },
                ],
                status: 'accepted',
            },
        });
        if (!friendship) {
            this.logger.warn(`User ${userId} attempted to view progress of non-friend ${friendId}`);
            throw new common_1.ForbiddenException('Can only view progress of accepted friends');
        }
        const friend = await this.prisma.user.findUnique({
            where: { id: friendId },
            select: {
                id: true,
                username: true,
            },
        });
        if (!friend) {
            throw new common_1.NotFoundException('Friend not found');
        }
        const streak = await this.streaksService.getUserStreak(friendId);
        const activeSupplementsCount = await this.prisma.user_supplement.count({
            where: {
                user_id: friendId,
                active: true,
            },
        });
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const activeSupplements = await this.prisma.user_supplement.findMany({
            where: {
                user_id: friendId,
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
        const adherencePercent = totalExpected > 0 ? Math.round((totalTaken / totalExpected) * 100) : 0;
        return {
            user: friend,
            streak: {
                current: streak.current_streak,
                longest: streak.longest_streak,
            },
            activeSupplements: activeSupplementsCount,
            last30DaysAdherence: adherencePercent,
        };
    }
};
exports.FriendsService = FriendsService;
exports.FriendsService = FriendsService = FriendsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        streaks_service_1.StreaksService])
], FriendsService);
//# sourceMappingURL=friends.service.js.map