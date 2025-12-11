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
var UserSupplementsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSupplementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserSupplementsService = UserSupplementsService_1 = class UserSupplementsService {
    prisma;
    logger = new common_1.Logger(UserSupplementsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        if (dto.supplementDatabaseId) {
            const supplementExists = await this.prisma.supplement_database.findUnique({
                where: { id: dto.supplementDatabaseId },
            });
            if (!supplementExists) {
                this.logger.warn(`Invalid supplement database ID: ${dto.supplementDatabaseId}`);
                throw new common_1.BadRequestException('Invalid supplement database ID provided');
            }
        }
        if (!dto.supplementDatabaseId && !dto.customName) {
            throw new common_1.BadRequestException('customName is required for custom supplements');
        }
        const userSupplement = await this.prisma.user_supplement.create({
            data: {
                user_id: userId,
                supplement_database_id: dto.supplementDatabaseId,
                custom_name: dto.customName,
                form: dto.form,
                dosage_amount: dto.dosageAmount,
                dosage_unit: dto.dosageUnit,
                times_per_day: dto.timesPerDay,
                schedules: dto.schedules,
                active: dto.active !== undefined ? dto.active : true,
            },
            include: {
                supplement_database: true,
            },
        });
        this.logger.log(`User supplement created: ${userSupplement.id} for user ${userId}`);
        return userSupplement;
    }
    async findAll(userId) {
        const supplements = await this.prisma.user_supplement.findMany({
            where: { user_id: userId },
            include: {
                supplement_database: true,
            },
            orderBy: { created_at: 'desc' },
        });
        return supplements;
    }
    async findOne(userId, id) {
        const supplement = await this.prisma.user_supplement.findUnique({
            where: { id },
            include: {
                supplement_database: true,
            },
        });
        if (!supplement) {
            this.logger.warn(`User supplement not found: ${id}`);
            throw new common_1.NotFoundException('Supplement not found');
        }
        if (supplement.user_id !== userId) {
            this.logger.warn(`User ${userId} attempted to access supplement ${id} owned by user ${supplement.user_id}`);
            throw new common_1.ForbiddenException('You do not have permission to access this supplement');
        }
        return supplement;
    }
    async update(userId, id, dto) {
        const existing = await this.findOne(userId, id);
        const updated = await this.prisma.user_supplement.update({
            where: { id },
            data: {
                custom_name: dto.customName,
                form: dto.form,
                dosage_amount: dto.dosageAmount,
                dosage_unit: dto.dosageUnit,
                times_per_day: dto.timesPerDay,
                schedules: dto.schedules,
                active: dto.active,
            },
            include: {
                supplement_database: true,
            },
        });
        this.logger.log(`User supplement updated: ${id} by user ${userId}`);
        return updated;
    }
    async remove(userId, id) {
        await this.findOne(userId, id);
        await this.prisma.user_supplement.delete({
            where: { id },
        });
        this.logger.log(`User supplement deleted: ${id} by user ${userId}`);
        return { message: 'Supplement deleted successfully' };
    }
};
exports.UserSupplementsService = UserSupplementsService;
exports.UserSupplementsService = UserSupplementsService = UserSupplementsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserSupplementsService);
//# sourceMappingURL=user-supplements.service.js.map