import { PrismaService } from '../prisma/prisma.service';
import { UpdateNotificationConfigDto } from './dto/update-notification-config.dto';
export declare class NotificationsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getConfig(userId: number): Promise<{
        globalEnabled: boolean;
        supplementConfigs: any;
    }>;
    updateConfig(userId: number, dto: UpdateNotificationConfigDto): Promise<{
        globalEnabled: boolean;
        supplementConfigs: any;
    }>;
}
