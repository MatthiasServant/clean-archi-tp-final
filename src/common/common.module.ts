import { Module } from '@nestjs/common';
import { MailerService } from './mailer/mailer.service';
import { PdfGeneratorService } from './pdf/pdf-generator.service';

@Module({
  providers: [MailerService, PdfGeneratorService],
})
export class CommonModule {}