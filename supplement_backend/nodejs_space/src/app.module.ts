import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SupplementsModule } from './supplements/supplements.module';
import { UserSupplementsModule } from './user-supplements/user-supplements.module';
import { IntakesModule } from './intakes/intakes.module';
import { StreaksModule } from './streaks/streaks.module';
import { FriendsModule } from './friends/friends.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    SupplementsModule,
    UserSupplementsModule,
    IntakesModule,
    StreaksModule,
    FriendsModule,
    LeaderboardModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
