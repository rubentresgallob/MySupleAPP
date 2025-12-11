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
var SupplementsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplementsController = void 0;
const common_1 = require("@nestjs/common");
const supplements_service_1 = require("./supplements.service");
const swagger_1 = require("@nestjs/swagger");
let SupplementsController = SupplementsController_1 = class SupplementsController {
    supplementsService;
    logger = new common_1.Logger(SupplementsController_1.name);
    constructor(supplementsService) {
        this.supplementsService = supplementsService;
    }
    async findAll(page, limit) {
        const pageNum = page ? parseInt(page) : 1;
        const limitNum = limit ? parseInt(limit) : 10;
        this.logger.log(`Fetching supplements: page=${pageNum}, limit=${limitNum}`);
        return this.supplementsService.findAll(pageNum, limitNum);
    }
    async search(query) {
        this.logger.log(`Searching supplements with query: ${query}`);
        return this.supplementsService.search(query);
    }
    async findOne(id) {
        this.logger.log(`Fetching supplement with ID: ${id}`);
        return this.supplementsService.findOne(id);
    }
};
exports.SupplementsController = SupplementsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all pre-loaded supplements with pagination' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: 1, description: 'Page number' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: 10, description: 'Items per page' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of supplements with pagination' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SupplementsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search supplements by name or category' }),
    (0, swagger_1.ApiQuery)({ name: 'q', required: true, example: 'Vitamina', description: 'Search query' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of matching supplements' }),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupplementsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get supplement details by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', example: 1, description: 'Supplement ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Supplement details' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Supplement not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SupplementsController.prototype, "findOne", null);
exports.SupplementsController = SupplementsController = SupplementsController_1 = __decorate([
    (0, swagger_1.ApiTags)('Supplements Database'),
    (0, common_1.Controller)('supplements/database'),
    __metadata("design:paramtypes", [supplements_service_1.SupplementsService])
], SupplementsController);
//# sourceMappingURL=supplements.controller.js.map