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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var LeaderboardController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardController = void 0;
const common_1 = require("@nestjs/common");
const leaderboard_service_1 = require("./leaderboard.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let LeaderboardController = LeaderboardController_1 = class LeaderboardController {
    leaderboardService;
    logger = new common_1.Logger(LeaderboardController_1.name);
    constructor(leaderboardService) {
        this.leaderboardService = leaderboardService;
    }
    async getFriendsLeaderboard(req) {
        this.logger.log(`Fetching friends leaderboard for user ID: ${req.user.id}`);
        return this.leaderboardService.getFriendsLeaderboard(req.user.id);
    }
    async getAdherenceLeaderboard(req) {
        this.logger.log(`Fetching adherence leaderboard for user ID: ${req.user.id}`);
        return this.leaderboardService.getAdherenceLeaderboard(req.user.id);
    }
};
exports.LeaderboardController = LeaderboardController;
__decorate([
    (0, common_1.Get)('friends'),
    (0, swagger_1.ApiOperation)({ summary: 'Get friends leaderboard ranked by global streak' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Friends leaderboard with current user included' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeaderboardController.prototype, "getFriendsLeaderboard", null);
__decorate([
    (0, common_1.Get)('adherence'),
    (0, swagger_1.ApiOperation)({ summary: 'Get friends leaderboard ranked by adherence percentage (last 30 days)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Adherence leaderboard with current user included' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeaderboardController.prototype, "getAdherenceLeaderboard", null);
exports.LeaderboardController = LeaderboardController = LeaderboardController_1 = __decorate([
    (0, swagger_1.ApiTags)('Leaderboard'),
    (0, common_1.Controller)('leaderboard'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [leaderboard_service_1.LeaderboardService])
], LeaderboardController);
//# sourceMappingURL=leaderboard.controller.js.map