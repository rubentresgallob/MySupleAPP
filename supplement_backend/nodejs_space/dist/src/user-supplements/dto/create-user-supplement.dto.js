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
exports.CreateUserSupplementDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateUserSupplementDto {
    supplementDatabaseId;
    customName;
    form;
    dosageAmount;
    dosageUnit;
    timesPerDay;
    schedules;
    active;
}
exports.CreateUserSupplementDto = CreateUserSupplementDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'ID from the pre-loaded supplement database (optional)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateUserSupplementDto.prototype, "supplementDatabaseId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Mi vitamina personalizada',
        description: 'Custom name if not using pre-loaded supplement',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserSupplementDto.prototype, "customName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'cápsula',
        description: 'Form of the supplement',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserSupplementDto.prototype, "form", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 500,
        description: 'Dosage amount',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateUserSupplementDto.prototype, "dosageAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'mg',
        description: 'Dosage unit',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserSupplementDto.prototype, "dosageUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: 'Number of times to take per day',
    }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateUserSupplementDto.prototype, "timesPerDay", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['08:00', '20:00'],
        description: 'Array of scheduled times',
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateUserSupplementDto.prototype, "schedules", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: true,
        description: 'Whether the supplement is active',
        default: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateUserSupplementDto.prototype, "active", void 0);
//# sourceMappingURL=create-user-supplement.dto.js.map