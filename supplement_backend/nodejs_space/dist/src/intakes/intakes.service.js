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
var IntakesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntakesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const date_fns_1 = require("date-fns");
let IntakesService = IntakesService_1 = class IntakesService {
    prisma;
    logger = new common_1.Logger(IntakesService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const userSupplement = await this.prisma.user_supplement.findUnique({
            where: { id: dto.userSupplementId },
        });
        if (!userSupplement) {
            this.logger.warn(`User supplement not found: ${dto.userSupplementId}`);
            throw new common_1.NotFoundException('User supplement not found');
        }
        if (userSupplement.user_id !== userId) {
            this.logger.warn(`User ${userId} attempted to record intake for supplement ${dto.userSupplementId} owned by user ${userSupplement.user_id}`);
            throw new common_1.ForbiddenException('You do not have permission to record intake for this supplement');
        }
        const intake = await this.prisma.intake.create({
            data: {
                user_id: userId,
                user_supplement_id: dto.userSupplementId,
                taken_at: dto.takenAt ? new Date(dto.takenAt) : new Date(),
            },
            include: {
                user_supplement: {
                    include: {
                        supplement_database: true,
                    },
                },
            },
        });
        this.logger.log(`Intake recorded: ${intake.id} for user ${userId}, supplement ${dto.userSupplementId}`);
        return intake;
    }
    async findAll(userId, startDate, endDate, userSupplementId) {
        const where = {
            user_id: userId,
        };
        if (startDate || endDate) {
            where.taken_at = {};
            if (startDate) {
                where.taken_at.gte = new Date(startDate);
            }
            if (endDate) {
                where.taken_at.lte = new Date(endDate);
            }
        }
        if (userSupplementId) {
            where.user_supplement_id = userSupplementId;
        }
        const intakes = await this.prisma.intake.findMany({
            where,
            include: {
                user_supplement: {
                    include: {
                        supplement_database: true,
                    },
                },
            },
            orderBy: { taken_at: 'desc' },
        });
        return intakes;
    }
    async getToday(userId) {
        const today = new Date();
        const startOfToday = (0, date_fns_1.startOfDay)(today);
        const endOfToday = (0, date_fns_1.endOfDay)(today);
        const intakes = await this.prisma.intake.findMany({
            where: {
                user_id: userId,
                taken_at: {
                    gte: startOfToday,
                    lte: endOfToday,
                },
            },
            include: {
                user_supplement: {
                    include: {
                        supplement_database: true,
                    },
                },
            },
            orderBy: { taken_at: 'desc' },
        });
        return intakes;
    }
    async getDailyProgress(userId) {
        const today = new Date();
        const startOfToday = (0, date_fns_1.startOfDay)(today);
        const endOfToday = (0, date_fns_1.endOfDay)(today);
        const activeSupplements = await this.prisma.user_supplement.findMany({
            where: {
                user_id: userId,
                active: true,
            },
            include: {
                supplement_database: true,
                intakes: {
                    where: {
                        taken_at: {
                            gte: startOfToday,
                            lte: endOfToday,
                        },
                    },
                },
            },
        });
        const progress = activeSupplements.map((supplement) => {
            const takenToday = supplement.intakes.length;
            const shouldTake = supplement.times_per_day;
            const percentComplete = Math.min(100, Math.round((takenToday / shouldTake) * 100));
            return {
                supplementId: supplement.id,
                supplementName: supplement.supplement_database?.name || supplement.custom_name,
                takenToday,
                shouldTake,
                percentComplete,
                isComplete: takenToday >= shouldTake,
                schedules: supplement.schedules,
            };
        });
        const totalComplete = progress.filter((p) => p.isComplete).length;
        const totalActive = activeSupplements.length;
        return {
            date: today.toISOString().split('T')[0],
            supplements: progress,
            summary: {
                totalActive,
                totalComplete,
                overallPercentComplete: totalActive > 0
                    ? Math.round((totalComplete / totalActive) * 100)
                    : 0,
            },
        };
    }
    async getSupplementStats(userId, supplementId) {
        const supplement = await this.prisma.user_supplement.findUnique({
            where: { id: supplementId },
            include: {
                supplement_database: true,
            },
        });
        if (!supplement) {
            this.logger.warn(`User supplement not found: ${supplementId}`);
            throw new common_1.NotFoundException('Supplement not found');
        }
        if (supplement.user_id !== userId) {
            this.logger.warn(`User ${userId} attempted to access stats for supplement ${supplementId} owned by user ${supplement.user_id}`);
            throw new common_1.ForbiddenException('You do not have permission to access these stats');
        }
        const intakes = await this.prisma.intake.findMany({
            where: {
                user_supplement_id: supplementId,
                user_id: userId,
            },
            orderBy: { taken_at: 'desc' },
        });
        const totalIntakes = intakes.length;
        const firstIntake = intakes[intakes.length - 1];
        const lastIntake = intakes[0];
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const last30DaysIntakes = intakes.filter((intake) => new Date(intake.taken_at) >= thirtyDaysAgo);
        const expectedIntakes30Days = 30 * supplement.times_per_day;
        const adherence30Days = expectedIntakes30Days > 0
            ? Math.round((last30DaysIntakes.length / expectedIntakes30Days) * 100)
            : 0;
        return {
            supplementId: supplement.id,
            supplementName: supplement.supplement_database?.name || supplement.custom_name,
            totalIntakes,
            firstIntake: firstIntake?.taken_at,
            lastIntake: lastIntake?.taken_at,
            last30Days: {
                intakes: last30DaysIntakes.length,
                expected: expectedIntakes30Days,
                adherencePercent: adherence30Days,
            },
        };
    }
};
exports.IntakesService = IntakesService;
exports.IntakesService = IntakesService = IntakesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IntakesService);
//# sourceMappingURL=intakes.service.js.map