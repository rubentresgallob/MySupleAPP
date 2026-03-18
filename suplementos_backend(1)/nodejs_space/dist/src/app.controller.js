"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AppController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const swagger_1 = require("@nestjs/swagger");
let AppController = AppController_1 = class AppController {
    prisma;
    logger = new common_1.Logger(AppController_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    testFiles() {
        const publicPath = path.join(__dirname, '..', 'public');
        const indexPath = path.join(publicPath, 'index.html');
        return {
            publicPath,
            indexPath,
            publicExists: fs.existsSync(publicPath),
            indexExists: fs.existsSync(indexPath),
            publicContents: fs.existsSync(publicPath) ? fs.readdirSync(publicPath) : [],
        };
    }
    serveIndex(res) {
        const indexPath = path.join(__dirname, '..', 'public', 'index.html');
        if (fs.existsSync(indexPath)) {
            return res.sendFile(indexPath);
        }
        else {
            return res.status(404).json({ error: 'File not found', path: indexPath });
        }
    }
    async initDemoData() {
        this.logger.log('Initializing demo data...');
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: { email: 'test@example.com' },
            });
            if (existingUser) {
                return { message: 'Demo data already initialized' };
            }
            const hashedPassword = await bcrypt.hash('password123', 10);
            const user = await this.prisma.user.create({
                data: {
                    email: 'test@example.com',
                    password: hashedPassword,
                    username: 'testuser',
                },
            });
            await this.prisma.notification_config.create({
                data: {
                    user_id: user.id,
                    global_enabled: true,
                    supplement_configs: '[]',
                },
            });
            return {
                message: 'Demo data initialized successfully',
                credentials: {
                    email: 'test@example.com',
                    password: 'password123',
                },
            };
        }
        catch (error) {
            this.logger.error('Error:', error);
            throw error;
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('test-files'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "testFiles", null);
__decorate([
    (0, common_1.Get)('serve-index'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "serveIndex", null);
__decorate([
    (0, common_1.Post)('init-demo-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Initialize demo data' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "initDemoData", null);
exports.AppController = AppController = AppController_1 = __decorate([
    (0, swagger_1.ApiTags)('App'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppController);
//# sourceMappingURL=app.controller.js.map