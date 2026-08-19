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
var SwapsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwapsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const swap_schema_1 = require("./schemas/swap.schema");
let SwapsService = SwapsService_1 = class SwapsService {
    constructor(swapModel) {
        this.swapModel = swapModel;
        this.logger = new common_1.Logger(SwapsService_1.name);
    }
    async createSwap(data) {
        const swap = new this.swapModel({
            ...data,
            coinSymbol: data.coinSymbol.toUpperCase(),
            status: 'Completed',
        });
        const saved = await swap.save();
        this.logger.log(`Swap saved in DB: $${data.usdAmount} -> ${data.estimatedAmount} ${data.coinSymbol}`);
        return saved;
    }
    async getAllSwaps() {
        return this.swapModel.find().sort({ createdAt: -1 }).exec();
    }
    async getUserSwaps(userIdOrEmail) {
        return this.swapModel
            .find({
            $or: [{ userId: userIdOrEmail }, { userEmail: userIdOrEmail }],
        })
            .sort({ createdAt: -1 })
            .exec();
    }
};
exports.SwapsService = SwapsService;
exports.SwapsService = SwapsService = SwapsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(swap_schema_1.Swap.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SwapsService);
//# sourceMappingURL=swaps.service.js.map