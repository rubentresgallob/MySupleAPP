"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSupplementsModule = void 0;
const common_1 = require("@nestjs/common");
const user_supplements_controller_1 = require("./user-supplements.controller");
const user_supplements_service_1 = require("./user-supplements.service");
const prisma_service_1 = require("../prisma/prisma.service");
let UserSupplementsModule = class UserSupplementsModule {
};
exports.UserSupplementsModule = UserSupplementsModule;
exports.UserSupplementsModule = UserSupplementsModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_supplements_controller_1.UserSupplementsController],
        providers: [user_supplements_service_1.UserSupplementsService, prisma_service_1.PrismaService],
        exports: [user_supplements_service_1.UserSupplementsService],
    })
], UserSupplementsModule);
//# sourceMappingURL=user-supplements.module.js.map