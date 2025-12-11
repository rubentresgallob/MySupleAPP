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
var IntakesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntakesController = void 0;
const common_1 = require("@nestjs/common");
const intakes_service_1 = require("./intakes.service");
const create_intake_dto_1 = require("./dto/create-intake.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let IntakesController = IntakesController_1 = class IntakesController {
    intakesService;
    logger = new common_1.Logger(IntakesController_1.name);
    constructor(intakesService) {
        this.intakesService = intakesService;
    }
    async create(req, createIntakeDto) {
        this.logger.log(`Recording intake for user ID: ${req.user.id}`);
        return this.intakesService.create(req.user.id, createIntakeDto);
    }
    async findAll(req, startDate, endDate, userSupplementId) {
        this.logger.log(`Fetching intakes for user ID: ${req.user.id}`);
        return this.intakesService.findAll(req.user.id, startDate, endDate, userSupplementId ? parseInt(userSupplementId) : undefined);
    }
    async getToday(req) {
        this.logger.log(`Fetching today's intakes for user ID: ${req.user.id}`);
        return this.intakesService.getToday(req.user.id);
    }
    async getDailyProgress(req) {
        this.logger.log(`Fetching daily progress for user ID: ${req.user.id}`);
        return this.intakesService.getDailyProgress(req.user.id);
    }
    async getStats(req, supplementId) {
        this.logger.log(`Fetching stats for supplement ${supplementId}, user ID: ${req.user.id}`);
        return this.intakesService.getSupplementStats(req.user.id, supplementId);
    }
};
exports.IntakesController = IntakesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Record a supplement intake' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Intake recorded successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_intake_dto_1.CreateIntakeDto]),
    __metadata("design:returntype", Promise)
], IntakesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get intake history with optional filters' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, example: '2024-01-01', description: 'Filter from date (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, example: '2024-12-31', description: 'Filter to date (YYYY-MM-DD)' }),
    (0, swagger_1.ApiQuery)({ name: 'userSupplementId', required: false, example: 1, description: 'Filter by supplement ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Intake history' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __param(3, (0, common_1.Query)('userSupplementId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], IntakesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('today'),
    (0, swagger_1.ApiOperation)({ summary: 'Get today\'s intakes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Today\'s intakes' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IntakesController.prototype, "getToday", null);
__decorate([
    (0, common_1.Get)('progress/today'),
    (0, swagger_1.ApiOperation)({ summary: 'Get daily progress for active supplements' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daily progress summary' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IntakesController.prototype, "getDailyProgress", null);
__decorate([
    (0, common_1.Get)('stats/:supplementId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get statistics for a specific supplement' }),
    (0, swagger_1.ApiParam)({ name: 'supplementId', example: 1, description: 'User supplement ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Supplement statistics' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('supplementId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], IntakesController.prototype, "getStats", null);
exports.IntakesController = IntakesController = IntakesController_1 = __decorate([
    (0, swagger_1.ApiTags)('Intakes'),
    (0, common_1.Controller)('intakes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [intakes_service_1.IntakesService])
], IntakesController);
//# sourceMappingURL=intakes.controller.js.map