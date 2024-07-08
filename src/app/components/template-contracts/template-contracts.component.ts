import { Component } from '@angular/core';
import { PdfMakeWrapper, Img, Txt } from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-template-contracts',
  standalone: true,
  imports: [FloatLabelModule],
  templateUrl: './template-contracts.component.html',
  styleUrl: './template-contracts.component.css',
})
export class TemplateContractsComponent {
  async expression() {
    PdfMakeWrapper.setFonts(pdfFonts, {
      custom: {
        normal: 'ARIAL.TTF',
        bold: 'ARIALBD.TTF',
        italics: 'ARIALI.TTF',
        bolditalics: 'ARIALBI.TTF',
      },
    });

    PdfMakeWrapper.useFont('custom');
    const pdf = new PdfMakeWrapper();

    // Añadir texto con fuente personalizada

    pdf.add(
      new Txt('“We are Top-Notch in the creator economy”')
        .fontSize(25)
        .alignment('center')
        .color('#d20981').end
    );

    pdf.create().download('formulario.pdf');
  }
}
