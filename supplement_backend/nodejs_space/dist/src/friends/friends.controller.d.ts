import { FriendsService } from './friends.service';
import { FriendRequestDto } from './dto/friend-request.dto';
export declare class FriendsController {
    private readonly friendsService;
    private readonly logger;
    constructor(friendsService: FriendsService);
    sendRequest(req: any, dto: FriendRequestDto): Promise<{
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
    acceptRequest(req: any, requestId: number): Promise<{
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
    rejectRequest(req: any, requestId: number): Promise<{
        message: string;
    }>;
    getFriends(req: any): Promise<{
        friendshipId: number;
        friend: {
            created_at: Date;
            id: number;
            email: string;
            username: string;
        };
        friendsSince: Date;
    }[]>;
    removeFriend(req: any, friendId: number): Promise<{
        message: string;
    }>;
    getPendingRequests(req: any): Promise<{
        requestId: number;
        from: {
            created_at: Date;
            id: number;
            email: string;
            username: string;
        };
        receivedAt: Date;
    }[]>;
    getFriendProgress(req: any, friendId: number): Promise<{
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
