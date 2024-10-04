import { Module } from '@nestjs/common';
import { MailerService } from './infrastructure/mailer/mailer.service';
import { PdfGeneratorService } from './infrastructure/pdf/pdf-generator.service';

@Module({
  providers: [MailerService, PdfGeneratorService],
})
export class CommonModule {}