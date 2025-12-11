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
var UserSupplementsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSupplementsController = void 0;
const common_1 = require("@nestjs/common");
const user_supplements_service_1 = require("./user-supplements.service");
const create_user_supplement_dto_1 = require("./dto/create-user-supplement.dto");
const update_user_supplement_dto_1 = require("./dto/update-user-supplement.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let UserSupplementsController = UserSupplementsController_1 = class UserSupplementsController {
    userSupplementsService;
    logger = new common_1.Logger(UserSupplementsController_1.name);
    constructor(userSupplementsService) {
        this.userSupplementsService = userSupplementsService;
    }
    async create(req, createUserSupplementDto) {
        this.logger.log(`Creating supplement for user ID: ${req.user.id}`);
        return this.userSupplementsService.create(req.user.id, createUserSupplementDto);
    }
    async findAll(req) {
        this.logger.log(`Fetching supplements for user ID: ${req.user.id}`);
        return this.userSupplementsService.findAll(req.user.id);
    }
    async findOne(req, id) {
        this.logger.log(`Fetching supplement ${id} for user ID: ${req.user.id}`);
        return this.userSupplementsService.findOne(req.user.id, id);
    }
    async update(req, id, updateUserSupplementDto) {
        this.logger.log(`Updating supplement ${id} for user ID: ${req.user.id}`);
        return this.userSupplementsService.update(req.user.id, id, updateUserSupplementDto);
    }
    async remove(req, id) {
        this.logger.log(`Deleting supplement ${id} for user ID: ${req.user.id}`);
        return this.userSupplementsService.remove(req.user.id, id);
    }
};
exports.UserSupplementsController = UserSupplementsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user supplement' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Supplement created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request - validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_supplement_dto_1.CreateUserSupplementDto]),
    __metadata("design:returntype", Promise)
], UserSupplementsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all supplements for authenticated user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of user supplements' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserSupplementsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get specific user supplement by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1, description: 'User supplement ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User supplement details' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Supplement not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - not owner' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserSupplementsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user supplement' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1, description: 'User supplement ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Supplement updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Supplement not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - not owner' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_user_supplement_dto_1.UpdateUserSupplementDto]),
    __metadata("design:returntype", Promise)
], UserSupplementsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete user supplement' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1, description: 'User supplement ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Supplement deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Supplement not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - not owner' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], UserSupplementsController.prototype, "remove", null);
exports.UserSupplementsController = UserSupplementsController = UserSupplementsController_1 = __decorate([
    (0, swagger_1.ApiTags)('User Supplements'),
    (0, common_1.Controller)('user-supplements'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [user_supplements_service_1.UserSupplementsService])
], UserSupplementsController);
//# sourceMappingURL=user-supplements.controller.js.map