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
var StreaksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreaksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const date_fns_1 = require("date-fns");
let StreaksService = StreaksService_1 = class StreaksService {
    prisma;
    logger = new common_1.Logger(StreaksService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserStreak(userId) {
        const activeSupplements = await this.prisma.user_supplement.findMany({
            where: {
                user_id: userId,
                active: true,
            },
        });
        if (activeSupplements.length === 0) {
            return {
                current_streak: 0,
                longest_streak: 0,
                last_completed_date: null,
                message: 'No active supplements',
            };
        }
        const streakData = await this.calculateGlobalStreak(userId, activeSupplements);
        return streakData;
    }
    async getSupplementStreak(userId, supplementId) {
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
            this.logger.warn(`User ${userId} attempted to access streak for supplement ${supplementId} owned by user ${supplement.user_id}`);
            throw new common_1.ForbiddenException('You do not have permission to access this streak');
        }
        const streakData = await this.calculateSupplementStreak(userId, supplement);
        return {
            supplementId: supplement.id,
            supplementName: supplement.supplement_database?.name || supplement.custom_name,
            ...streakData,
        };
    }
    async calculateGlobalStreak(userId, activeSupplements) {
        let currentStreak = 0;
        let longestStreak = 0;
        let lastCompletedDate = null;
        let checkDate = (0, date_fns_1.startOfDay)(new Date());
        const todayComplete = await this.isDayCompleteForUser(userId, checkDate, activeSupplements);
        if (todayComplete) {
            lastCompletedDate = (0, date_fns_1.format)(checkDate, 'yyyy-MM-dd');
            currentStreak = 1;
            checkDate = (0, date_fns_1.subDays)(checkDate, 1);
        }
        else {
            checkDate = (0, date_fns_1.subDays)(checkDate, 1);
            const yesterdayComplete = await this.isDayCompleteForUser(userId, checkDate, activeSupplements);
            if (!yesterdayComplete) {
                return {
                    current_streak: 0,
                    longest_streak: await this.calculateLongestStreak(userId, activeSupplements),
                    last_completed_date: lastCompletedDate,
                };
            }
            lastCompletedDate = (0, date_fns_1.format)(checkDate, 'yyyy-MM-dd');
            currentStreak = 1;
            checkDate = (0, date_fns_1.subDays)(checkDate, 1);
        }
        let maxDaysToCheck = 365;
        while (maxDaysToCheck > 0) {
            const dayComplete = await this.isDayCompleteForUser(userId, checkDate, activeSupplements);
            if (!dayComplete) {
                break;
            }
            currentStreak++;
            checkDate = (0, date_fns_1.subDays)(checkDate, 1);
            maxDaysToCheck--;
        }
        longestStreak = await this.calculateLongestStreak(userId, activeSupplements);
        longestStreak = Math.max(longestStreak, currentStreak);
        return {
            current_streak: currentStreak,
            longest_streak: longestStreak,
            last_completed_date: lastCompletedDate,
        };
    }
    async calculateSupplementStreak(userId, supplement) {
        let currentStreak = 0;
        let longestStreak = 0;
        let lastCompletedDate = null;
        let checkDate = (0, date_fns_1.startOfDay)(new Date());
        const todayComplete = await this.isDayCompleteForSupplement(userId, checkDate, supplement);
        if (todayComplete) {
            lastCompletedDate = (0, date_fns_1.format)(checkDate, 'yyyy-MM-dd');
            currentStreak = 1;
            checkDate = (0, date_fns_1.subDays)(checkDate, 1);
        }
        else {
            checkDate = (0, date_fns_1.subDays)(checkDate, 1);
            const yesterdayComplete = await this.isDayCompleteForSupplement(userId, checkDate, supplement);
            if (!yesterdayComplete) {
                return {
                    current_streak: 0,
                    longest_streak: await this.calculateLongestStreakForSupplement(userId, supplement),
                    last_completed_date: lastCompletedDate,
                };
            }
            lastCompletedDate = (0, date_fns_1.format)(checkDate, 'yyyy-MM-dd');
            currentStreak = 1;
            checkDate = (0, date_fns_1.subDays)(checkDate, 1);
        }
        let maxDaysToCheck = 365;
        while (maxDaysToCheck > 0) {
            const dayComplete = await this.isDayCompleteForSupplement(userId, checkDate, supplement);
            if (!dayComplete) {
                break;
            }
            currentStreak++;
            checkDate = (0, date_fns_1.subDays)(checkDate, 1);
            maxDaysToCheck--;
        }
        longestStreak = await this.calculateLongestStreakForSupplement(userId, supplement);
        longestStreak = Math.max(longestStreak, currentStreak);
        return {
            current_streak: currentStreak,
            longest_streak: longestStreak,
            last_completed_date: lastCompletedDate,
        };
    }
    async isDayCompleteForUser(userId, date, activeSupplements) {
        const startDate = (0, date_fns_1.startOfDay)(date);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);
        for (const supplement of activeSupplements) {
            const intakeCount = await this.prisma.intake.count({
                where: {
                    user_id: userId,
                    user_supplement_id: supplement.id,
                    taken_at: {
                        gte: startDate,
                        lt: endDate,
                    },
                },
            });
            if (intakeCount < supplement.times_per_day) {
                return false;
            }
        }
        return true;
    }
    async isDayCompleteForSupplement(userId, date, supplement) {
        const startDate = (0, date_fns_1.startOfDay)(date);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 1);
        const intakeCount = await this.prisma.intake.count({
            where: {
                user_id: userId,
                user_supplement_id: supplement.id,
                taken_at: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });
        return intakeCount >= supplement.times_per_day;
    }
    async calculateLongestStreak(userId, activeSupplements) {
        let longestStreak = 0;
        let currentStreakCalc = 0;
        let checkDate = (0, date_fns_1.startOfDay)(new Date());
        let maxDaysToCheck = 365;
        while (maxDaysToCheck > 0) {
            const dayComplete = await this.isDayCompleteForUser(userId, checkDate, activeSupplements);
            if (dayComplete) {
                currentStreakCalc++;
                longestStreak = Math.max(longestStreak, currentStreakCalc);
            }
            else {
                currentStreakCalc = 0;
            }
            checkDate = (0, date_fns_1.subDays)(checkDate, 1);
            maxDaysToCheck--;
        }
        return longestStreak;
    }
    async calculateLongestStreakForSupplement(userId, supplement) {
        let longestStreak = 0;
        let currentStreakCalc = 0;
        let checkDate = (0, date_fns_1.startOfDay)(new Date());
        let maxDaysToCheck = 365;
        while (maxDaysToCheck > 0) {
            const dayComplete = await this.isDayCompleteForSupplement(userId, checkDate, supplement);
            if (dayComplete) {
                currentStreakCalc++;
                longestStreak = Math.max(longestStreak, currentStreakCalc);
            }
            else {
                currentStreakCalc = 0;
            }
            checkDate = (0, date_fns_1.subDays)(checkDate, 1);
            maxDaysToCheck--;
        }
        return longestStreak;
    }
};
exports.StreaksService = StreaksService;
exports.StreaksService = StreaksService = StreaksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StreaksService);
//# sourceMappingURL=streaks.service.js.map