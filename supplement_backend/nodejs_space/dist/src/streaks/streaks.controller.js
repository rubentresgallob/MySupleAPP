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
var StreaksController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreaksController = void 0;
const common_1 = require("@nestjs/common");
const streaks_service_1 = require("./streaks.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let StreaksController = StreaksController_1 = class StreaksController {
    streaksService;
    logger = new common_1.Logger(StreaksController_1.name);
    constructor(streaksService) {
        this.streaksService = streaksService;
    }
    async getUserStreak(req) {
        this.logger.log(`Fetching global streak for user ID: ${req.user.id}`);
        return this.streaksService.getUserStreak(req.user.id);
    }
    async getSupplementStreak(req, id) {
        this.logger.log(`Fetching streak for supplement ${id}, user ID: ${req.user.id}`);
        return this.streaksService.getSupplementStreak(req.user.id, id);
    }
};
exports.StreaksController = StreaksController;
__decorate([
    (0, common_1.Get)('user'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user\'s global streak' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User global streak data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StreaksController.prototype, "getUserStreak", null);
__decorate([
    (0, common_1.Get)('supplement/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get streak for a specific supplement' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1, description: 'User supplement ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Supplement streak data' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Supplement not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - not owner' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], StreaksController.prototype, "getSupplementStreak", null);
exports.StreaksController = StreaksController = StreaksController_1 = __decorate([
    (0, swagger_1.ApiTags)('Streaks'),
    (0, common_1.Controller)('streaks'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [streaks_service_1.StreaksService])
], StreaksController);
//# sourceMappingURL=streaks.controller.js.map