import { Component } from '@angular/core';
import {
  PdfMakeWrapper,
  Img,
  Txt,
  Table,
  Ol,
  Cell,
  Item,
  Ul,
} from 'pdfmake-wrapper';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { format } from 'date-fns';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-template-contracts',
  standalone: true,
  imports: [
    FormsModule,
    FloatLabelModule,
    CalendarModule,
    RadioButtonModule,
    InputTextareaModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './template-contracts.component.html',
  styleUrl: './template-contracts.component.css',
})
export class TemplateContractsComponent {
  fecha: string = '24 de junio del 2024';
  marca: string = 'inDrive';
  nuevaFecha: string = '';
  influenciador: string = 'Cristian hardy Tineo Retamozo';
  dni: string = '60762857';
  redesSociales: string =
    'https://www.instagram.com/unpardetragones/ https://www.tiktok.com/@unpardetragones';
  campana: string = 'inDrive Ambassadors';
  pais: string = 'Peru';
  genero!: string;
  generoRepresentante!: string;
  tipoDocumento!: string;
  representante: string = 'Monica Rengifo';
  identificacionRepresentante: string = '07625133';
  domicilio: string = 'Av. Nicolás Ayllon 1878, san Luis';
  acciones: string =
    '3 Rafaga de 30 seg, 1 Reel Collab, 2  reels, 3 repost tiktok';
  pronombre: string = '';
  pronombreMinusculas: string = '';
  pronombreRepresentante: string = '';
  pronombreRepresentado: string = '';
  pronombreCompromete: string = '';
  inicioContrato: string = '21 de junio del 2024';
  terminaContrato: string = '21 de septiembre del 2024';
  pago: string = '27.000 (VEINTISIETE MIL USD/CTE).';
  condicionesPago: string =
    'El pago se dividirá en 3 y se pagara en 3 meses,  a 45 días hábiles, finalizada la fecha del mes  y las acciones, de radicada la factura o cuenta de cobro por parte de LA INFLUENCER una vez finalizadas las acciones acordadas.';
  tipoDocumentoImprimir: string = '';
  tipoDocumentoRepresentante: string = '';
  sFinalInfluencer: string = '';

  async expression() {
    if (this.genero == 'hombre') {
      this.pronombre = 'EL';
      this.pronombreMinusculas = 'el influenciador';
      this.pronombreRepresentado = 'representado';
      this.pronombreCompromete = 'compromete';
    }
    if (this.genero == 'mujer') {
      this.pronombre = 'LA';
      this.pronombreMinusculas = 'la influenciadora';
      this.pronombreRepresentado = 'representada';
      this.pronombreCompromete = 'compromete';
    }
    if (this.genero == 'ellos') {
      this.pronombre = 'LOS';
      this.pronombreMinusculas = 'los influenciadores';
      this.pronombreRepresentado = 'representados';
      this.pronombreCompromete = 'comprometen';
      this.sFinalInfluencer = ' ';
    }

    if (this.genero == 'ellas') {
      this.pronombre = 'LAS';
      this.pronombreMinusculas = 'las influenciadoras';
      this.pronombreRepresentado = 'representadas';
      this.pronombreCompromete = 'comprometen';
      this.sFinalInfluencer = ' ';
    }

    if (this.generoRepresentante == 'hombre') {
      this.pronombreRepresentante = 'identificado';
    }
    if (this.generoRepresentante == 'mujer') {
      this.pronombreRepresentante = 'identificada';
    }
    if (this.generoRepresentante == 'empresa') {
      this.pronombreRepresentante = 'identificada';
    }

    if (this.tipoDocumento == 'dni') {
      this.tipoDocumentoImprimir = 'DNI';
    }

    if (this.tipoDocumento == 'cedulae') {
      this.tipoDocumentoImprimir = 'Carnet de Extranjería';
    }

    if (this.generoRepresentante == 'empresa') {
      this.tipoDocumentoRepresentante = 'RUT';
    }

    if (this.generoRepresentante != 'empresa') {
      this.tipoDocumentoRepresentante = 'DNI';
    }
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
    pdf.pageMargins([60, 40]);

    // Añadir texto con fuente personalizada

    // Titulo
    pdf.add(
      new Txt('ACUERDO DE PRESTACIÓN DE SERVICIOS DE PUBLICIDAD')
        .alignment('center')
        .bold().end
    );

    // Primera tabla
    pdf.add(
      new Table([
        ['Fecha:', `${this.fecha}`],
        [
          'Influenciador:',
          new Cell(
            new Txt(
              `${this.influenciador}\n${this.tipoDocumentoImprimir}: ${this.dni}`
            ).end
          ).end,
        ],
        ['Redes sociales:', `${this.redesSociales}`],
        ['Campaña:', new Txt(`${this.campana}`).bold().end],
      ])
        .widths(['auto', '*'])
        .margin([20, 30]).end // Ajusta el ancho de las columnas // Centrar la tabla
    );

    pdf.add(
      new Txt([
        `En ${this.pais}, el día `,
        { text: `${this.fecha}`, bold: true }, // Sección en negrita
        `, por una parte, \n\n`,
      ]).alignment('justify').end
    );

    pdf.add(new Txt('').end);

    // HOMBRES PRIMER PARRAFO

    // Hombre con representante hombre
    if (this.generoRepresentante != 'noAplica') {
      pdf.add(
        new Txt([
          `El presente documento fija los términos y condiciones en que por un lado, ${this.pronombreMinusculas} ${this.influenciador} ${this.pronombreRepresentado} de manera legalmente por ${this.representante} ${this.pronombreRepresentante} con el ${this.tipoDocumentoRepresentante} ${this.identificacionRepresentante} en adelante `,
          {
            text: `${this.pronombre} INFLUENCER${this.sFinalInfluencer}`,
            bold: true,
          },
          ` con domicilio en `,
          { text: `${this.domicilio}`, bold: true },
          `. Se ${this.pronombreCompromete} a realizar la Campaña de Publicidad para `,
          { text: `${this.marca}`, bold: true },
          `: \n\n`,
        ]).alignment('justify').end
      );
    }

    if (this.generoRepresentante == 'noAplica') {
      pdf.add(
        new Txt([
          `El presente documento fija los términos y condiciones en que por un lado, ${this.pronombreMinusculas} ${this.influenciador}`,
          ` con domicilio en `,
          { text: `${this.domicilio}`, bold: true },
          `. Se ${this.pronombreCompromete} a realizar la Campaña de Publicidad para `,
          { text: `${this.marca}`, bold: true },
          `: \n\n`,
        ]).alignment('justify').end
      );
    }

    pdf.add(
      new Txt([
        'Y, por la otra parte, como persona jurídica legalmente constituida en Estados Unidos, ',
        { text: 'RealUp Media LLC', bold: true },
        ' con EIN No. 98 - 1721277, con domicilio en 1198 The Pointe Drive, West Palm Beach, Fl, Estados Unidos y ',
        { text: 'MARIA PAULA CIPAMOCHA,', bold: true },
        ' representante legal suplente, identificada con ',
        { text: 'Cédula de ciudadanía colombiana, 1.019.089.645', bold: true },
        ' quien en adelante se denominará ',
        { text: '“LA AGENCIA”;', bold: true },
        '\n\n',
      ]).alignment('justify').end
    );

    const itemsArray = this.acciones.split(',').map((item) => item.trim());
    const items = itemsArray.map((text) => new Item(new Txt(text).end).end);

    pdf.add(
      new Ol([
        new Txt([
          { text: 'SERVICIOS POR REALIZAR.\n\n', bold: true },
          `${this.pronombre} INFLUENCER${this.sFinalInfluencer} garantiza la publicación de las siguientes acciones en sus redes sociales descritas en el inicio de este documento: \n\n`,
        ]).end,
        new Ul(items).end,
        { text: '\n\n', listType: 'none' },

        new Txt('TÉRMINOS.\n\n').alignment('justify').bold().end,
        new Ol([
          'El contenido debe estar habilitado para visitas públicas.',
          'Cuando el contenido no sea fijo, debe estar habilitado mínimo por 24 horas.',
          new Txt([
            'Seguir los lineamientos y parámetros indicados para la realización de las acciones y correcto cumplimiento de la prestación del servicio; lo cual habilitará el pago que se le dará a ',
            {
              text: `${this.pronombre} INFLUENCER${this.sFinalInfluencer}`,
              bold: true,
            },
            '.',
          ]).alignment('justify').end,
          `La duración del contrato será por el término desde el día ${this.inicioContrato} hasta el día ${this.terminaContrato}.`,
          new Txt([
            {
              text: `${this.pronombre} INFLUENCER${this.sFinalInfluencer}`,
              bold: true,
            },
            ' recibirá como pago por sus servicios la suma de ',
            { text: `${this.pago}`, bold: true },
            '. ',
            `${this.condicionesPago}.`,
          ]).alignment('justify').end,
          new Txt([
            'Con la celebración del presente Contrato, y de conformidad con los términos estipulados en la Ley de Protección de Datos Personales, ',
            {
              text: `${this.pronombre} INFLUENCER${this.sFinalInfluencer}`,
              bold: true,
            },
            ' otorga autorización a ',
            { text: 'REALUP MEDIA LLC', bold: true },
            ' para recolectar, almacenar, consultar, usar, procesar y en general, para dar tratamiento a la información personal de sus empleados o colaboradores que haya suministrado con ocasión de este Contrato, y toda aquella información adicional que se suministre en otros medios, que sea necesaria para el cumplimiento del objeto previsto en este Contrato, información que será́ incluida en las bases de datos de ',
            { text: 'LA AGENCIA', bold: true },
            ' para fines administrativos, comerciales, de publicidad y contacto. ',
            { text: 'LA AGENCIA', bold: true },
            ' garantiza que cuenta con las autorizaciones de los titulares de la información para otorgar la presente autorización.\n\n',
          ]).alignment('justify').end,
          new Txt([
            { text: `OBLIGACIONES DE LAS PARTES\n\n`, bold: true },
            `Por el presente Contrato ${this.pronombre} INFLUENCER${this.sFinalInfluencer} se obliga a:`,
          ]).alignment('justify').end,

          new Ol([
            'Llevar a cabo el desarrollo y ejecución del encargo conforme a las características, condiciones y plazos acordados por las Partes, con la máxima diligencia y conforme a las mejores prácticas existentes en el mercado al día de la fecha del presente Contrato.',
            {
              text: [
                'Mantener la confidencialidad de la información que ',
                { text: 'LA MARCA', bold: true },
                ' le suministre y tenga el carácter de confidencial o reservada.',
              ],
            },
            {
              text: [
                'Debe de realizar mensajes publicitarios que denigren o vulneren, entre otros, los derechos a la igualdad, y a la no discriminación en de los consumidores. En caso de que incurra ',
                {
                  text: `${this.pronombre} INFLUENCER${this.sFinalInfluencer}`,
                  bold: true,
                },
                ' en la violación de estos derechos ',
                { text: 'LA AGENCIA', bold: true },
                ' no se hace responsable de este tipo de acciones si se llegasen a ejecutar.',
              ],
            },
            {
              text: [
                'Los mensajes publicitarios deberán cumplir con los lineamientos de responsabilidad social y apelar preferentemente a actitudes o sentimientos positivos. No podrán explotar injustificadamente el infortunio o el sufrimiento, aprovecharse del miedo, ni utilizar o dar la impresión de justificar, permitir o incitar una conducta violenta, ilegal o antisocial. ',
                { text: 'LA AGENCIA', bold: true },
                ' no se hace responsable de este tipo de acciones si se llegasen a ejecutar.',
              ],
            },
            'Abstenerse de realizar las publicaciones con menores de edad, a menos que se emita autorización previa y expresa conforme a los parámetros legales.',
            {
              text: [
                'Informar oportunamente a ',
                { text: 'LA AGENCIA', bold: true },
                ' la ocurrencia de cualquier hecho o suceso que pueda ser de su interés para el cabal desarrollo del servicio.',
              ],
            },
            'Cumplir con todas las recomendaciones establecidas en la Guía de Buenas Prácticas en Publicidad.',
            'Entrega de resultados de la campaña en el tiempo oportuno: Veinticuatro (24) horas después de finalizada la publicación cuando son publicaciones efímeras y tres (3) días después cuando son publicaciones fijas.',
            {
              text: [
                'Las demás asignadas por la Ley en desarrollo del presente Contrato. \n\n Por el presente contrato ',
                { text: 'LA AGENCIA', bold: true },
                ' se obliga a:',
              ],
            },
          ]).end,

          new Ol([
            'Realizar el pago del precio pactado según lo convenido por las Partes.',
            {
              text: [
                'Mantener la confidencialidad de la información que ',
                {
                  text: `${this.pronombre} INFLUENCER${this.sFinalInfluencer}`,
                  bold: true,
                },
                ' le suministre y tenga el carácter de confidencial o reservada.',
              ],
            },
            'Proporcionar las directrices, medios y los contenidos, en su caso, conforme a lo convenido por las partes.',
            'Las demás asignadas por la Ley en desarrollo del presente Contrato.\n\n',
          ]).end,
          {
            text: [
              { text: 'INCUMPLIMIENTO. LAS PARTES', bold: true },
              'quedan facultadas para resolver el presente contrato y para exigir la indemnización de daños y perjuicios a que haya lugar en Derecho cuando se produzca cualquier incumplimiento o cumplimiento irregular o defectuoso de cualesquiera de las obligaciones previstas en el presente contrato.\n\n',
            ],
          },
          {
            text: [
              {
                text: `PROPIEDAD INTELECTUAL. ${this.pronombre} INFLUENCER${this.sFinalInfluencer}`,
                bold: true,
              },
              ` se ${this.pronombreCompromete} a que las `,
              { text: 'acciones', bold: true },
              ' que realizará sobre las cuales existiera derechos de propiedad intelectual e industrial serán cedidos, a ',
              { text: 'LA MARCA', bold: true },
              ' y a ',
              { text: 'LA AGENCIA', bold: true },
              ` por el término de duración del presente contrato, para su utilización en redes sociales. De igual forma, se ${this.pronombreCompromete} a no utilizar contenidos que infrinjan ni lesionen ningún “copyright”, ni ningún derecho de propiedad intelectual o industrial. En caso de estar acordado en el numeral 1 de este contrato la cesión de derechos. De lo contrario, se entenderá por no escrito.\n\n`,
            ],
          },
          {
            text: [
              {
                text: `INDEMNIDAD. ${this.pronombre} INFLUENCER${this.sFinalInfluencer}`,
                bold: true,
              },
              ` se ${this.pronombreCompromete} a: Mantener indemne a `,
              { text: 'LA AGENCIA', bold: true },
              ' y a ',
              { text: 'LA MARCA,', bold: true },
              ' a sostener comportamientos adecuados y a no realizar actos que puedan afectar negativamente a ',
              { text: 'LA AGENCIA', bold: true },
              ' y/o a ',
              { text: 'LA MARCA.', bold: true },
              ` De igual manera, se ${this.pronombreCompromete} a abstenerse de realizar comentarios negativos de historias durante la duración del Contrato y por un (1) año posterior a la vigencia del presente Contrato de prestación de servicios.\n\n`,
            ],
          },
          {
            text: [
              { text: 'FUERZA MAYOR O CASO FORTUITO.', bold: true },
              ' Si se llegará a presentar un evento de caso fortuito o fuerza mayor por alguna de las partes que imposibilite el cumplimiento de las obligaciones aquí establecidas, la parte afectada debe probarlo y solicitar la suspensión y/o terminación del contrato, sin lugar a pago de ninguna indemnización o sanción.\n\n',
            ],
          },
        ]).type('upper-roman').end,
      ]).alignment('justify').end
    );

    pdf.add(
      { text: '', pageBreak: 'after' } // Este elemento causará un salto de página
    );

    pdf.add(
      new Txt(`${this.pronombre} INFLUENCER${this.sFinalInfluencer}`)
        .margin([0, 60])
        .bold().end
    );

    pdf.add(new Txt(`__________________________________`).end);

    pdf.add(new Txt(`${this.influenciador}`).bold().end);
    pdf.add(new Txt(`${this.tipoDocumentoImprimir}. ${this.dni}`).bold().end);

    pdf.add(new Txt(`LA AGENCIA`).margin([0, 60]).bold().end);

    pdf.add(new Txt(`__________________________________`).end);
    pdf.add(new Txt(`REALUP MEDIA LLC`).bold().end);
    pdf.add(new Txt(`MARIA PAULA CIPAMOCHA`).bold().end);
    pdf.add(new Txt(`Cédula de ciudadanía colombiana:`).bold().end);
    pdf.add(new Txt(`1.019.089.645`).bold().end);

    pdf.create().download(`Contrato ${this.influenciador}.pdf`);
  }
}
