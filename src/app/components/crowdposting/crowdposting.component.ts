import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgModel,
  Validators,
  FormArray,
} from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
  PdfMakeWrapper,
  Txt,
  Img,
  Ul,
  Table,
  Cell,
  Item,
  Stack,
} from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AuthService } from '../../services/auth.service';
import { CrowdpostingService } from '../../services/crowdposting.service';
import { CitiesService } from '../../services/cities.service';

// Imports

import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { CardModule } from 'primeng/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { SelectButtonModule } from 'primeng/selectbutton';

interface SaleInstagramUno {
  country: string;
  number_nano: number;
  number_micro: number;
  number_reels_nano: number;
  number_stories_nano: number;
  number_reels_micro: number;
  number_stories_micro: number;
  price: number;
  reach_package: number;
  cpv: number;
}

interface SaleTikTokUno {
  country: string;
  number_nano: number;
  number_micro: number;
  number_tiktok_nano: number;
  number_tiktok_micro: number;
  price: number;
  reach_package: number;
  cpv: number;
}

interface SaleInstagramDos {
  country: string;
  number_nano: number;
  number_micro: number;
  number_reels_nano: number;
  number_stories_nano: number;
  number_reels_micro: number;
  number_stories_micro: number;
  price: number;
  reach_package: number;
  cpv: number;
}

interface SaleTikTokDos {
  country: string;
  number_nano: number;
  number_micro: number;
  number_tiktok_nano: number;
  number_tiktok_micro: number;
  price: number;
  reach_package: number;
  cpv: number;
}

interface Country {
  name: string;
}

@Component({
  selector: 'app-crowdposting',
  templateUrl: './crowdposting.component.html',
  styleUrls: ['./crowdposting.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    AsyncPipe,
    MultiSelectModule,
    CardModule,
    ConfirmDialogModule,
    ToastModule,
    CalendarModule,
    AccordionModule,
    CarouselModule,
    InputTextModule,
    FloatLabelModule,
    InputTextareaModule,
    DropdownModule,
    RippleModule,
    SelectButtonModule,
  ],

  providers: [MessageService],
})
export class CrowdpostingComponent {
  selectedCountry: Country = { name: '' };
  citiesFinal: string[] = [''];

  countries: Country[] = [
    { name: 'Argentina' },
    { name: 'Bolivia' },
    { name: 'Brasil' },
    { name: 'Canada' },
    { name: 'Chile' },
    { name: 'Colombia' },
    { name: 'Costa Rica' },
    { name: 'Cuba' },
    { name: 'Dominican Republic' },
    { name: 'Ecuador' },
    { name: 'El Salvador' },
    { name: 'Guatemala' },
    { name: 'Honduras' },
    { name: 'Mexico' },
    { name: 'Nicaragua' },
    { name: 'Panama' },
    { name: 'Paraguay' },
    { name: 'Peru' },
    { name: 'Puerto Rico' },
    { name: 'United States' },
    { name: 'Uruguay' },
    { name: 'Venezuela' },
  ];

  citiesListArgentina: { name: string; code: string }[] = [];

  citiesListColombia: { name: string; code: string }[] = [];

  citiesListBolivia: { name: string; code: string }[] = [];

  citiesListBrasil: { name: string; code: string }[] = [];

  citiesListChile: { name: string; code: string }[] = [];

  citiesListEcuador: { name: string; code: string }[] = [];

  citiesListParaguay: { name: string; code: string }[] = [];

  citiesListPeru: { name: string; code: string }[] = [];

  citiesListUruguay: { name: string; code: string }[] = [];

  citiesListVenezuela: { name: string; code: string }[] = [];

  citiesListCostaRica: { name: string; code: string }[] = [];

  citiesListCuba: { name: string; code: string }[] = [];

  citiesListElSalvador: { name: string; code: string }[] = [];

  citiesListGuatemala: { name: string; code: string }[] = [];

  citiesListHonduras: { name: string; code: string }[] = [];

  citiesListMexico: { name: string; code: string }[] = [];

  citiesListNicaragua: { name: string; code: string }[] = [];

  citiesListPanama: { name: string; code: string }[] = [];

  citiesListPuertoRico: { name: string; code: string }[] = [];

  citiesListDominicanRepublic: { name: string; code: string }[] = [];

  citiesListUnitedStates: { name: string; code: string }[] = [];

  citiesListCanada: { name: string; code: string }[] = [];

  //Instagram
  salesListInstagramUno: SaleInstagramUno[] = [];

  newSaleInstagramUno: SaleInstagramUno = {
    country: '',
    number_nano: 30,
    number_micro: 15,
    number_reels_nano: 2,
    number_stories_nano: 3,
    number_reels_micro: 1,
    number_stories_micro: 3,
    price: 0,
    reach_package: 0,
    cpv: 0,
  };

  salesListInstagramDos: SaleInstagramDos[] = [];

  newSaleInstagramDos: SaleInstagramDos = {
    country: '',
    number_nano: 90,
    number_micro: 45,
    number_reels_nano: 2,
    number_stories_nano: 3,
    number_reels_micro: 1,
    number_stories_micro: 3,
    price: 0,
    reach_package: 0,
    cpv: 0,
  };

  addSaleInstagramUno() {
    this.salesListInstagramUno.push({ ...this.newSaleInstagramUno });
    // Limpiar el formulario después de agregar la venta
    console.log(this.salesListInstagramUno);
  }

  addSaleInstagramDos() {
    this.salesListInstagramDos.push({ ...this.newSaleInstagramDos });
    // Limpiar el formulario después de agregar la venta
    console.log(this.salesListInstagramDos);
  }

  resetFormInstagramUno() {
    this.newSaleInstagramUno = {
      country: '',
      number_nano: 0,
      number_micro: 0,
      number_reels_nano: 0,
      number_stories_nano: 0,
      number_reels_micro: 0,
      number_stories_micro: 0,
      price: 0,
      reach_package: 0,
      cpv: 0,
    };
  }

  resetFormInstagramDos() {
    this.newSaleInstagramUno = {
      country: '',
      number_nano: 0,
      number_micro: 0,
      number_reels_nano: 0,
      number_stories_nano: 0,
      number_reels_micro: 0,
      number_stories_micro: 0,
      price: 0,
      reach_package: 0,
      cpv: 0,
    };
  }

  //TikTok

  salesListTikTokUno: SaleTikTokUno[] = [];

  newSaleTikTokUno: SaleTikTokUno = {
    country: '',
    number_nano: 40,
    number_micro: 20,
    number_tiktok_nano: 2,
    number_tiktok_micro: 2,
    price: 0,
    reach_package: 0,
    cpv: 0,
  };

  salesListTikTokDos: SaleTikTokDos[] = [];

  newSaleTikTokDos: SaleTikTokDos = {
    country: '',
    number_nano: 30,
    number_micro: 40,
    number_tiktok_nano: 2,
    number_tiktok_micro: 2,
    price: 0,
    reach_package: 0,
    cpv: 0,
  };

  addSaleTikTokUno() {
    this.salesListTikTokUno.push({ ...this.newSaleTikTokUno });
    // Limpiar el formulario después de agregar la venta
    // this.resetFormTikTokUno();
    console.log(this.salesListTikTokUno);
  }

  addSaleTikTokDos() {
    this.salesListTikTokDos.push({ ...this.newSaleTikTokDos });
    // Limpiar el formulario después de agregar la venta
    console.log(this.salesListTikTokDos);
  }

  resetFormTikTokUno() {
    this.newSaleTikTokUno = {
      country: '',
      number_nano: 0,
      number_micro: 0,
      number_tiktok_nano: 0,
      number_tiktok_micro: 0,
      price: 0,
      reach_package: 0,
      cpv: 0,
    };
  }

  resetFormTikTokDos() {
    this.newSaleTikTokUno = {
      country: '',
      number_nano: 0,
      number_micro: 0,
      number_tiktok_nano: 0,
      number_tiktok_micro: 0,
      price: 0,
      reach_package: 0,
      cpv: 0,
    };
  }

  // General paquetes
  numeroMicro: number = 10;
  numeroNano: number = 10;

  // Paquetes Instagram
  numeroReelsNano: number = 10;
  numeroStoriesNano: number = 10;
  numeroReelsMicro = 10;
  numeroStoriesMicro: number = 10;

  // Paquetes TikTok
  numeroTikToksNano: number = 10;
  numeroTikToksMicro: number = 10;

  name_client = new FormControl('', Validators.required);
  country = new FormControl('', Validators.required);
  cities = new FormControl('', Validators.required);

  citiesArgentina = new FormControl('', Validators.required);
  citiesBolivia = new FormControl('', Validators.required);
  citiesBrasil = new FormControl('', Validators.required);
  citiesChile = new FormControl('', Validators.required);
  citiesColombia = new FormControl('', Validators.required);
  citiesEcuador = new FormControl('', Validators.required);
  citiesParaguay = new FormControl('', Validators.required);
  citiesPeru = new FormControl('', Validators.required);
  citiesUruguay = new FormControl('', Validators.required);
  citiesVenezuela = new FormControl('', Validators.required);
  citiesCostaRica = new FormControl('', Validators.required);
  citiesCuba = new FormControl('', Validators.required);
  citiesElSalvador = new FormControl('', Validators.required);
  citiesGuatemala = new FormControl('', Validators.required);
  citiesHonduras = new FormControl('', Validators.required);
  citiesMexico = new FormControl('', Validators.required);
  citiesNicaragua = new FormControl('', Validators.required);
  citiesPanama = new FormControl('', Validators.required);
  citiesPuertoRico = new FormControl('', Validators.required);
  citiesDominicanRepublic = new FormControl('', Validators.required);
  citiesUnitedStates = new FormControl('', Validators.required);
  citiesCanada = new FormControl('', Validators.required);

  option_strategy = new FormControl('', Validators.required);
  price = new FormControl(null, Validators.required);
  campaign_objective = new FormControl('', Validators.required);
  brief_campaign_objective = new FormControl('', Validators.required);
  countryFinal: string = 'Nada';
  saveClientForm: FormGroup;

  constructor(
    private service: AuthService,
    private crowdpostingService: CrowdpostingService,
    private router: Router,
    private citiesService: CitiesService,
    private messageService: MessageService
  ) {
    (this.showInstagramPackage = false), (this.showTikTokPackage = false);
    this.saveClientForm = new FormGroup({
      citiesArgentina: this.citiesArgentina,
      citiesBolivia: this.citiesBolivia,
      citiesBrasil: this.citiesBrasil,
      citiesChile: this.citiesChile,
      citiesColombia: this.citiesColombia,
      citiesEcuador: this.citiesEcuador,
      citiesParaguay: this.citiesParaguay,
      citiesPeru: this.citiesPeru,
      citiesUruguay: this.citiesUruguay,
      citiesVenezuela: this.citiesVenezuela,
      citiesCostaRica: this.citiesCostaRica,
      citiesCuba: this.citiesCuba,
      citiesElSalvador: this.citiesElSalvador,
      citiesGuatemala: this.citiesGuatemala,
      citiesHonduras: this.citiesHonduras,
      citiesMexico: this.citiesMexico,
      citiesNicaragua: this.citiesNicaragua,
      citiesPanama: this.citiesPanama,
      citiesPuertoRico: this.citiesPuertoRico,
      citiesDominicanRepublic: this.citiesDominicanRepublic,
      citiesUnitedStates: this.citiesUnitedStates,
      citiesCanada: this.citiesCanada,

      option_strategy: this.option_strategy,
      name_client: this.name_client,
      country: this.country,
      cities: this.cities,
      price: this.price,
      campaign_objective: this.campaign_objective,
      brief_campaign_objective: this.brief_campaign_objective,
    });
  }

  ngOnInit() {
    this.service.verificarToken();
    this.getCities();
  }

  saveClientCrowdposting() {
    console.log(this.saveClientForm.value);
    this.crowdpostingService
      .saveSaleCrowdposting(this.saveClientForm.value)
      .subscribe(() => {
        console.log();
      });
    localStorage.setItem('Country', this.countryFinal);
  }

  optionStrategy: number[] = [];
  async savePackagesCrowdposting() {
    // Envio del formulario a la BD
    // this.saveClientCrowdposting();
    // console.log(this.salesListInstagramUno);
    // this.crowdpostingService
    //   .savePackageCrowdpostingInstagam(this.salesListInstagramUno)
    //   .subscribe(() => {
    //     console.log();
    //     alert('¡La compra se envio con exito!');
    //   });
    // console.log(this.salesListTikTokUno);
    // this.crowdpostingService
    //   .savePackageCrowdpostingTikTok(this.salesListTikTokUno)
    //   .subscribe(() => {
    //     console.log();
    //     alert('¡La compra se envio con exito!');
    //   });
    // Generador del PDF

    PdfMakeWrapper.setFonts(pdfFonts, {
      custom: {
        normal: 'Poppins-Regular.ttf',
        bold: 'Poppins-Bold.ttf',
        italics: 'Poppins-Italic.ttf',
        bolditalics: 'Poppins-BlackItalic.ttf',
      },
    });

    PdfMakeWrapper.useFont('custom');

    const pdf = new PdfMakeWrapper();
    pdf.pageSize('A4');
    pdf.pageOrientation('landscape');

    // Añadir texto con fuente personalizada

    pdf.add(
      await new Img('assets/images/REAL UP.png')
        .width('200')
        .alignment('center')
        .build()
    );

    pdf.add(
      new Txt('“We are Top-Notch in the creator economy”')
        .font('custom')
        .fontSize(25)
        .alignment('center')
        .color('#d20981')
        .bold().end
    );

    pdf.add(
      new Txt(' Real influence, Real Results ')
        .font('custom')
        .fontSize(20)
        .alignment('center')
        .color('#ffffff')
        .background('#d20f80')

        .bold().end
    );

    if (this.optionStrategy.includes(0)) {
      pdf.add(new Txt('Campaign objective | Awareness').bold().end);
      pdf.add(
        new Txt(
          'This campaign aims to increase brand visibility and recognition among your target audience, making your brand known and generating initial interest.'
        ).end
      );
    }

    if (this.optionStrategy.includes(1)) {
      pdf.add(new Txt('Campaign objective | Consideration').bold().end);
      pdf.add(
        new Txt(
          'This campaign provides key information to help consumers consider your product as a viable option, highlighting its unique benefits and features.'
        ).end
      );
    }

    if (this.optionStrategy.includes(2)) {
      pdf.add(new Txt('Campaign objective | Conversion').bold().end);
      pdf.add(
        new Txt(
          'This campaign focuses on motivating consumers to take a specific action, such as making a purchase or signing up, turning interest into concrete actions.'
        ).end
      );
    }

    if (this.optionStrategy.includes(3)) {
      pdf.add(new Txt('Campaign objective | Loyalty').bold().end);
      pdf.add(
        new Txt(
          'This campaign aims to strengthen relationships with existing customers, encouraging repeat purchases and promoting brand loyalty.'
        ).end
      );
    }

    // pdf.add(new Txt('CIUDADES').end);

    // this.selectedCities.forEach((city) => {
    //   pdf.add(new Txt(`- ${city.name}`).fontSize(12).end);
    // });

    pdf.create().download('formulario.pdf');

    // if (this.showInstagramPackage === true) {
    //   // Numero de creadores
    //   pdf.add(new Txt('*INFLUENCERS POR CIUDAD').end);
    //   if (
    //     this.newSaleInstagramUno.number_micro > 0 &&
    //     this.newSaleInstagramUno.number_nano === 0
    //   ) {
    //     pdf.add(new Txt(`${this.newSaleInstagramUno.number_micro} Micro`).end);
    //   }
    //   if (
    //     this.newSaleInstagramUno.number_nano > 0 &&
    //     this.newSaleInstagramUno.number_micro === 0
    //   ) {
    //     pdf.add(new Txt(`${this.newSaleInstagramUno.number_nano} Nano`).end);
    //   }
    //   if (
    //     this.newSaleInstagramUno.number_nano > 0 &&
    //     this.newSaleInstagramUno.number_micro > 0
    //   ) {
    //     pdf.add(
    //       new Txt(
    //         `${this.newSaleInstagramUno.number_micro} Micro + ${this.newSaleInstagramUno.number_nano} Nano`
    //       ).end
    //     );
    //   }
    //   pdf.add(new Txt('*ACCIONES POR INFLUENCER').end);
    //   if (
    //     this.newSaleInstagramUno.number_micro > 0 &&
    //     this.newSaleInstagramUno.number_nano === 0
    //   ) {
    //     pdf.add(new Txt(`Micro Influencers (10K - 100K)`).end);
    //     pdf.add(
    //       new Ul([
    //         `${this.newSaleInstagramUno.number_reels_micro} Reel`,
    //         `${this.newSaleInstagramUno.number_stories_micro} Instagram Story`,
    //       ]).type('circle').end
    //     );
    //   }
    //   if (
    //     this.newSaleInstagramUno.number_nano > 0 &&
    //     this.newSaleInstagramUno.number_micro === 0
    //   ) {
    //     pdf.add(new Txt(`Nano Influencers (1K - 10K)`).end);
    //     pdf.add(
    //       new Ul([
    //         `${this.newSaleInstagramUno.number_reels_nano} Reel`,
    //         `${this.newSaleInstagramUno.number_stories_nano} Instagram Story`,
    //       ]).type('circle').end
    //     );
    //   }
    //   if (
    //     this.newSaleInstagramUno.number_nano > 0 &&
    //     this.newSaleInstagramUno.number_micro > 0
    //   ) {
    //     pdf.add(new Txt(`Micro Influencers (10K - 100K)`).end);

    //     pdf.add(
    //       new Ul([
    //         `${this.newSaleInstagramUno.number_reels_micro} Reel`,
    //         `${this.newSaleInstagramUno.number_stories_micro} Instagram Story`,
    //       ]).type('circle').end
    //     );
    //     pdf.add(new Txt(`Nano Influencers (1K - 10K)`).end);
    //     pdf.add(
    //       new Ul([
    //         `${this.newSaleInstagramUno.number_reels_nano} Reel`,
    //         `${this.newSaleInstagramUno.number_stories_nano} Instagram Story`,
    //       ]).type('circle').end
    //     );
    //     pdf.add(new Txt(`Contenidos Totales: ${this.totalContentIgOne}`).end);
    //     pdf.add(new Txt(`Alcance: ${this.ReachTotalPaqueteUno}`).end);
    //     pdf.add(
    //       new Txt(
    //         `Budget: ${(
    //           this.ValorTotalPaqueteUno +
    //           (0.35 * this.ValorTotalPaqueteUno) / 0.65
    //         ).toFixed(2)}`
    //       ).end
    //     );
    //   }
    // }

    // if (this.showTikTokPackage === true) {
    //   pdf.add(new Txt('Hola esto es TikTok').end);
    //   if (this.newSaleTikTokUno.number_micro > 0) {
    //     pdf.add(new Txt('Si hay TikTok micros').end);
    //   }
    //   if (this.newSaleTikTokUno.number_nano > 0) {
    //     pdf.add(new Txt('Si hay TikTok nanos').end);
    //   }
    // }

    // Generar tabla

    pdf.add(
      new Table([
        [
          new Cell(
            new Txt('Perfiles').bold().alignment('center').end
          ).fillColor('#61eae6').end,
          new Cell(
            new Txt('Cantidad').bold().alignment('center').end
          ).fillColor('#61eae6').end,
          new Cell(
            new Txt('Contenidos').bold().alignment('center').end
          ).fillColor('#61eae6').end,
          new Cell(
            new Txt('Total Contenidos').bold().alignment('center').end
          ).fillColor('#61eae6').end,
          new Cell(new Txt('Reach').bold().alignment('center').end).fillColor(
            '#61eae6'
          ).end,
          new Cell(new Txt('Budget').bold().alignment('center').end).fillColor(
            '#61eae6'
          ).end,
          new Cell(new Txt('CPV').bold().alignment('center').end).fillColor(
            '#61eae6'
          ).end,
        ],

        [
          'Nanos',
          `${this.newSaleInstagramUno.number_nano}`,
          `${this.newSaleInstagramUno.number_stories_nano} Stories + ${this.newSaleInstagramUno.number_reels_nano} Reel`,
          `${
            this.newSaleInstagramUno.number_stories_nano *
            this.newSaleInstagramUno.number_nano
          } Stories + ${
            this.newSaleInstagramUno.number_reels_nano *
            this.newSaleInstagramUno.number_nano
          } Reel`,
          new Cell(new Txt('').end).border([true, true, true, false]).end,
          new Cell(new Txt('').end).border([true, true, true, false]).end,
          new Cell(new Txt('').end).border([true, true, true, false]).end,
        ],
        [
          'Micros',
          `${this.newSaleInstagramUno.number_micro}`,
          `${this.newSaleInstagramUno.number_stories_micro} Stories + ${this.newSaleInstagramUno.number_reels_micro} Reel`,
          `${
            this.newSaleInstagramUno.number_stories_micro *
            this.newSaleInstagramUno.number_micro
          } Stories + ${
            this.newSaleInstagramUno.number_reels_micro *
            this.newSaleInstagramUno.number_micro
          } Reel`,
          new Cell(new Txt(`${this.ReachTotalPaqueteUno}`).end)
            .rowSpan(2)
            .border([true, false, true, true]).end,
          new Cell(
            new Txt(
              `${(
                this.ValorTotalPaqueteUno +
                (0.35 * this.ValorTotalPaqueteUno) / 0.65
              ).toFixed(2)} USD`
            ).end
          )
            .rowSpan(2)
            .border([true, false, true, true]).end,
          new Cell(
            new Txt(
              `${(
                (this.ValorTotalPaqueteUno +
                  (0.35 * this.ValorTotalPaqueteUno) / 0.65) /
                this.ReachTotalPaqueteUno
              ).toFixed(2)}`
            ).end
          )
            .rowSpan(2)
            .border([true, false, true, true]).end,
        ],

        [
          new Cell(new Txt('TOTAL').end)
            .fillColor('#f52bc9')
            .color('#ffffff')
            .bold().end,
          new Cell(
            new Txt(
              `${
                this.newSaleInstagramUno.number_micro +
                this.newSaleInstagramUno.number_nano
              }`
            ).end
          )
            .fillColor('#f52bc9')
            .color('#ffffff')
            .bold().end,
          new Cell(
            new Txt(
              `${
                this.newSaleInstagramUno.number_micro *
                  this.newSaleInstagramUno.number_stories_micro +
                this.newSaleInstagramUno.number_nano *
                  this.newSaleInstagramUno.number_stories_nano
              } Stories + ${
                this.newSaleInstagramUno.number_micro *
                  this.newSaleInstagramUno.number_reels_micro +
                this.newSaleInstagramUno.number_nano *
                  this.newSaleInstagramUno.number_reels_nano
              } Reels`
            ).end
          )
            .colSpan(2)
            .fillColor('#f52bc9')
            .color('#ffffff')
            .bold().end,
          null,
          null,
          null,
          null,
        ],
      ])
        .alignment('center')
        .widths('*')
        .margin([0, 10]).end
    );
  }

  whyUs: string = '';
  strategy: string = '';
  brand: string = '';

  ValorTotalPaqueteUno: number = 0;
  ValorTotalPaqueteDos: number = 0;
  ValorTotalPaqueteTres: number = 0;
  ValorTotalPaqueteCuatro: number = 0;

  ReachTotalPaqueteUno: number = 0;
  ReachTotalPaqueteDos: number = 0;
  ReachTotalPaqueteTres: number = 0;
  ReachTotalPaqueteCuatro: number = 0;

  valorStoryMicro: number = 0;
  valorReelMicro: number = 0;
  valorStoryNano: number = 0;
  valorReelNano: number = 0;

  reachStoryMicro: number = 0;
  reachReelMicro: number = 0;
  reachStoryNano: number = 0;
  reachReelNano: number = 0;

  //Personalizados
  ValorTotalPaqueteUnoNormal: number = 0;
  ValorTotalPaqueteDosNormal: number = 0;
  ValorTotalPaqueteTresNormal: number = 0;

  ReachTotalPaqueteUnoNormal: number = 0;
  ReachTotalPaqueteDosNormal: number = 0;
  ReachTotalPaqueteTresNormal: number = 0;

  changeValor() {
    console.log(this.selectedCountry);
    setTimeout(() => {
      if (
        this.selectedCountry.name == 'Argentina' ||
        this.selectedCountry.name == 'Bolivia' ||
        this.selectedCountry.name == 'Brasil' ||
        this.selectedCountry.name == 'Chile' ||
        this.selectedCountry.name == 'Paraguay' ||
        this.selectedCountry.name == 'Peru' ||
        this.selectedCountry.name == 'Uruguay' ||
        this.selectedCountry.name == 'Venezuela' ||
        this.selectedCountry.name == 'Guatemala' ||
        this.selectedCountry.name == 'Honduras' ||
        this.selectedCountry.name == 'Mexico' ||
        this.selectedCountry.name == 'Nicaragua'
      ) {
        this.valorStoryMicro = 75;
        this.valorReelMicro = 130;
        this.valorStoryNano = 51;
        this.valorReelNano = 90;

        this.reachStoryMicro = 1700;
        this.reachReelMicro = 2800;
        this.reachStoryNano = 1000;
        this.reachReelNano = 1900;
      }

      if (this.selectedCountry.name == 'Colombia') {
        this.valorStoryMicro = 60;
        this.valorReelMicro = 95;
        this.valorStoryNano = 35;
        this.valorReelNano = 70;

        this.reachStoryMicro = 1700;
        this.reachReelMicro = 2800;
        this.reachStoryNano = 1000;
        this.reachReelNano = 1900;
      }
      if (
        this.selectedCountry.name == 'Ecuador' ||
        this.selectedCountry.name == 'Costa Rica' ||
        this.selectedCountry.name == 'Cuba' ||
        this.selectedCountry.name == 'El Salvador' ||
        this.selectedCountry.name == 'Panama' ||
        this.selectedCountry.name == 'Puerto Rico' ||
        this.selectedCountry.name == 'Dominican Republic' ||
        this.selectedCountry.name == 'Canada'
      ) {
        this.valorStoryMicro = 110;
        this.valorReelMicro = 170;
        this.valorStoryNano = 70;
        this.valorReelNano = 120;

        this.reachStoryMicro = 1700;
        this.reachReelMicro = 2800;
        this.reachStoryNano = 1000;
        this.reachReelNano = 1900;
      }

      if (this.selectedCountry.name == 'United States') {
        this.valorStoryMicro = 140;
        this.valorReelMicro = 210;
        this.valorStoryNano = 70;
        this.valorReelNano = 120;

        this.reachStoryMicro = 1700;
        this.reachReelMicro = 2800;
        this.reachStoryNano = 1000;
        this.reachReelNano = 1900;
      }

      //Preselectos

      this.ValorTotalPaqueteUnoNormal =
        this.valorStoryMicro * (15 * 3) +
        this.valorReelMicro * (15 * 1) +
        this.valorStoryNano * (30 * 3) +
        this.valorReelNano * (30 * 1);

      this.ValorTotalPaqueteDosNormal =
        this.valorReelMicro * (15 * 1) + this.valorReelNano * (30 * 1);

      this.ValorTotalPaqueteTresNormal =
        this.valorStoryMicro * (15 * 3) +
        this.valorReelMicro * (15 * 1) +
        this.valorStoryNano * (30 * 3) +
        this.valorReelNano * (30 * 1);

      //Reach

      this.ReachTotalPaqueteUnoNormal =
        this.reachStoryMicro * (15 * 3) +
        this.reachReelMicro * (15 * 1) +
        this.reachStoryNano * (30 * 3) +
        this.reachReelNano * (30 * 1);

      this.ReachTotalPaqueteDosNormal =
        this.reachReelMicro * (15 * 1) + this.reachReelNano * (30 * 1);

      this.ReachTotalPaqueteTresNormal =
        this.reachStoryMicro * (15 * 3) +
        this.reachReelMicro * (15 * 1) +
        this.reachStoryNano * (30 * 3) +
        this.reachReelNano * (30 * 1);

      //Personalizados

      this.ValorTotalPaqueteUno =
        this.valorStoryMicro *
          (this.newSaleInstagramUno.number_micro *
            this.newSaleInstagramUno.number_stories_micro) +
        this.valorReelMicro *
          (this.newSaleInstagramUno.number_micro *
            this.newSaleInstagramUno.number_reels_micro) +
        this.valorStoryNano *
          (this.newSaleInstagramUno.number_nano *
            this.newSaleInstagramUno.number_stories_nano) +
        this.valorReelNano *
          (this.newSaleInstagramUno.number_nano *
            this.newSaleInstagramUno.number_reels_nano);

      this.ValorTotalPaqueteTres =
        this.valorReelMicro *
          (this.newSaleTikTokUno.number_micro *
            this.newSaleTikTokUno.number_tiktok_micro) +
        this.valorReelNano *
          (this.newSaleTikTokUno.number_nano *
            this.newSaleTikTokUno.number_tiktok_nano);

      this.ValorTotalPaqueteDos =
        this.valorStoryMicro *
          (this.newSaleInstagramDos.number_micro *
            this.newSaleInstagramDos.number_stories_micro) +
        this.valorReelMicro *
          (this.newSaleInstagramDos.number_micro *
            this.newSaleInstagramDos.number_reels_micro) +
        this.valorStoryNano *
          (this.newSaleInstagramDos.number_nano *
            this.newSaleInstagramDos.number_stories_nano) +
        this.valorReelNano *
          (this.newSaleInstagramDos.number_nano *
            this.newSaleInstagramDos.number_reels_nano);

      this.ValorTotalPaqueteCuatro =
        this.valorReelMicro *
          (this.newSaleTikTokDos.number_micro *
            this.newSaleTikTokDos.number_tiktok_micro) +
        this.valorReelNano *
          (this.newSaleTikTokDos.number_nano *
            this.newSaleTikTokDos.number_tiktok_nano);

      this.ReachTotalPaqueteUno =
        this.reachStoryMicro *
          (this.newSaleInstagramUno.number_micro *
            this.newSaleInstagramUno.number_stories_micro) +
        this.reachReelMicro *
          (this.newSaleInstagramUno.number_micro *
            this.newSaleInstagramUno.number_reels_micro) +
        this.reachStoryNano *
          (this.newSaleInstagramUno.number_nano *
            this.newSaleInstagramUno.number_stories_nano) +
        this.reachReelNano *
          (this.newSaleInstagramUno.number_nano *
            this.newSaleInstagramUno.number_reels_nano);

      this.ReachTotalPaqueteTres =
        this.reachReelMicro *
          (this.newSaleTikTokUno.number_micro *
            this.newSaleTikTokUno.number_tiktok_micro) +
        this.reachReelNano *
          (this.newSaleTikTokUno.number_nano *
            this.newSaleTikTokUno.number_tiktok_nano);

      this.ReachTotalPaqueteDos =
        this.reachStoryMicro *
          (this.newSaleInstagramDos.number_micro *
            this.newSaleInstagramDos.number_stories_micro) +
        this.reachReelMicro *
          (this.newSaleInstagramDos.number_micro *
            this.newSaleInstagramDos.number_reels_micro) +
        this.reachStoryNano *
          (this.newSaleInstagramDos.number_nano *
            this.newSaleInstagramDos.number_stories_nano) +
        this.reachReelNano *
          (this.newSaleInstagramDos.number_nano *
            this.newSaleInstagramDos.number_reels_nano);

      this.ReachTotalPaqueteCuatro =
        this.reachReelMicro *
          (this.newSaleTikTokDos.number_micro *
            this.newSaleTikTokDos.number_tiktok_micro) +
        this.reachReelNano *
          (this.newSaleTikTokDos.number_nano *
            this.newSaleTikTokDos.number_tiktok_nano);

      this.totalContentIgOne =
        this.newSaleInstagramUno.number_micro *
          (this.newSaleInstagramUno.number_reels_micro +
            this.newSaleInstagramUno.number_stories_micro) +
        this.newSaleInstagramUno.number_nano *
          (this.newSaleInstagramUno.number_reels_nano +
            this.newSaleInstagramUno.number_stories_nano);

      this.totalContentIgTwo =
        this.newSaleInstagramDos.number_micro *
          (this.newSaleInstagramDos.number_reels_micro +
            this.newSaleInstagramDos.number_stories_micro) +
        this.newSaleInstagramDos.number_nano *
          (this.newSaleInstagramDos.number_reels_nano +
            this.newSaleInstagramDos.number_stories_nano);
      this.totalContentTikTokOne =
        this.newSaleTikTokUno.number_micro *
          this.newSaleTikTokUno.number_tiktok_micro +
        this.newSaleTikTokUno.number_nano *
          this.newSaleTikTokUno.number_tiktok_nano;
      this.totalContentTikTokTwo =
        this.newSaleTikTokDos.number_micro *
          this.newSaleTikTokDos.number_tiktok_micro +
        this.newSaleTikTokDos.number_nano *
          this.newSaleTikTokDos.number_tiktok_nano;

      // Paquetes personalizados
      this.totalContenidos =
        this.numeroContentIgOne * 180 +
        this.numeroContentTikTokOne * 45 +
        this.numeroContentTikTokTwo * 180 +
        this.totalContentIgOne * this.numeroContentIgPersonal +
        this.totalContentTikTokOne * this.numeroContentTikTokPersonal;
    }, 100);
  }

  ValorPromedioContenidos: number = 0;
  totalContenidos: number = 0;
  citiesSelected = [];
  // Mostrar paquetes
  showInstagramPackage: boolean;
  showTikTokPackage: boolean;
  @ViewChild('carrousel') carrousel!: ElementRef;

  InstagramSelect(show: boolean) {
    this.showInstagramPackage = show;
    if (this.carrousel) {
      // Hacer scroll al objeto específico
      setTimeout(() => {
        this.carrousel.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }

  TikTokSelect(show: boolean) {
    this.showTikTokPackage = show;
    if (this.carrousel) {
      // Hacer scroll al objeto específico
      setTimeout(() => {
        this.carrousel.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);
    }
  }
  color: ThemePalette = 'primary';

  // Sumar y restar datos

  sumShort(variable: string) {
    this.changeValor();
    switch (variable) {
      case 'newSaleInstagramUno.number_micro':
        this.newSaleInstagramUno.number_micro += 1;
        break;

      case 'newSaleInstagramUno.number_stories_micro':
        this.newSaleInstagramUno.number_stories_micro += 1;
        break;

      case 'newSaleInstagramUno.number_reels_micro':
        this.newSaleInstagramUno.number_reels_micro += 1;
        break;

      case 'newSaleInstagramUno.number_nano':
        this.newSaleInstagramUno.number_nano += 1;
        break;

      case 'newSaleInstagramUno.number_stories_nano':
        this.newSaleInstagramUno.number_stories_nano += 1;
        break;

      case 'newSaleInstagramUno.number_reels_nano':
        this.newSaleInstagramUno.number_reels_nano += 1;
        break;

      // Paquete 2 Instagram

      case 'newSaleInstagramDos.number_micro':
        this.newSaleInstagramDos.number_micro += 1;
        break;

      case 'newSaleInstagramDos.number_stories_micro':
        this.newSaleInstagramDos.number_stories_micro += 1;
        break;

      case 'newSaleInstagramDos.number_reels_micro':
        this.newSaleInstagramDos.number_reels_micro += 1;
        break;

      case 'newSaleInstagramDos.number_nano':
        this.newSaleInstagramDos.number_nano += 1;
        break;

      case 'newSaleInstagramDos.number_stories_nano':
        this.newSaleInstagramDos.number_stories_nano += 1;
        break;

      case 'newSaleInstagramDos.number_reels_nano':
        this.newSaleInstagramDos.number_reels_nano += 1;
        break;

      // Paquete Uno TikTok

      case 'newSaleTikTokUno.number_micro':
        this.newSaleTikTokUno.number_micro += 1;
        break;

      case 'newSaleTikTokUno.number_tiktok_micro':
        this.newSaleTikTokUno.number_tiktok_micro += 1;
        break;

      case 'newSaleTikTokUno.number_nano':
        this.newSaleTikTokUno.number_nano += 1;
        break;

      case 'newSaleTikTokUno.number_tiktok_nano':
        this.newSaleTikTokUno.number_tiktok_nano += 1;
        break;

      // Paquete Dos TikTok

      case 'newSaleTikTokDos.number_micro':
        this.newSaleTikTokDos.number_micro += 1;
        break;

      case 'newSaleTikTokDos.number_tiktok_micro':
        this.newSaleTikTokDos.number_tiktok_micro += 1;
        break;

      case 'newSaleTikTokDos.number_nano':
        this.newSaleTikTokDos.number_nano += 1;
        break;

      case 'newSaleTikTokDos.number_tiktok_nano':
        this.newSaleTikTokDos.number_tiktok_nano += 1;
        break;

      case 'numeroContentIgOne':
        this.numeroContentIgOne += 1;
        break;

      case 'numeroContentIgTwo':
        this.numeroContentIgTwo += 1;
        break;

      case 'numeroContentTikTokOne':
        this.numeroContentTikTokOne += 1;
        break;

      case 'numeroContentTikTokTwo':
        this.numeroContentTikTokTwo += 1;
        break;

      case 'numeroContentIgPersonal':
        this.numeroContentIgPersonal += 1;
        break;

      case 'numeroContentTikTokPersonal':
        this.numeroContentTikTokPersonal += 1;
        break;
    }
  }

  restShort(variable: string) {
    this.changeValor();
    switch (variable) {
      case 'newSaleInstagramUno.number_micro':
        if (this.newSaleInstagramUno.number_micro > 0) {
          this.newSaleInstagramUno.number_micro -= 1;
        }
        break;

      case 'newSaleInstagramUno.number_stories_micro':
        if (this.newSaleInstagramUno.number_stories_micro > 0) {
          this.newSaleInstagramUno.number_stories_micro -= 1;
        }
        break;

      case 'newSaleInstagramUno.number_reels_micro':
        if (this.newSaleInstagramUno.number_reels_micro > 0) {
          this.newSaleInstagramUno.number_reels_micro -= 1;
        }
        break;

      case 'newSaleInstagramUno.number_nano':
        if (this.newSaleInstagramUno.number_nano > 0) {
          this.newSaleInstagramUno.number_nano -= 1;
        }
        break;

      case 'newSaleInstagramUno.number_stories_nano':
        if (this.newSaleInstagramUno.number_stories_nano > 0) {
          this.newSaleInstagramUno.number_stories_nano -= 1;
        }
        break;

      case 'newSaleInstagramUno.number_reels_nano':
        if (this.newSaleInstagramUno.number_reels_nano > 0) {
          this.newSaleInstagramUno.number_reels_nano -= 1;
        }
        break;

      // Paquete 2 Instagram

      case 'newSaleInstagramDos.number_micro':
        if (this.newSaleInstagramDos.number_micro > 0) {
          this.newSaleInstagramDos.number_micro -= 1;
        }
        break;

      case 'newSaleInstagramDos.number_stories_micro':
        if (this.newSaleInstagramDos.number_stories_micro > 0) {
          this.newSaleInstagramDos.number_stories_micro -= 1;
        }
        break;

      case 'newSaleInstagramDos.number_reels_micro':
        if (this.newSaleInstagramDos.number_reels_micro > 0) {
          this.newSaleInstagramDos.number_reels_micro -= 1;
        }
        break;

      case 'newSaleInstagramDos.number_nano':
        if (this.newSaleInstagramDos.number_nano > 0) {
          this.newSaleInstagramDos.number_nano -= 1;
        }
        break;

      case 'newSaleInstagramDos.number_stories_nano':
        if (this.newSaleInstagramDos.number_stories_nano > 0) {
          this.newSaleInstagramDos.number_stories_nano -= 1;
        }
        break;

      case 'newSaleInstagramDos.number_reels_nano':
        if (this.newSaleInstagramDos.number_reels_nano > 0) {
          this.newSaleInstagramDos.number_reels_nano -= 1;
        }
        break;

      // Paquete Uno TikTok

      case 'newSaleTikTokUno.number_micro':
        if (this.newSaleTikTokUno.number_micro > 0) {
          this.newSaleTikTokUno.number_micro -= 1;
        }
        break;

      case 'newSaleTikTokUno.number_tiktok_micro':
        if (this.newSaleTikTokUno.number_tiktok_micro > 0) {
          this.newSaleTikTokUno.number_tiktok_micro -= 1;
        }
        break;

      case 'newSaleTikTokUno.number_nano':
        if (this.newSaleTikTokUno.number_nano > 0) {
          this.newSaleTikTokUno.number_nano -= 1;
        }
        break;

      case 'newSaleTikTokUno.number_tiktok_nano':
        if (this.newSaleTikTokUno.number_tiktok_nano > 0) {
          this.newSaleTikTokUno.number_tiktok_nano -= 1;
        }
        break;

      // Paquete Dos TikTok

      case 'newSaleTikTokDos.number_micro':
        if (this.newSaleTikTokDos.number_micro > 0) {
          this.newSaleTikTokDos.number_micro -= 1;
        }
        break;

      case 'newSaleTikTokDos.number_tiktok_micro':
        if (this.newSaleTikTokDos.number_tiktok_micro > 0) {
          this.newSaleTikTokDos.number_tiktok_micro -= 1;
        }
        break;

      case 'newSaleTikTokDos.number_nano':
        if (this.newSaleTikTokDos.number_nano > 0) {
          this.newSaleTikTokDos.number_nano -= 1;
        }
        break;

      case 'newSaleTikTokDos.number_tiktok_nano':
        if (this.newSaleTikTokDos.number_tiktok_nano > 0) {
          this.newSaleTikTokDos.number_tiktok_nano -= 1;
        }
        break;

      case 'numeroContentIgOne':
        if (this.numeroContentIgOne > 0) {
          this.numeroContentIgOne -= 1;
        }
        break;

      case 'numeroContentIgTwo':
        if (this.numeroContentIgTwo > 0) {
          this.numeroContentIgTwo -= 1;
        }
        break;

      case 'numeroContentTikTokOne':
        if (this.numeroContentTikTokOne > 0) {
          this.numeroContentTikTokOne -= 1;
        }
        break;

      case 'numeroContentTikTokTwo':
        if (this.numeroContentTikTokTwo > 0) {
          this.numeroContentTikTokTwo -= 1;
        }
        break;

      case 'numeroContentIgPersonal':
        if (this.numeroContentIgPersonal > 0) {
          this.numeroContentIgPersonal -= 1;
        }
        break;

      case 'numeroContentTikTokPersonal':
        if (this.numeroContentTikTokPersonal > 0) {
          this.numeroContentTikTokPersonal -= 1;
        }
        break;
    }
  }

  citiesSelectedArgentina: { name: string; code: string }[] = [];
  citiesSelectedBolivia: { name: string; code: string }[] = [];
  citiesSelectedBrasil: { name: string; code: string }[] = [];
  citiesSelectedChile: { name: string; code: string }[] = [];
  citiesSelectedColombia: { name: string; code: string }[] = [];
  citiesSelectedEcuador: { name: string; code: string }[] = [];
  citiesSelectedParaguay: { name: string; code: string }[] = [];
  citiesSelectedPeru: { name: string; code: string }[] = [];
  citiesSelectedUruguay: { name: string; code: string }[] = [];
  citiesSelectedVenezuela: { name: string; code: string }[] = [];
  citiesSelectedCostaRica: { name: string; code: string }[] = [];
  citiesSelectedCuba: { name: string; code: string }[] = [];
  citiesSelectedElSalvador: { name: string; code: string }[] = [];
  citiesSelectedGuatemala: { name: string; code: string }[] = [];
  citiesSelectedHonduras: { name: string; code: string }[] = [];
  citiesSelectedMexico: { name: string; code: string }[] = [];
  citiesSelectedNicaragua: { name: string; code: string }[] = [];
  citiesSelectedPanama: { name: string; code: string }[] = [];
  citiesSelectedPuertoRico: { name: string; code: string }[] = [];
  citiesSelectedDominicanRepublic: { name: string; code: string }[] = [];
  citiesSelectedUnitedStates: { name: string; code: string }[] = [];
  citiesSelectedCanada: { name: string; code: string }[] = [];
  selectedCities: { name: string; code: string }[] = [];

  updateCitites() {
    if (this.selectedCountry.name === 'Argentina') {
      this.selectedCities = this.citiesSelectedArgentina.filter(
        (city) => city.name
      );
      console.log(this.selectedCities);
    }
    if (this.selectedCountry.name === 'Bolivia') {
      this.selectedCities = this.citiesSelectedBolivia;
    }
    if (this.selectedCountry.name === 'Brasil') {
      this.selectedCities = this.citiesSelectedBrasil;
    }
    if (this.selectedCountry.name === 'Chile') {
      this.selectedCities = this.citiesSelectedChile;
    }
    if (this.selectedCountry.name === 'Colombia') {
      this.selectedCities = this.citiesSelectedColombia;
    }
    if (this.selectedCountry.name === 'Ecuador') {
      this.selectedCities = this.citiesSelectedEcuador;
    }
    if (this.selectedCountry.name === 'Paraguay') {
      this.selectedCities = this.citiesSelectedParaguay;
    }
    if (this.selectedCountry.name === 'Peru') {
      this.selectedCities = this.citiesSelectedPeru;
    }
    if (this.selectedCountry.name === 'Uruguay') {
      this.selectedCities = this.citiesSelectedUruguay;
    }
    if (this.selectedCountry.name === 'Venezuela') {
      this.selectedCities = this.citiesSelectedVenezuela;
    }
    if (this.selectedCountry.name === 'Costa Rica') {
      this.selectedCities = this.citiesSelectedCostaRica;
    }
    if (this.selectedCountry.name === 'Cuba') {
      this.selectedCities = this.citiesSelectedCuba;
    }
    if (this.selectedCountry.name === 'El Salvador') {
      this.selectedCities = this.citiesSelectedElSalvador;
    }
    if (this.selectedCountry.name === 'Guatemala') {
      this.selectedCities = this.citiesSelectedGuatemala;
    }
    if (this.selectedCountry.name === 'Honduras') {
      this.selectedCities = this.citiesSelectedHonduras;
    }
    if (this.selectedCountry.name === 'Mexico') {
      this.selectedCities = this.citiesSelectedMexico;
    }
    if (this.selectedCountry.name === 'Nicaragua') {
      this.selectedCities = this.citiesSelectedNicaragua;
    }
    if (this.selectedCountry.name === 'Panama') {
      this.selectedCities = this.citiesSelectedPanama;
    }
    if (this.selectedCountry.name === 'Puerto Rico') {
      this.selectedCities = this.citiesSelectedPuertoRico;
    }
    if (this.selectedCountry.name === 'Dominican Republic') {
      this.selectedCities = this.citiesSelectedDominicanRepublic;
    }
    if (this.selectedCountry.name === 'United States') {
      this.selectedCities = this.citiesSelectedUnitedStates;
    }
    if (this.selectedCountry.name === 'Canada') {
      this.selectedCities = this.citiesSelectedCanada;
    }
  }

  // Calculo totales
  numeroContentIgPersonal: number = 0;
  numeroContentTikTokPersonal: number = 0;
  totalContentIgOne: number = 0;
  totalContentIgTwo: number = 0;
  totalContentTikTokOne: number = 0;
  totalContentTikTokTwo: number = 0;
  numeroContentIgOne: number = 0;
  numeroContentIgTwo: number = 0;
  numeroContentTikTokOne: number = 0;
  numeroContentTikTokTwo: number = 0;

  // Mostrar ciudades

  verificarArgentina: boolean = false;
  verificarBolivia: boolean = false;
  verificarBrasil: boolean = false;
  verificarChile: boolean = false;
  verificarColombia: boolean = false;
  verificarEcuador: boolean = false;
  verificarParaguay: boolean = false;
  verificarPeru: boolean = false;
  verificarUruguay: boolean = false;
  verificarVenezuela: boolean = false;
  verificarCostaRica: boolean = false;
  verificarCuba: boolean = false;
  verificarElSalvador: boolean = false;
  verificarGuatemala: boolean = false;
  verificarHonduras: boolean = false;
  verificarMexico: boolean = false;
  verificarNicaragua: boolean = false;
  verificarPanama: boolean = false;
  verificarPuertoRico: boolean = false;
  verificarDominicanRepublic: boolean = false;
  verificarUnitedStates: boolean = false;
  verificarCanada: boolean = false;

  showCities() {
    this.verificarArgentina = false;
    this.verificarBolivia = false;
    this.verificarBrasil = false;
    this.verificarChile = false;
    this.verificarColombia = false;
    this.verificarEcuador = false;
    this.verificarParaguay = false;
    this.verificarPeru = false;
    this.verificarUruguay = false;
    this.verificarVenezuela = false;
    this.verificarCostaRica = false;
    this.verificarCuba = false;
    this.verificarElSalvador = false;
    this.verificarGuatemala = false;
    this.verificarHonduras = false;
    this.verificarMexico = false;
    this.verificarNicaragua = false;
    this.verificarPanama = false;
    this.verificarPuertoRico = false;
    this.verificarDominicanRepublic = false;
    this.verificarUnitedStates = false;
    this.verificarCanada = false;

    if (this.selectedCountry.name === 'Argentina') {
      this.verificarArgentina = true;
    } else {
      this.verificarArgentina = false;
    }
    if (this.selectedCountry.name === 'Bolivia') {
      this.verificarBolivia = true;
    } else {
      this.verificarBolivia = false;
    }
    if (this.selectedCountry.name === 'Brasil') {
      this.verificarBrasil = true;
    } else {
      this.verificarBrasil = false;
    }
    if (this.selectedCountry.name === 'Chile') {
      this.verificarChile = true;
    } else {
      this.verificarChile = false;
    }
    if (this.selectedCountry.name === 'Colombia') {
      this.verificarColombia = true;
    } else {
      this.verificarColombia = false;
    }
    if (this.selectedCountry.name === 'Ecuador') {
      this.verificarEcuador = true;
    } else {
      this.verificarEcuador = false;
    }
    if (this.selectedCountry.name === 'Paraguay') {
      this.verificarParaguay = true;
    } else {
      this.verificarParaguay = false;
    }
    if (this.selectedCountry.name === 'Peru') {
      this.verificarPeru = true;
    } else {
      this.verificarPeru = false;
    }
    if (this.selectedCountry.name === 'Uruguay') {
      this.verificarUruguay = true;
    } else {
      this.verificarUruguay = false;
    }
    if (this.selectedCountry.name === 'Venezuela') {
      this.verificarVenezuela = true;
    }
    if (this.selectedCountry.name === 'Costa Rica') {
      this.verificarCostaRica = true;
    }
    if (this.selectedCountry.name === 'Cuba') {
      this.verificarCuba = true;
    }
    if (this.selectedCountry.name === 'El Salvador') {
      this.verificarElSalvador = true;
    }
    if (this.selectedCountry.name === 'Guatemala') {
      this.verificarGuatemala = true;
    }
    if (this.selectedCountry.name === 'Honduras') {
      this.verificarHonduras = true;
    }
    if (this.selectedCountry.name === 'Mexico') {
      this.verificarMexico = true;
    }
    if (this.selectedCountry.name === 'Nicaragua') {
      this.verificarNicaragua = true;
    }
    if (this.selectedCountry.name === 'Panama') {
      this.verificarPanama = true;
    }
    if (this.selectedCountry.name === 'Puerto Rico') {
      this.verificarPuertoRico = true;
    }
    if (this.selectedCountry.name === 'Dominican Republic') {
      this.verificarDominicanRepublic = true;
    }
    if (this.selectedCountry.name === 'United States') {
      this.verificarUnitedStates = true;
    }
    if (this.selectedCountry.name === 'Canada') {
      this.verificarCanada = true;
    }
  }

  getCities() {
    this.citiesService.seeCitiesArgentina().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListArgentina = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesBolivia().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListBolivia = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesBrazil().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListBrasil = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesChile().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListChile = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesColombia().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListColombia = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesEcuador().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListEcuador = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesParaguay().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListParaguay = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesPeru().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListPeru = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesUruguay().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListUruguay = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesVenezuela().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListVenezuela = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesCostaRica().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListCostaRica = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesCuba().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListCuba = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesElSalvador().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListElSalvador = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesGuatemala().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListGuatemala = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesHonduras().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListHonduras = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesMexico().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListMexico = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesNicaragua().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListNicaragua = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesPanama().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListPanama = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesPuertoRico().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListPuertoRico = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesDominicanRepublic().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListDominicanRepublic = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesUnitedStates().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListUnitedStates = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );

    this.citiesService.seeCitiesCanada().subscribe(
      (cities: { name: string; code: string }[]) => {
        this.citiesListCanada = cities;
      },
      (error) => {
        console.error('Error al obtener las ciudades:', error);
      }
    );
  }

  // Check Platform

  checkPlatform: boolean = false;

  changePlatform() {
    this.checkPlatform = !this.checkPlatform;
  }

  // Campaing Objetives

  options = [
    { id: 'awareness', label: 'Awareness', value: 0 },
    { id: 'consideration', label: 'Consideration', value: 1 },
    { id: 'conversion', label: 'Conversion', value: 2 },
    { id: 'loyalty', label: 'Loyalty', value: 3 },
  ];

  // Nuevos Input
  username: string = '';

  // Nuevo boton
  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Quote sent',
      detail: 'Our sales team will respond within one business day.',
      key: 'br',
      life: 3000,
    });
  }
}
