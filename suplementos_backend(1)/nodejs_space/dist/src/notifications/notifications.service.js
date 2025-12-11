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
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let NotificationsService = NotificationsService_1 = class NotificationsService {
    prisma;
    logger = new common_1.Logger(NotificationsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getConfig(userId) {
        let config = await this.prisma.notification_config.findUnique({ where: { user_id: userId } });
        if (!config) {
            config = await this.prisma.notification_config.create({
                data: { user_id: userId, global_enabled: true, supplement_configs: '[]' },
            });
            this.logger.log(`Created default notification config for user ${userId}`);
        }
        return { globalEnabled: config.global_enabled, supplementConfigs: JSON.parse(config.supplement_configs) };
    }
    async updateConfig(userId, dto) {
        let config = await this.prisma.notification_config.findUnique({ where: { user_id: userId } });
        const supplementConfigsJson = dto.supplementConfigs ? JSON.stringify(dto.supplementConfigs) : undefined;
        if (!config) {
            config = await this.prisma.notification_config.create({
                data: { user_id: userId, global_enabled: dto.globalEnabled ?? true, supplement_configs: supplementConfigsJson || '[]' },
            });
        }
        else {
            config = await this.prisma.notification_config.update({
                where: { user_id: userId },
                data: { global_enabled: dto.globalEnabled, supplement_configs: supplementConfigsJson },
            });
        }
        this.logger.log(`Notification config updated for user ${userId}`);
        return { globalEnabled: config.global_enabled, supplementConfigs: JSON.parse(config.supplement_configs) };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map