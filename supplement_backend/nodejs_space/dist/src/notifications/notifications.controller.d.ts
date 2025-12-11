import { NotificationsService } from './notifications.service';
import { UpdateNotificationConfigDto } from './dto/update-notification-config.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    private readonly logger;
    constructor(notificationsService: NotificationsService);
    getConfig(req: any): Promise<{
        globalEnabled: boolean;
        supplementConfigs: any;
    }>;
    updateConfig(req: any, dto: UpdateNotificationConfigDto): Promise<{
        globalEnabled: boolean;
        supplementConfigs: any;
    }>;
}
