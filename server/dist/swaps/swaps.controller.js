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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapsController = void 0;
const common_1 = require("@nestjs/common");
const swaps_service_1 = require("./swaps.service");
let SwapsController = class SwapsController {
    constructor(swapsService) {
        this.swapsService = swapsService;
    }
    async createSwap(body) {
        const swap = await this.swapsService.createSwap(body);
        return {
            success: true,
            message: 'Swap completed and recorded in database successfully!',
            swap,
        };
    }
    async getSwaps(email) {
        if (email) {
            const swaps = await this.swapsService.getUserSwaps(email);
            return { success: true, count: swaps.length, swaps };
        }
        const swaps = await this.swapsService.getAllSwaps();
        return { success: true, count: swaps.length, swaps };
    }
};
exports.SwapsController = SwapsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SwapsController.prototype, "createSwap", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SwapsController.prototype, "getSwaps", null);
exports.SwapsController = SwapsController = __decorate([
    (0, common_1.Controller)('swaps'),
    __metadata("design:paramtypes", [swaps_service_1.SwapsService])
], SwapsController);
//# sourceMappingURL=swaps.controller.js.map