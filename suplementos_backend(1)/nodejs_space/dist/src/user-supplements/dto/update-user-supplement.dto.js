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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSupplementDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateUserSupplementDto {
    customName;
    form;
    dosageAmount;
    dosageUnit;
    timesPerDay;
    schedules;
    active;
}
exports.UpdateUserSupplementDto = UpdateUserSupplementDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Mi vitamina actualizada',
        description: 'Custom name',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserSupplementDto.prototype, "customName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'pastilla',
        description: 'Form of the supplement',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserSupplementDto.prototype, "form", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1000,
        description: 'Dosage amount',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateUserSupplementDto.prototype, "dosageAmount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'mg',
        description: 'Dosage unit',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserSupplementDto.prototype, "dosageUnit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 3,
        description: 'Number of times to take per day',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], UpdateUserSupplementDto.prototype, "timesPerDay", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: ['08:00', '14:00', '20:00'],
        description: 'Array of scheduled times',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateUserSupplementDto.prototype, "schedules", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: false,
        description: 'Whether the supplement is active',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateUserSupplementDto.prototype, "active", void 0);
//# sourceMappingURL=update-user-supplement.dto.js.map