import { Controller, Post, Get, Logger, Res } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import type { Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';
import * as path from 'path';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly prisma: PrismaService) {}

  @Get('test-files')
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

  @Get('serve-index')
  serveIndex(@Res() res: Response) {
    const indexPath = path.join(__dirname, '..', 'public', 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    } else {
      return res.status(404).json({ error: 'File not found', path: indexPath });
    }
  }

  @Post('init-demo-data')
  @ApiOperation({ summary: 'Initialize demo data' })
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
    } catch (error) {
      this.logger.error('Error:', error);
      throw error;
    }
  }
}