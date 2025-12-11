import { PrismaService } from '../prisma/prisma.service';
import { StreaksService } from '../streaks/streaks.service';
export declare class FriendsService {
    private prisma;
    private streaksService;
    private readonly logger;
    constructor(prisma: PrismaService, streaksService: StreaksService);
    sendRequest(userId: number, identifier: string): Promise<{
        message: string;
        friendship: {
            created_at: Date;
            updated_at: Date;
            id: number;
            requester_id: number;
            receiver_id: number;
            status: string;
        };
    }>;
    acceptRequest(userId: number, requestId: number): Promise<{
        message: string;
        friendship: {
            requester: {
                id: number;
                email: string;
                username: string;
            };
            receiver: {
                id: number;
                email: string;
                username: string;
            };
        } & {
            created_at: Date;
            updated_at: Date;
            id: number;
            requester_id: number;
            receiver_id: number;
            status: string;
        };
    }>;
    rejectRequest(userId: number, requestId: number): Promise<{
        message: string;
    }>;
    getFriends(userId: number): Promise<{
        friendshipId: number;
        friend: {
            created_at: Date;
            id: number;
            email: string;
            username: string;
        };
        friendsSince: Date;
    }[]>;
    removeFriend(userId: number, friendId: number): Promise<{
        message: string;
    }>;
    getPendingRequests(userId: number): Promise<{
        requestId: number;
        from: {
            created_at: Date;
            id: number;
            email: string;
            username: string;
        };
        receivedAt: Date;
    }[]>;
    getFriendProgress(userId: number, friendId: number): Promise<{
        user: {
            id: number;
            username: string;
        };
        streak: {
            current: number;
            longest: number;
        };
        activeSupplements: number;
        last30DaysAdherence: number;
    }>;
}
