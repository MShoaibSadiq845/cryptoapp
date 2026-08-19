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
var NewsletterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const subscriber_schema_1 = require("./schemas/subscriber.schema");
const nodemailer = require("nodemailer");
let NewsletterService = NewsletterService_1 = class NewsletterService {
    constructor(subscriberModel) {
        this.subscriberModel = subscriberModel;
        this.logger = new common_1.Logger(NewsletterService_1.name);
        const host = process.env.SMTP_HOST || 'smtp-relay.brevo.com';
        const port = Number(process.env.SMTP_PORT) || 587;
        const user = process.env.SMTP_USER || process.env.BREVO_USER;
        const pass = process.env.SMTP_PASS || process.env.BREVO_PASS;
        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure: false,
            auth: {
                user,
                pass,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        this.logger.log(`Initialized Brevo SMTP Transporter for host: ${host}:${port} (user: ${user || 'NOT SET'})`);
    }
    async subscribe(email) {
        const normalizedEmail = email.toLowerCase().trim();
        const existing = await this.subscriberModel.findOne({ email: normalizedEmail });
        if (existing && existing.status === 'active') {
            return {
                success: true,
                message: 'You are already subscribed to the Circlechain newsletter!',
                email: normalizedEmail,
            };
        }
        let subscriber;
        if (existing) {
            existing.status = 'active';
            existing.subscribedAt = new Date();
            subscriber = await existing.save();
        }
        else {
            subscriber = new this.subscriberModel({
                email: normalizedEmail,
                status: 'active',
                subscribedAt: new Date(),
            });
            await subscriber.save();
        }
        try {
            await this.sendConfirmationEmail(normalizedEmail);
            this.logger.log(`Brevo confirmation email sent to ${normalizedEmail}`);
        }
        catch (error) {
            this.logger.error(`Failed to send confirmation email via Brevo to ${normalizedEmail}`, error);
            subscriber.confirmationEmailSent = false;
            await subscriber.save();
        }
        return {
            success: true,
            message: 'Successfully subscribed! Check your inbox for the confirmation email.',
            email: normalizedEmail,
        };
    }
    async getAllSubscribers() {
        return this.subscriberModel.find().sort({ subscribedAt: -1 }).exec();
    }
    getTransporter() {
        const host = process.env.SMTP_HOST || 'smtp-relay.brevo.com';
        const port = Number(process.env.SMTP_PORT) || 587;
        const user = process.env.SMTP_USER || process.env.BREVO_USER;
        const pass = process.env.SMTP_PASS || process.env.BREVO_PASS;
        if (!user || !pass) {
            this.logger.error(`❌ SMTP credentials missing! SMTP_USER/BREVO_USER=${user ? 'SET' : 'MISSING'}, SMTP_PASS/BREVO_PASS=${pass ? 'SET' : 'MISSING'}`);
        }
        return nodemailer.createTransport({
            host,
            port,
            secure: false,
            auth: {
                user,
                pass,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }
    async sendConfirmationEmail(email) {
        const appUrl = process.env.CLIENT_URL || 'https://cryptoapp-two-henna.vercel.app';
        const fromAddress = process.env.EMAIL_FROM || '"Circlechain Web3" <sadiqshoaibbilal9140@gmail.com>';
        const transporter = this.getTransporter();
        const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Circlechain</title>
        <style>
          body {
            background-color: #010010;
            font-family: 'Montserrat', Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #ffffff;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: linear-gradient(180deg, #09081a 0%, #010010 100%);
            border: 1px solid #73FDAA;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 0 30px rgba(115, 253, 170, 0.2);
          }
          .header {
            background: #010010;
            padding: 30px;
            text-align: center;
            border-bottom: 1px solid rgba(115, 253, 170, 0.2);
          }
          .logo-text {
            font-size: 28px;
            font-weight: bold;
            color: #73FDAA;
            letter-spacing: 1px;
          }
          .content {
            padding: 40px 30px;
            text-align: center;
          }
          .badge {
            display: inline-block;
            background: rgba(115, 253, 170, 0.15);
            color: #73FDAA;
            border: 1px solid #73FDAA;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          h1 {
            color: #ffffff;
            font-size: 26px;
            margin: 0 0 16px 0;
            font-weight: 700;
          }
          p {
            color: #C4C4C4;
            font-size: 15px;
            line-height: 1.7;
            margin: 0 0 24px 0;
          }
          .features {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 20px;
            margin: 25px 0;
            text-align: left;
          }
          .feature-item {
            margin: 10px 0;
            color: #E2E8F0;
            font-size: 14px;
            display: flex;
            align-items: center;
          }
          .feature-icon {
            color: #73FDAA;
            margin-right: 10px;
            font-weight: bold;
          }
          .cta-btn {
            display: inline-block;
            background-color: #73FDAA;
            color: #010010;
            font-weight: bold;
            font-size: 16px;
            padding: 14px 36px;
            border-radius: 30px;
            text-decoration: none;
            box-shadow: 0 4px 20px rgba(115, 253, 170, 0.4);
            margin-top: 10px;
          }
          .footer {
            padding: 24px 30px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            font-size: 12px;
            color: #808080;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo-text">◆ CIRCLECHAIN</div>
          </div>
          <div class="content">
            <div class="badge">Subscription Confirmed</div>
            <h1>Welcome to the Future of Web3</h1>
            <p>
              Thank you for subscribing to the <strong>Circlechain</strong> newsletter. You are now first in line to receive real-time crypto market trends, exclusive blockchain insights, token analytics, and Web3 updates.
            </p>

            <div class="features">
              <div class="feature-item">
                <span class="feature-icon">✓</span> Real-Time Crypto & DeFi Intelligence
              </div>
              <div class="feature-item">
                <span class="feature-icon">✓</span> Exclusive Access Token Opportunities
              </div>
              <div class="feature-item">
                <span class="feature-icon">✓</span> Blockchain Security & Trading Strategies
              </div>
            </div>

            <a href="${appUrl}" class="cta-btn">Explore Circlechain Platform</a>
          </div>
          <div class="footer">
            © 2026 Circlechain Inc. Global Decentralize Currency Platform.<br/>
            You received this email because you subscribed on our platform with ${email}.
          </div>
        </div>
      </body>
      </html>
    `;
        await transporter.sendMail({
            from: fromAddress,
            to: email,
            subject: '⚡ Welcome to Circlechain – Your Web3 Updates are Confirmed!',
            html: htmlContent,
        });
    }
};
exports.NewsletterService = NewsletterService;
exports.NewsletterService = NewsletterService = NewsletterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(subscriber_schema_1.Subscriber.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], NewsletterService);
//# sourceMappingURL=newsletter.service.js.map