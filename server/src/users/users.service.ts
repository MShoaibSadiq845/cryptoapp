import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findByGoogleId(googleId: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ googleId }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async createOrUpdateFromGoogle(profile: {
    googleId: string;
    email: string;
    name: string;
    picture?: string;
  }): Promise<UserDocument> {
    const { googleId, email, name, picture } = profile;
    const normalizedEmail = email.toLowerCase();

    let user = await this.userModel.findOne({
      $or: [{ googleId }, { email: normalizedEmail }],
    });

    if (user) {
      user.googleId = googleId;
      user.name = name || user.name;
      if (picture) user.picture = picture;
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

  async createLocalUser(userData: {
    email: string;
    name: string;
    password?: string;
  }): Promise<UserDocument> {
    const normalizedEmail = userData.email.toLowerCase().trim();
    const newUser = new this.userModel({
      email: normalizedEmail,
      name: userData.name.trim(),
      password: userData.password,
      provider: 'local',
    });
    return newUser.save();
  }

  async updateWallet(id: string, walletAddress: string): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(id, { walletAddress }, { new: true })
      .exec();
  }

  async updatePicture(id: string, picture: string): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(id, { picture }, { new: true })
      .exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().select('-password').sort({ createdAt: -1 }).exec();
  }

  async updateRole(id: string, role: string): Promise<UserDocument | null> {
    return this.userModel
      .findByIdAndUpdate(id, { role }, { new: true })
      .select('-password')
      .exec();
  }
}

