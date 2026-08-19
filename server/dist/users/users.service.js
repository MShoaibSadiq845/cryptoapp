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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email: email.toLowerCase() }).exec();
    }
    async findByGoogleId(googleId) {
        return this.userModel.findOne({ googleId }).exec();
    }
    async findById(id) {
        return this.userModel.findById(id).exec();
    }
    async createOrUpdateFromGoogle(profile) {
        const { googleId, email, name, picture } = profile;
        const normalizedEmail = email.toLowerCase();
        let user = await this.userModel.findOne({
            $or: [{ googleId }, { email: normalizedEmail }],
        });
        if (user) {
            user.googleId = googleId;
            user.name = name || user.name;
            if (picture)
                user.picture = picture;
            return user.save();
        }
        user = new this.userModel({
            googleId,
            email: normalizedEmail,
            name,
            picture: picture || '',
            provider: 'google',
        });
        return user.save();
    }
    async createLocalUser(userData) {
        const normalizedEmail = userData.email.toLowerCase().trim();
        const newUser = new this.userModel({
            email: normalizedEmail,
            name: userData.name.trim(),
            password: userData.password,
            provider: 'local',
        });
        return newUser.save();
    }
    async updateWallet(id, walletAddress) {
        return this.userModel
            .findByIdAndUpdate(id, { walletAddress }, { new: true })
            .exec();
    }
    async updatePicture(id, picture) {
        return this.userModel
            .findByIdAndUpdate(id, { picture }, { new: true })
            .exec();
    }
    async findAll() {
        return this.userModel.find().select('-password').sort({ createdAt: -1 }).exec();
    }
    async updateRole(id, role) {
        return this.userModel
            .findByIdAndUpdate(id, { role }, { new: true })
            .select('-password')
            .exec();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map