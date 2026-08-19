import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber, SubscriberDocument } from './schemas/subscriber.schema';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(Subscriber.name)
    private readonly subscriberModel: Model<SubscriberDocument>,
  ) {
    const host = process.env.SMTP_HOST || 'smtp-relay.brevo.com';
    const port = Number(process.env.SMTP_PORT) || 587;
    const user = process.env.SMTP_USER || process.env.BREVO_USER;
    const pass = process.env.SMTP_PASS || process.env.BREVO_PASS;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: false, // true for 465, false for 587
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

  async subscribe(email: string): Promise<{ success: boolean; message: string; email: string }> {
    const normalizedEmail = email.toLowerCase().trim();

    // Check existing subscriber in DB
    const existing = await this.subscriberModel.findOne({ email: normalizedEmail });
    if (existing && existing.status === 'active') {
      return {
        success: true,
        message: 'You are already subscribed to the Circlechain newsletter!',
        email: normalizedEmail,
      };
    }

    let subscriber: SubscriberDocument;
    if (existing) {
      existing.status = 'active';
      existing.subscribedAt = new Date();
      subscriber = await existing.save();
    } else {
      subscriber = new this.subscriberModel({
        email: normalizedEmail,
        status: 'active',
        subscribedAt: new Date(),
      });
      await subscriber.save();
    }

    // Send confirmation email via Brevo
    try {
      await this.sendConfirmationEmail(normalizedEmail);
      this.logger.log(`Brevo confirmation email sent to ${normalizedEmail}`);
    } catch (error) {
      this.logger.error(`Failed to send confirmation email via Brevo to ${normalizedEmail}`, error);
      // We don't fail subscription completely if SMTP fails temporarily, but we record it
      subscriber.confirmationEmailSent = false;
      await subscriber.save();
    }

    return {
      success: true,
      message: 'Successfully subscribed! Check your inbox for the confirmation email.',
      email: normalizedEmail,
    };
  }

  async getAllSubscribers(): Promise<Subscriber[]> {
    return this.subscriberModel.find().sort({ subscribedAt: -1 }).exec();
  }

  private getTransporter(): nodemailer.Transporter {
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
      secure: false, // true for 465, false for 587
      auth: {
        user,
        pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  private async sendConfirmationEmail(email: string): Promise<void> {
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

            <a href="http://localhost:3000" class="cta-btn">Explore Circlechain Platform</a>
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
}
