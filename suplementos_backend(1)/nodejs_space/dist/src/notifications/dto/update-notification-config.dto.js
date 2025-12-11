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
exports.UpdateNotificationConfigDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateNotificationConfigDto {
    globalEnabled;
    supplementConfigs;
}
exports.UpdateNotificationConfigDto = UpdateNotificationConfigDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: 'Enable/disable all notifications globally' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateNotificationConfigDto.prototype, "globalEnabled", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: [{ userSupplementId: 1, enabled: true, reminderTimes: ['08:00', '20:00'] }], description: 'Array of notification configurations per supplement' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateNotificationConfigDto.prototype, "supplementConfigs", void 0);
//# sourceMappingURL=update-notification-config.dto.js.map