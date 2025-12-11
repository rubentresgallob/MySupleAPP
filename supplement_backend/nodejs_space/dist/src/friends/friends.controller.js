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
var FriendsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsController = void 0;
const common_1 = require("@nestjs/common");
const friends_service_1 = require("./friends.service");
const friend_request_dto_1 = require("./dto/friend-request.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let FriendsController = FriendsController_1 = class FriendsController {
    friendsService;
    logger = new common_1.Logger(FriendsController_1.name);
    constructor(friendsService) {
        this.friendsService = friendsService;
    }
    async sendRequest(req, dto) {
        this.logger.log(`Friend request from user ID ${req.user.id} to ${dto.identifier}`);
        return this.friendsService.sendRequest(req.user.id, dto.identifier);
    }
    async acceptRequest(req, requestId) {
        this.logger.log(`User ID ${req.user.id} accepting friend request ${requestId}`);
        return this.friendsService.acceptRequest(req.user.id, requestId);
    }
    async rejectRequest(req, requestId) {
        this.logger.log(`User ID ${req.user.id} rejecting friend request ${requestId}`);
        return this.friendsService.rejectRequest(req.user.id, requestId);
    }
    async getFriends(req) {
        this.logger.log(`Fetching friends for user ID: ${req.user.id}`);
        return this.friendsService.getFriends(req.user.id);
    }
    async removeFriend(req, friendId) {
        this.logger.log(`User ID ${req.user.id} removing friend ${friendId}`);
        return this.friendsService.removeFriend(req.user.id, friendId);
    }
    async getPendingRequests(req) {
        this.logger.log(`Fetching pending requests for user ID: ${req.user.id}`);
        return this.friendsService.getPendingRequests(req.user.id);
    }
    async getFriendProgress(req, friendId) {
        this.logger.log(`User ID ${req.user.id} viewing progress of friend ${friendId}`);
        return this.friendsService.getFriendProgress(req.user.id, friendId);
    }
};
exports.FriendsController = FriendsController;
__decorate([
    (0, common_1.Post)('request'),
    (0, swagger_1.ApiOperation)({ summary: 'Send friend request by username or email' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Friend request sent successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, friend_request_dto_1.FriendRequestDto]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "sendRequest", null);
__decorate([
    (0, common_1.Post)('accept/:requestId'),
    (0, swagger_1.ApiOperation)({ summary: 'Accept friend request' }),
    (0, swagger_1.ApiParam)({ name: 'requestId', example: 1, description: 'Friend request ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Friend request accepted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Friend request not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('requestId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "acceptRequest", null);
__decorate([
    (0, common_1.Post)('reject/:requestId'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject friend request' }),
    (0, swagger_1.ApiParam)({ name: 'requestId', example: 1, description: 'Friend request ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Friend request rejected' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Friend request not found' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('requestId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "rejectRequest", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get list of accepted friends' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of friends' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "getFriends", null);
__decorate([
    (0, common_1.Delete)(':friendId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove friend' }),
    (0, swagger_1.ApiParam)({ name: 'friendId', example: 1, description: 'Friend user ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Friend removed successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Friendship not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('friendId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "removeFriend", null);
__decorate([
    (0, common_1.Get)('requests'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending friend requests received' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of pending requests' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "getPendingRequests", null);
__decorate([
    (0, common_1.Get)(':friendId/progress'),
    (0, swagger_1.ApiOperation)({ summary: 'View friend\'s public progress' }),
    (0, swagger_1.ApiParam)({ name: 'friendId', example: 1, description: 'Friend user ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Friend progress data' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Not friends or friendship not accepted' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('friendId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "getFriendProgress", null);
exports.FriendsController = FriendsController = FriendsController_1 = __decorate([
    (0, swagger_1.ApiTags)('Friends'),
    (0, common_1.Controller)('friends'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [friends_service_1.FriendsService])
], FriendsController);
//# sourceMappingURL=friends.controller.js.map