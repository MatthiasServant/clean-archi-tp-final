import { PdfGeneratorServiceInterface } from 'src/common/pdf/pdf-generator.service.interface';

export class PdfGeneratorService implements PdfGeneratorServiceInterface {
  async generatePdf(text: string): Promise<Buffer> {
    //const pdf = await PdfDocument.fromHtml(`<html><body>${text}</body></html>`);
    return Buffer.from('pdf');
  }
}
