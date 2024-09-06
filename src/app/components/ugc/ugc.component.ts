import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';

import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AuthService } from '../../services/auth.service';
import { UgcService } from '../../services/ugc.service';
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

interface Country {
  name: string;
}

PdfMakeWrapper.setFonts(pdfFonts, {
  custom: {
    normal: 'Poppins-Regular.ttf',
    bold: 'Poppins-Regular.ttf',
    italics: 'Poppins-Regular.ttf',
    bolditalics: 'Poppins-Regular.ttf',
  },
});

PdfMakeWrapper.useFont('custom');
@Component({
  selector: 'app-ugc',
  templateUrl: './ugc.component.html',
  styleUrls: ['./ugc.component.css'],
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
})
export class UgcComponent implements OnInit {
  selectedCountry: Country[] = [];

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

  citiesFinal: { name: string; code: string }[] = [];

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

  countryHtml: string = 'Selecciona el pais';

  //Implementacion combinacion de forms
  combinedForm: FormGroup;
  formGroupCities: FormGroup;
  saveUGCForm: FormGroup;

  formGroupCitiesArgentina: FormGroup;
  formGroupCitiesBolivia: FormGroup;
  formGroupCitiesBrasil: FormGroup;
  formGroupCitiesChile: FormGroup;
  formGroupCitiesColombia: FormGroup;
  formGroupCitiesEcuador: FormGroup;
  formGroupCitiesParaguay: FormGroup;
  formGroupCitiesPeru: FormGroup;
  formGroupCitiesUruguay: FormGroup;
  formGroupCitiesVenezuela: FormGroup;
  formGroupCitiesCostaRica: FormGroup;
  formGroupCitiesCuba: FormGroup;
  formGroupCitiesElSalvador: FormGroup;
  formGroupCitiesGuatemala: FormGroup;
  formGroupCitiesHonduras: FormGroup;
  formGroupCitiesMexico: FormGroup;
  formGroupCitiesNicaragua: FormGroup;
  formGroupCitiesPanama: FormGroup;
  formGroupCitiesPuertoRico: FormGroup;
  formGroupCitiesDominicanRepublic: FormGroup;
  formGroupCitiesUnitedStates: FormGroup;
  formGroupCitiesCanada: FormGroup;

  //
  summary: number = 0;
  videoCount: number = 0;
  selectedVideoType: string = '';

  //  Number of contents for each country
  ValorTotal: number = 0;
  numeroCarrousel: number = 0;
  numeroLongVideos: number = 0;
  numeroShortVideos: number = 0;
  numeroCreadores: number = 0;

  ValorTotalArgentina: number = 0;
  numeroCarrouselArgentina: number = 0;
  numeroLongVideosArgentina: number = 0;
  numeroShortVideosArgentina: number = 0;
  numeroCreadoresArgentina: number = 0;

  ValorTotalBolivia: number = 0;
  numeroCarrouselBolivia: number = 0;
  numeroLongVideosBolivia: number = 0;
  numeroShortVideosBolivia: number = 0;
  numeroCreadoresBolivia: number = 0;

  ValorTotalBrasil: number = 0;
  numeroCarrouselBrasil: number = 0;
  numeroLongVideosBrasil: number = 0;
  numeroShortVideosBrasil: number = 0;
  numeroCreadoresBrasil: number = 0;

  ValorTotalChile: number = 0;
  numeroCarrouselChile: number = 0;
  numeroLongVideosChile: number = 0;
  numeroShortVideosChile: number = 0;
  numeroCreadoresChile: number = 0;

  ValorTotalColombia: number = 0;
  numeroCarrouselColombia: number = 0;
  numeroLongVideosColombia: number = 0;
  numeroShortVideosColombia: number = 0;
  numeroCreadoresColombia: number = 0;

  ValorTotalEcuador: number = 0;
  numeroCarrouselEcuador: number = 0;
  numeroLongVideosEcuador: number = 0;
  numeroShortVideosEcuador: number = 0;
  numeroCreadoresEcuador: number = 0;

  ValorTotalParaguay: number = 0;
  numeroCarrouselParaguay: number = 0;
  numeroLongVideosParaguay: number = 0;
  numeroShortVideosParaguay: number = 0;
  numeroCreadoresParaguay: number = 0;

  ValorTotalPeru: number = 0;
  numeroCarrouselPeru: number = 0;
  numeroLongVideosPeru: number = 0;
  numeroShortVideosPeru: number = 0;
  numeroCreadoresPeru: number = 0;

  ValorTotalUruguay: number = 0;
  numeroCarrouselUruguay: number = 0;
  numeroLongVideosUruguay: number = 0;
  numeroShortVideosUruguay: number = 0;
  numeroCreadoresUruguay: number = 0;

  ValorTotalVenezuela: number = 0;
  numeroCarrouselVenezuela: number = 0;
  numeroLongVideosVenezuela: number = 0;
  numeroShortVideosVenezuela: number = 0;
  numeroCreadoresVenezuela: number = 0;

  ValorTotalCostaRica: number = 0;
  numeroCarrouselCostaRica: number = 0;
  numeroLongVideosCostaRica: number = 0;
  numeroShortVideosCostaRica: number = 0;
  numeroCreadoresCostaRica: number = 0;

  ValorTotalCuba: number = 0;
  numeroCarrouselCuba: number = 0;
  numeroLongVideosCuba: number = 0;
  numeroShortVideosCuba: number = 0;
  numeroCreadoresCuba: number = 0;

  ValorTotalElSalvador: number = 0;
  numeroCarrouselElSalvador: number = 0;
  numeroLongVideosElSalvador: number = 0;
  numeroShortVideosElSalvador: number = 0;
  numeroCreadoresElSalvador: number = 0;

  ValorTotalGuatemala: number = 0;
  numeroCarrouselGuatemala: number = 0;
  numeroLongVideosGuatemala: number = 0;
  numeroShortVideosGuatemala: number = 0;
  numeroCreadoresGuatemala: number = 0;

  ValorTotalHonduras: number = 0;
  numeroCarrouselHonduras: number = 0;
  numeroLongVideosHonduras: number = 0;
  numeroShortVideosHonduras: number = 0;
  numeroCreadoresHonduras: number = 0;

  ValorTotalMexico: number = 0;
  numeroCarrouselMexico: number = 0;
  numeroLongVideosMexico: number = 0;
  numeroShortVideosMexico: number = 0;
  numeroCreadoresMexico: number = 0;

  ValorTotalNicaragua: number = 0;
  numeroCarrouselNicaragua: number = 0;
  numeroLongVideosNicaragua: number = 0;
  numeroShortVideosNicaragua: number = 0;
  numeroCreadoresNicaragua: number = 0;

  ValorTotalPanama: number = 0;
  numeroCarrouselPanama: number = 0;
  numeroLongVideosPanama: number = 0;
  numeroShortVideosPanama: number = 0;
  numeroCreadoresPanama: number = 0;

  ValorTotalPuertoRico: number = 0;
  numeroCarrouselPuertoRico: number = 0;
  numeroLongVideosPuertoRico: number = 0;
  numeroShortVideosPuertoRico: number = 0;
  numeroCreadoresPuertoRico: number = 0;

  ValorTotalDominicanRepublic: number = 0;
  numeroCarrouselDominicanRepublic: number = 0;
  numeroLongVideosDominicanRepublic: number = 0;
  numeroShortVideosDominicanRepublic: number = 0;
  numeroCreadoresDominicanRepublic: number = 0;

  ValorTotalUnitedStates: number = 0;
  numeroCarrouselUnitedStates: number = 0;
  numeroLongVideosUnitedStates: number = 0;
  numeroShortVideosUnitedStates: number = 0;
  numeroCreadoresUnitedStates: number = 0;

  ValorTotalCanada: number = 0;
  numeroCarrouselCanada: number = 0;
  numeroLongVideosCanada: number = 0;
  numeroShortVideosCanada: number = 0;
  numeroCreadoresCanada: number = 0;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private UGCService: UgcService,
    private citiesService: CitiesService
  ) {
    // General
    this.formGroupCities = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });

    // Argentina
    this.formGroupCitiesArgentina = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });

    // Bolivia
    this.formGroupCitiesBolivia = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });
    // Brasil
    this.formGroupCitiesBrasil = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });
    // Chile
    this.formGroupCitiesChile = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });
    // Colombia
    this.formGroupCitiesColombia = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });
    // Ecuador
    this.formGroupCitiesEcuador = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });
    // Paraguay
    this.formGroupCitiesParaguay = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });
    // Peru
    this.formGroupCitiesPeru = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });
    // Uruguay
    this.formGroupCitiesUruguay = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });
    // Venezuela
    this.formGroupCitiesVenezuela = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });

    // CostaRica
    this.formGroupCitiesCostaRica = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });

    // Cuba
    this.formGroupCitiesCuba = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });

    // ElSalvador
    this.formGroupCitiesElSalvador = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });

    // Guatemala
    this.formGroupCitiesGuatemala = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });

    // Honduras
    this.formGroupCitiesHonduras = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });

    // Mexico
    this.formGroupCitiesMexico = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });

    // Nicaragua
    this.formGroupCitiesNicaragua = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });

    // Panama
    this.formGroupCitiesPanama = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });

    // PuertoRico
    this.formGroupCitiesPuertoRico = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });

    // DominicanRepublic
    this.formGroupCitiesDominicanRepublic = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });

    // UnitedStates
    this.formGroupCitiesUnitedStates = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });

    // Canada
    this.formGroupCitiesCanada = this.fb.group({
      cities: ['', Validators.required],
      number_creators: ['', Validators.required],
      number_short_videos: ['', Validators.required],
      number_long_videos: ['', Validators.required],
      number_carrousel: ['', Validators.required],
      guideline: [''],
    });

    this.saveUGCForm = this.fb.group({
      name_client: ['', Validators.required],
      campaign_name: ['', Validators.required],
      country: ['', Validators.required],
      campaign_objective: this.fb.array([]),
      brief_campaign_objective: ['', Validators.required],
      type_product: ['', Validators.required],
      name_product: ['', Validators.required],
      brief: ['', Validators.required],
      delivery: ['', Validators.required],
    });

    this.combinedForm = this.fb.group({
      saveUGCForm: this.saveUGCForm,
      formGroupCities: this.formGroupCities,
      formGroupCitiesArgentina: this.formGroupCitiesArgentina,
      formGroupCitiesBolivia: this.formGroupCitiesBolivia,
      formGroupCitiesBrasil: this.formGroupCitiesBrasil,
      formGroupCitiesChile: this.formGroupCitiesChile,
      formGroupCitiesColombia: this.formGroupCitiesColombia,
      formGroupCitiesEcuador: this.formGroupCitiesEcuador,
      formGroupCitiesParaguay: this.formGroupCitiesParaguay,
      formGroupCitiesPeru: this.formGroupCitiesPeru,
      formGroupCitiesUruguay: this.formGroupCitiesUruguay,
      formGroupCitiesVenezuela: this.formGroupCitiesVenezuela,
      formGroupCitiesCostaRica: this.formGroupCitiesCostaRica,
      formGroupCitiesCuba: this.formGroupCitiesCuba,
      formGroupCitiesElSalvador: this.formGroupCitiesElSalvador,
      formGroupCitiesGuatemala: this.formGroupCitiesGuatemala,
      formGroupCitiesHonduras: this.formGroupCitiesHonduras,
      formGroupCitiesMexico: this.formGroupCitiesMexico,
      formGroupCitiesNicaragua: this.formGroupCitiesNicaragua,
      formGroupCitiesPanama: this.formGroupCitiesPanama,
      formGroupCitiesPuertoRico: this.formGroupCitiesPuertoRico,
      formGroupCitiesDominicanRepublic: this.formGroupCitiesDominicanRepublic,
      formGroupCitiesUnitedStates: this.formGroupCitiesUnitedStates,
      formGroupCitiesCanada: this.formGroupCitiesCanada,
    });
  }

  ngOnInit() {
    this.service.verificarToken();
    this.getCities();
  }

  saveSaleUGC() {
    // Argentina
    if (this.selectedCountry.some((country) => country.name === 'Argentina')) {
      // Obtener los nombres de las ciudades y ajustarlos
      const citiesData: { name: string }[] =
        this.formGroupCitiesArgentina.value.cities;
      const citiesArray = citiesData.map((cityObject) => cityObject.name);
      this.formGroupCitiesArgentina.value.cities = citiesArray;

      const combinedData = {
        ...this.saveUGCForm.value,
        ...this.formGroupCitiesArgentina.value,
      };

      // console.log(combinedData);

      this.UGCService.saveSaleUGC(combinedData).subscribe(() => {
        this.router.navigateByUrl('/home');
      });
    }

    if (this.selectedCountry.some((country) => country.name === 'Bolivia')) {
      // Obtener los nombres de las ciudades y ajustarlos
      const citiesData: { name: string }[] =
        this.formGroupCitiesBolivia.value.cities;
      const citiesArray = citiesData.map((cityObject) => cityObject.name);
      this.formGroupCitiesBolivia.value.cities = citiesArray;

      const combinedData = {
        ...this.saveUGCForm.value,
        ...this.formGroupCitiesBolivia.value,
      };

      // console.log(combinedData);

      this.UGCService.saveSaleUGC(combinedData).subscribe(() => {
        this.router.navigateByUrl('/home');
      });
    }
    const pdf = new PdfMakeWrapper();

    // Añadir texto con fuente personalizada
    pdf.add(new Txt(`Nombre: ${this.productName}`).font('custom').end);
    pdf.add(new Txt(`Email: ${this.brand}`).end);

    pdf.create().download('formulario.pdf');
  }

  productName: string = '';
  brand: string = '';
  // Sum buttons types of contents
  // -------------------------------------- General -------------------------------------------------

  sumCarrousel() {
    this.numeroCarrousel += 1;
  }

  restCarrousel() {
    if (this.numeroCarrousel > 0) {
      this.numeroCarrousel--;
    }
  }

  sumLong() {
    this.numeroLongVideos += 1;
  }

  restLong() {
    if (this.numeroLongVideos > 0) {
      this.numeroLongVideos--;
    }
  }

  sumShort() {
    this.numeroShortVideos += 1;
  }

  restShort() {
    if (this.numeroShortVideos > 0) {
      this.numeroShortVideos--;
    }
  }

  sumCreators() {
    this.numeroCreadores += 1;
  }

  restCreators() {
    if (this.numeroCreadores > 0) {
      this.numeroCreadores--;
    }
  }

  putCreators(event: number) {
    this.numeroCreadores = event;
  }

  // -------------------------------------- Argentina -------------------------------------------------

  sumCarrouselArgentina() {
    this.numeroCarrouselArgentina += 1;
  }

  restCarrouselArgentina() {
    if (this.numeroCarrouselArgentina > 0) {
      this.numeroCarrouselArgentina--;
    }
  }

  sumLongArgentina() {
    this.numeroLongVideosArgentina += 1;
  }

  restLongArgentina() {
    if (this.numeroLongVideosArgentina > 0) {
      this.numeroLongVideosArgentina--;
    }
  }

  sumShortArgentina() {
    this.numeroShortVideosArgentina += 1;
  }

  restShortArgentina() {
    if (this.numeroShortVideosArgentina > 0) {
      this.numeroShortVideosArgentina--;
    }
  }

  sumCreatorsArgentina() {
    this.numeroCreadoresArgentina += 1;
  }

  restCreatorsArgentina() {
    if (this.numeroCreadoresArgentina > 0) {
      this.numeroCreadoresArgentina--;
    }
  }

  putCreatorsArgentina(event: number) {
    this.numeroCreadoresArgentina = event;
  }

  // -------------------------------------- Bolivia -------------------------------------------------

  sumCarrouselBolivia() {
    this.numeroCarrouselBolivia += 1;
  }

  restCarrouselBolivia() {
    if (this.numeroCarrouselBolivia > 0) {
      this.numeroCarrouselBolivia--;
    }
  }

  sumLongBolivia() {
    this.numeroLongVideosBolivia += 1;
  }

  restLongBolivia() {
    if (this.numeroLongVideosBolivia > 0) {
      this.numeroLongVideosBolivia--;
    }
  }

  sumShortBolivia() {
    this.numeroShortVideosBolivia += 1;
  }

  restShortBolivia() {
    if (this.numeroShortVideosBolivia > 0) {
      this.numeroShortVideosBolivia--;
    }
  }

  sumCreatorsBolivia() {
    this.numeroCreadoresBolivia += 1;
  }

  restCreatorsBolivia() {
    if (this.numeroCreadoresBolivia > 0) {
      this.numeroCreadoresBolivia--;
    }
  }

  putCreatorsBolivia(event: number) {
    this.numeroCreadoresBolivia = event;
  }

  // -------------------------------------- Brasil -------------------------------------------------

  sumCarrouselBrasil() {
    this.numeroCarrouselBrasil += 1;
  }

  restCarrouselBrasil() {
    if (this.numeroCarrouselBrasil > 0) {
      this.numeroCarrouselBrasil--;
    }
  }

  sumLongBrasil() {
    this.numeroLongVideosBrasil += 1;
  }

  restLongBrasil() {
    if (this.numeroLongVideosBrasil > 0) {
      this.numeroLongVideosBrasil--;
    }
  }

  sumShortBrasil() {
    this.numeroShortVideosBrasil += 1;
  }

  restShortBrasil() {
    if (this.numeroShortVideosBrasil > 0) {
      this.numeroShortVideosBrasil--;
    }
  }

  sumCreatorsBrasil() {
    this.numeroCreadoresBrasil += 1;
  }

  restCreatorsBrasil() {
    if (this.numeroCreadoresBrasil > 0) {
      this.numeroCreadoresBrasil--;
    }
  }

  putCreatorsBrasil(event: number) {
    this.numeroCreadoresBrasil = event;
  }

  // -------------------------------------- Chile -------------------------------------------------

  sumCarrouselChile() {
    this.numeroCarrouselChile += 1;
  }

  restCarrouselChile() {
    if (this.numeroCarrouselChile > 0) {
      this.numeroCarrouselChile--;
    }
  }

  sumLongChile() {
    this.numeroLongVideosChile += 1;
  }

  restLongChile() {
    if (this.numeroLongVideosChile > 0) {
      this.numeroLongVideosChile--;
    }
  }

  sumShortChile() {
    this.numeroShortVideosChile += 1;
  }

  restShortChile() {
    if (this.numeroShortVideosChile > 0) {
      this.numeroShortVideosChile--;
    }
  }

  sumCreatorsChile() {
    this.numeroCreadoresChile += 1;
  }

  restCreatorsChile() {
    if (this.numeroCreadoresChile > 0) {
      this.numeroCreadoresChile--;
    }
  }

  putCreatorsChile(event: number) {
    this.numeroCreadoresChile = event;
  }

  // -------------------------------------- Colombia -------------------------------------------------

  sumCarrouselColombia() {
    this.numeroCarrouselColombia += 1;
  }

  restCarrouselColombia() {
    if (this.numeroCarrouselColombia > 0) {
      this.numeroCarrouselColombia--;
    }
  }

  sumLongColombia() {
    this.numeroLongVideosColombia += 1;
  }

  restLongColombia() {
    if (this.numeroLongVideosColombia > 0) {
      this.numeroLongVideosColombia--;
    }
  }

  sumShortColombia() {
    this.numeroShortVideosColombia += 1;
  }

  restShortColombia() {
    if (this.numeroShortVideosColombia > 0) {
      this.numeroShortVideosColombia--;
    }
  }

  sumCreatorsColombia() {
    this.numeroCreadoresColombia += 1;
  }

  restCreatorsColombia() {
    if (this.numeroCreadoresColombia > 0) {
      this.numeroCreadoresColombia--;
    }
  }

  putCreatorsColombia(event: number) {
    this.numeroCreadoresColombia = event;
  }
  // -------------------------------------- Ecuador -------------------------------------------------

  sumCarrouselEcuador() {
    this.numeroCarrouselEcuador += 1;
  }

  restCarrouselEcuador() {
    if (this.numeroCarrouselEcuador > 0) {
      this.numeroCarrouselEcuador--;
    }
  }

  sumLongEcuador() {
    this.numeroLongVideosEcuador += 1;
  }

  restLongEcuador() {
    if (this.numeroLongVideosEcuador > 0) {
      this.numeroLongVideosEcuador--;
    }
  }

  sumShortEcuador() {
    this.numeroShortVideosEcuador += 1;
  }

  restShortEcuador() {
    if (this.numeroShortVideosEcuador > 0) {
      this.numeroShortVideosEcuador--;
    }
  }

  sumCreatorsEcuador() {
    this.numeroCreadoresEcuador += 1;
  }

  restCreatorsEcuador() {
    if (this.numeroCreadoresEcuador > 0) {
      this.numeroCreadoresEcuador--;
    }
  }

  putCreatorsEcuador(event: number) {
    this.numeroCreadoresEcuador = event;
  }

  // -------------------------------------- Paraguay -------------------------------------------------

  sumCarrouselParaguay() {
    this.numeroCarrouselParaguay += 1;
  }

  restCarrouselParaguay() {
    if (this.numeroCarrouselParaguay > 0) {
      this.numeroCarrouselParaguay--;
    }
  }

  sumLongParaguay() {
    this.numeroLongVideosParaguay += 1;
  }

  restLongParaguay() {
    if (this.numeroLongVideosParaguay > 0) {
      this.numeroLongVideosParaguay--;
    }
  }

  sumShortParaguay() {
    this.numeroShortVideosParaguay += 1;
  }

  restShortParaguay() {
    if (this.numeroShortVideosParaguay > 0) {
      this.numeroShortVideosParaguay--;
    }
  }

  sumCreatorsParaguay() {
    this.numeroCreadoresParaguay += 1;
  }

  restCreatorsParaguay() {
    if (this.numeroCreadoresParaguay > 0) {
      this.numeroCreadoresParaguay--;
    }
  }

  putCreatorsParaguay(event: number) {
    this.numeroCreadoresParaguay = event;
  }

  // -------------------------------------- Peru -------------------------------------------------

  sumCarrouselPeru() {
    this.numeroCarrouselPeru += 1;
  }

  restCarrouselPeru() {
    if (this.numeroCarrouselPeru > 0) {
      this.numeroCarrouselPeru--;
    }
  }

  sumLongPeru() {
    this.numeroLongVideosPeru += 1;
  }

  restLongPeru() {
    if (this.numeroLongVideosPeru > 0) {
      this.numeroLongVideosPeru--;
    }
  }

  sumShortPeru() {
    this.numeroShortVideosPeru += 1;
  }

  restShortPeru() {
    if (this.numeroShortVideosPeru > 0) {
      this.numeroShortVideosPeru--;
    }
  }

  sumCreatorsPeru() {
    this.numeroCreadoresPeru += 1;
  }

  restCreatorsPeru() {
    if (this.numeroCreadoresPeru > 0) {
      this.numeroCreadoresPeru--;
    }
  }

  putCreatorsPeru(event: number) {
    this.numeroCreadoresPeru = event;
  }

  // -------------------------------------- Uruguay -------------------------------------------------

  sumCarrouselUruguay() {
    this.numeroCarrouselUruguay += 1;
  }

  restCarrouselUruguay() {
    if (this.numeroCarrouselUruguay > 0) {
      this.numeroCarrouselUruguay--;
    }
  }

  sumLongUruguay() {
    this.numeroLongVideosUruguay += 1;
  }

  restLongUruguay() {
    if (this.numeroLongVideosUruguay > 0) {
      this.numeroLongVideosUruguay--;
    }
  }

  sumShortUruguay() {
    this.numeroShortVideosUruguay += 1;
  }

  restShortUruguay() {
    if (this.numeroShortVideosUruguay > 0) {
      this.numeroShortVideosUruguay--;
    }
  }

  sumCreatorsUruguay() {
    this.numeroCreadoresUruguay += 1;
  }

  restCreatorsUruguay() {
    if (this.numeroCreadoresUruguay > 0) {
      this.numeroCreadoresUruguay--;
    }
  }

  putCreatorsUruguay(event: number) {
    this.numeroCreadoresUruguay = event;
  }

  // -------------------------------------- Venezuela -------------------------------------------------

  sumCarrouselVenezuela() {
    this.numeroCarrouselVenezuela += 1;
  }

  restCarrouselVenezuela() {
    if (this.numeroCarrouselVenezuela > 0) {
      this.numeroCarrouselVenezuela--;
    }
  }

  sumLongVenezuela() {
    this.numeroLongVideosVenezuela += 1;
  }

  restLongVenezuela() {
    if (this.numeroLongVideosVenezuela > 0) {
      this.numeroLongVideosVenezuela--;
    }
  }

  sumShortVenezuela() {
    this.numeroShortVideosVenezuela += 1;
  }

  restShortVenezuela() {
    if (this.numeroShortVideosVenezuela > 0) {
      this.numeroShortVideosVenezuela--;
    }
  }

  sumCreatorsVenezuela() {
    this.numeroCreadoresVenezuela += 1;
  }

  restCreatorsVenezuela() {
    if (this.numeroCreadoresVenezuela > 0) {
      this.numeroCreadoresVenezuela--;
    }
  }

  putCreatorsVenezuela(event: number) {
    this.numeroCreadoresVenezuela = event;
  }

  // -------------------------------------- CostaRica -------------------------------------------------

  sumCarrouselCostaRica() {
    this.numeroCarrouselCostaRica += 1;
  }

  restCarrouselCostaRica() {
    if (this.numeroCarrouselCostaRica > 0) {
      this.numeroCarrouselCostaRica--;
    }
  }

  sumLongCostaRica() {
    this.numeroLongVideosCostaRica += 1;
  }

  restLongCostaRica() {
    if (this.numeroLongVideosCostaRica > 0) {
      this.numeroLongVideosCostaRica--;
    }
  }

  sumShortCostaRica() {
    this.numeroShortVideosCostaRica += 1;
  }

  restShortCostaRica() {
    if (this.numeroShortVideosCostaRica > 0) {
      this.numeroShortVideosCostaRica--;
    }
  }

  sumCreatorsCostaRica() {
    this.numeroCreadoresCostaRica += 1;
  }

  restCreatorsCostaRica() {
    if (this.numeroCreadoresCostaRica > 0) {
      this.numeroCreadoresCostaRica--;
    }
  }

  putCreatorsCostaRica(event: number) {
    this.numeroCreadoresCostaRica = event;
  }

  // -------------------------------------- Cuba -------------------------------------------------

  sumCarrouselCuba() {
    this.numeroCarrouselCuba += 1;
  }

  restCarrouselCuba() {
    if (this.numeroCarrouselCuba > 0) {
      this.numeroCarrouselCuba--;
    }
  }

  sumLongCuba() {
    this.numeroLongVideosCuba += 1;
  }

  restLongCuba() {
    if (this.numeroLongVideosCuba > 0) {
      this.numeroLongVideosCuba--;
    }
  }

  sumShortCuba() {
    this.numeroShortVideosCuba += 1;
  }

  restShortCuba() {
    if (this.numeroShortVideosCuba > 0) {
      this.numeroShortVideosCuba--;
    }
  }

  sumCreatorsCuba() {
    this.numeroCreadoresCuba += 1;
  }

  restCreatorsCuba() {
    if (this.numeroCreadoresCuba > 0) {
      this.numeroCreadoresCuba--;
    }
  }

  putCreatorsCuba(event: number) {
    this.numeroCreadoresCuba = event;
  }

  // -------------------------------------- ElSalvador -------------------------------------------------

  sumCarrouselElSalvador() {
    this.numeroCarrouselElSalvador += 1;
  }

  restCarrouselElSalvador() {
    if (this.numeroCarrouselElSalvador > 0) {
      this.numeroCarrouselElSalvador--;
    }
  }

  sumLongElSalvador() {
    this.numeroLongVideosElSalvador += 1;
  }

  restLongElSalvador() {
    if (this.numeroLongVideosElSalvador > 0) {
      this.numeroLongVideosElSalvador--;
    }
  }

  sumShortElSalvador() {
    this.numeroShortVideosElSalvador += 1;
  }

  restShortElSalvador() {
    if (this.numeroShortVideosElSalvador > 0) {
      this.numeroShortVideosElSalvador--;
    }
  }

  sumCreatorsElSalvador() {
    this.numeroCreadoresElSalvador += 1;
  }

  restCreatorsElSalvador() {
    if (this.numeroCreadoresElSalvador > 0) {
      this.numeroCreadoresElSalvador--;
    }
  }

  putCreatorsElSalvador(event: number) {
    this.numeroCreadoresElSalvador = event;
  }

  // -------------------------------------- Guatemala -------------------------------------------------

  sumCarrouselGuatemala() {
    this.numeroCarrouselGuatemala += 1;
  }

  restCarrouselGuatemala() {
    if (this.numeroCarrouselGuatemala > 0) {
      this.numeroCarrouselGuatemala--;
    }
  }

  sumLongGuatemala() {
    this.numeroLongVideosGuatemala += 1;
  }

  restLongGuatemala() {
    if (this.numeroLongVideosGuatemala > 0) {
      this.numeroLongVideosGuatemala--;
    }
  }

  sumShortGuatemala() {
    this.numeroShortVideosGuatemala += 1;
  }

  restShortGuatemala() {
    if (this.numeroShortVideosGuatemala > 0) {
      this.numeroShortVideosGuatemala--;
    }
  }

  sumCreatorsGuatemala() {
    this.numeroCreadoresGuatemala += 1;
  }

  restCreatorsGuatemala() {
    if (this.numeroCreadoresGuatemala > 0) {
      this.numeroCreadoresGuatemala--;
    }
  }

  putCreatorsGuatemala(event: number) {
    this.numeroCreadoresGuatemala = event;
  }

  // -------------------------------------- Honduras -------------------------------------------------

  sumCarrouselHonduras() {
    this.numeroCarrouselHonduras += 1;
  }

  restCarrouselHonduras() {
    if (this.numeroCarrouselHonduras > 0) {
      this.numeroCarrouselHonduras--;
    }
  }

  sumLongHonduras() {
    this.numeroLongVideosHonduras += 1;
  }

  restLongHonduras() {
    if (this.numeroLongVideosHonduras > 0) {
      this.numeroLongVideosHonduras--;
    }
  }

  sumShortHonduras() {
    this.numeroShortVideosHonduras += 1;
  }

  restShortHonduras() {
    if (this.numeroShortVideosHonduras > 0) {
      this.numeroShortVideosHonduras--;
    }
  }

  sumCreatorsHonduras() {
    this.numeroCreadoresHonduras += 1;
  }

  restCreatorsHonduras() {
    if (this.numeroCreadoresHonduras > 0) {
      this.numeroCreadoresHonduras--;
    }
  }

  putCreatorsHonduras(event: number) {
    this.numeroCreadoresHonduras = event;
  }

  // -------------------------------------- Mexico -------------------------------------------------

  sumCarrouselMexico() {
    this.numeroCarrouselMexico += 1;
  }

  restCarrouselMexico() {
    if (this.numeroCarrouselMexico > 0) {
      this.numeroCarrouselMexico--;
    }
  }

  sumLongMexico() {
    this.numeroLongVideosMexico += 1;
  }

  restLongMexico() {
    if (this.numeroLongVideosMexico > 0) {
      this.numeroLongVideosMexico--;
    }
  }

  sumShortMexico() {
    this.numeroShortVideosMexico += 1;
  }

  restShortMexico() {
    if (this.numeroShortVideosMexico > 0) {
      this.numeroShortVideosMexico--;
    }
  }

  sumCreatorsMexico() {
    this.numeroCreadoresMexico += 1;
  }

  restCreatorsMexico() {
    if (this.numeroCreadoresMexico > 0) {
      this.numeroCreadoresMexico--;
    }
  }

  putCreatorsMexico(event: number) {
    this.numeroCreadoresMexico = event;
  }

  // -------------------------------------- Nicaragua -------------------------------------------------

  sumCarrouselNicaragua() {
    this.numeroCarrouselNicaragua += 1;
  }

  restCarrouselNicaragua() {
    if (this.numeroCarrouselNicaragua > 0) {
      this.numeroCarrouselNicaragua--;
    }
  }

  sumLongNicaragua() {
    this.numeroLongVideosNicaragua += 1;
  }

  restLongNicaragua() {
    if (this.numeroLongVideosNicaragua > 0) {
      this.numeroLongVideosNicaragua--;
    }
  }

  sumShortNicaragua() {
    this.numeroShortVideosNicaragua += 1;
  }

  restShortNicaragua() {
    if (this.numeroShortVideosNicaragua > 0) {
      this.numeroShortVideosNicaragua--;
    }
  }

  sumCreatorsNicaragua() {
    this.numeroCreadoresNicaragua += 1;
  }

  restCreatorsNicaragua() {
    if (this.numeroCreadoresNicaragua > 0) {
      this.numeroCreadoresNicaragua--;
    }
  }

  putCreatorsNicaragua(event: number) {
    this.numeroCreadoresNicaragua = event;
  }

  // -------------------------------------- Panama -------------------------------------------------

  sumCarrouselPanama() {
    this.numeroCarrouselPanama += 1;
  }

  restCarrouselPanama() {
    if (this.numeroCarrouselPanama > 0) {
      this.numeroCarrouselPanama--;
    }
  }

  sumLongPanama() {
    this.numeroLongVideosPanama += 1;
  }

  restLongPanama() {
    if (this.numeroLongVideosPanama > 0) {
      this.numeroLongVideosPanama--;
    }
  }

  sumShortPanama() {
    this.numeroShortVideosPanama += 1;
  }

  restShortPanama() {
    if (this.numeroShortVideosPanama > 0) {
      this.numeroShortVideosPanama--;
    }
  }

  sumCreatorsPanama() {
    this.numeroCreadoresPanama += 1;
  }

  restCreatorsPanama() {
    if (this.numeroCreadoresPanama > 0) {
      this.numeroCreadoresPanama--;
    }
  }

  putCreatorsPanama(event: number) {
    this.numeroCreadoresPanama = event;
  }

  // -------------------------------------- PuertoRico -------------------------------------------------

  sumCarrouselPuertoRico() {
    this.numeroCarrouselPuertoRico += 1;
  }

  restCarrouselPuertoRico() {
    if (this.numeroCarrouselPuertoRico > 0) {
      this.numeroCarrouselPuertoRico--;
    }
  }

  sumLongPuertoRico() {
    this.numeroLongVideosPuertoRico += 1;
  }

  restLongPuertoRico() {
    if (this.numeroLongVideosPuertoRico > 0) {
      this.numeroLongVideosPuertoRico--;
    }
  }

  sumShortPuertoRico() {
    this.numeroShortVideosPuertoRico += 1;
  }

  restShortPuertoRico() {
    if (this.numeroShortVideosPuertoRico > 0) {
      this.numeroShortVideosPuertoRico--;
    }
  }

  sumCreatorsPuertoRico() {
    this.numeroCreadoresPuertoRico += 1;
  }

  restCreatorsPuertoRico() {
    if (this.numeroCreadoresPuertoRico > 0) {
      this.numeroCreadoresPuertoRico--;
    }
  }

  putCreatorsPuertoRico(event: number) {
    this.numeroCreadoresPuertoRico = event;
  }

  // -------------------------------------- DominicanRepublic -------------------------------------------------

  sumCarrouselDominicanRepublic() {
    this.numeroCarrouselDominicanRepublic += 1;
  }

  restCarrouselDominicanRepublic() {
    if (this.numeroCarrouselDominicanRepublic > 0) {
      this.numeroCarrouselDominicanRepublic--;
    }
  }

  sumLongDominicanRepublic() {
    this.numeroLongVideosDominicanRepublic += 1;
  }

  restLongDominicanRepublic() {
    if (this.numeroLongVideosDominicanRepublic > 0) {
      this.numeroLongVideosDominicanRepublic--;
    }
  }

  sumShortDominicanRepublic() {
    this.numeroShortVideosDominicanRepublic += 1;
  }

  restShortDominicanRepublic() {
    if (this.numeroShortVideosDominicanRepublic > 0) {
      this.numeroShortVideosDominicanRepublic--;
    }
  }

  sumCreatorsDominicanRepublic() {
    this.numeroCreadoresDominicanRepublic += 1;
  }

  restCreatorsDominicanRepublic() {
    if (this.numeroCreadoresDominicanRepublic > 0) {
      this.numeroCreadoresDominicanRepublic--;
    }
  }

  putCreatorsDominicanRepublic(event: number) {
    this.numeroCreadoresDominicanRepublic = event;
  }

  // -------------------------------------- UnitedStates -------------------------------------------------

  sumCarrouselUnitedStates() {
    this.numeroCarrouselUnitedStates += 1;
  }

  restCarrouselUnitedStates() {
    if (this.numeroCarrouselUnitedStates > 0) {
      this.numeroCarrouselUnitedStates--;
    }
  }

  sumLongUnitedStates() {
    this.numeroLongVideosUnitedStates += 1;
  }

  restLongUnitedStates() {
    if (this.numeroLongVideosUnitedStates > 0) {
      this.numeroLongVideosUnitedStates--;
    }
  }

  sumShortUnitedStates() {
    this.numeroShortVideosUnitedStates += 1;
  }

  restShortUnitedStates() {
    if (this.numeroShortVideosUnitedStates > 0) {
      this.numeroShortVideosUnitedStates--;
    }
  }

  sumCreatorsUnitedStates() {
    this.numeroCreadoresUnitedStates += 1;
  }

  restCreatorsUnitedStates() {
    if (this.numeroCreadoresUnitedStates > 0) {
      this.numeroCreadoresUnitedStates--;
    }
  }

  putCreatorsUnitedStates(event: number) {
    this.numeroCreadoresUnitedStates = event;
  }

  // -------------------------------------- Canada -------------------------------------------------

  sumCarrouselCanada() {
    this.numeroCarrouselCanada += 1;
  }

  restCarrouselCanada() {
    if (this.numeroCarrouselCanada > 0) {
      this.numeroCarrouselCanada--;
    }
  }

  sumLongCanada() {
    this.numeroLongVideosCanada += 1;
  }

  restLongCanada() {
    if (this.numeroLongVideosCanada > 0) {
      this.numeroLongVideosCanada--;
    }
  }

  sumShortCanada() {
    this.numeroShortVideosCanada += 1;
  }

  restShortCanada() {
    if (this.numeroShortVideosCanada > 0) {
      this.numeroShortVideosCanada--;
    }
  }

  sumCreatorsCanada() {
    this.numeroCreadoresCanada += 1;
  }

  restCreatorsCanada() {
    if (this.numeroCreadoresCanada > 0) {
      this.numeroCreadoresCanada--;
    }
  }

  putCreatorsCanada(event: number) {
    this.numeroCreadoresCanada = event;
  }

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

  // Mostrar ciudades
  showCities() {
    console.log(this.selectedCountry);
    if (this.selectedCountry.some((country) => country.name === 'Argentina')) {
      this.verificarArgentina = true;
    } else {
      this.verificarArgentina = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Bolivia')) {
      this.verificarBolivia = true;
    } else {
      this.verificarBolivia = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Brasil')) {
      this.verificarBrasil = true;
    } else {
      this.verificarBrasil = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Chile')) {
      this.verificarChile = true;
    } else {
      this.verificarChile = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Colombia')) {
      this.verificarColombia = true;
    } else {
      this.verificarColombia = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Ecuador')) {
      this.verificarEcuador = true;
    } else {
      this.verificarEcuador = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Paraguay')) {
      this.verificarParaguay = true;
    } else {
      this.verificarParaguay = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Peru')) {
      this.verificarPeru = true;
    } else {
      this.verificarPeru = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Uruguay')) {
      this.verificarUruguay = true;
    } else {
      this.verificarUruguay = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Venezuela')) {
      this.verificarVenezuela = true;
    } else {
      this.verificarVenezuela = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Costa Rica')) {
      this.verificarCostaRica = true;
    } else {
      this.verificarCostaRica = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Cuba')) {
      this.verificarCuba = true;
    } else {
      this.verificarCuba = false;
    }
    if (
      this.selectedCountry.some((country) => country.name === 'El Salvador')
    ) {
      this.verificarElSalvador = true;
    } else {
      this.verificarElSalvador = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Guatemala')) {
      this.verificarGuatemala = true;
    } else {
      this.verificarGuatemala = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Honduras')) {
      this.verificarHonduras = true;
    } else {
      this.verificarHonduras = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Mexico')) {
      this.verificarMexico = true;
    } else {
      this.verificarMexico = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Nicaragua')) {
      this.verificarNicaragua = true;
    } else {
      this.verificarNicaragua = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Panama')) {
      this.verificarPanama = true;
    } else {
      this.verificarPanama = false;
    }
    if (
      this.selectedCountry.some((country) => country.name === 'Puerto Rico')
    ) {
      this.verificarPuertoRico = true;
    } else {
      this.verificarPuertoRico = false;
    }
    if (
      this.selectedCountry.some(
        (country) => country.name === 'Dominican Republic'
      )
    ) {
      this.verificarDominicanRepublic = true;
    } else {
      this.verificarDominicanRepublic = false;
    }
    if (
      this.selectedCountry.some((country) => country.name === 'United States')
    ) {
      this.verificarUnitedStates = true;
    } else {
      this.verificarUnitedStates = false;
    }
    if (this.selectedCountry.some((country) => country.name === 'Canada')) {
      this.verificarCanada = true;
    } else {
      this.verificarCanada = false;
    }
  }

  // Extraer los datos de las ciudades
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

  // Seleccion de tipo de producto - funcion para aparecer el Delivery o no

  productType: boolean = false;
  productTypeProduct: string = '';

  changeProductType() {
    if (this.productTypeProduct == 'Physical product') {
      this.productType = true;
    }
    if (this.productTypeProduct == 'Service') {
      this.productType = false;
    }
  }

  // Pequeño cambio en las opciones de campaña

  options = [
    { id: 'awareness', label: 'Awareness', value: 0 },
    { id: 'consideration', label: 'Consideration', value: 1 },
    { id: 'conversion', label: 'Conversion', value: 2 },
    { id: 'loyalty', label: 'Loyalty', value: 3 },
  ];

  onCheckboxChange(event: any) {
    const formArray: FormArray = this.saveUGCForm.get(
      'campaign_objective'
    ) as FormArray;

    if (event.target.checked) {
      formArray.push(new FormControl(Number(event.target.value)));
    } else {
      const index = formArray.controls.findIndex(
        (x) => x.value === Number(event.target.value)
      );
      formArray.removeAt(index);
    }
  }

  valorContenidosTotal: number = 0;
  valorCarrouselTotal: number = 0;
  valorShortTotal: number = 0;
  valorLongTotal: number = 0;
  valorPromedioContenido: number = 0;
  ValorCiudadesTotal: number = 0;
  ValorNumeroCreadores: number = 0;

  citiesSelectedArgentina: String = '';
  citiesSelectedBolivia: String = '';
  citiesSelectedBrasil: String = '';
  citiesSelectedChile: String = '';
  citiesSelectedColombia: String = '';
  citiesSelectedEcuador: String = '';
  citiesSelectedParaguay: String = '';
  citiesSelectedPeru: String = '';
  citiesSelectedUruguay: String = '';
  citiesSelectedVenezuela: String = '';
  citiesSelectedCostaRica: String = '';
  citiesSelectedCuba: String = '';
  citiesSelectedElSalvador: String = '';
  citiesSelectedGuatemala: String = '';
  citiesSelectedHonduras: String = '';
  citiesSelectedMexico: String = '';
  citiesSelectedNicaragua: String = '';
  citiesSelectedPanama: String = '';
  citiesSelectedPuertoRico: String = '';
  citiesSelectedDominicanRepublic: String = '';
  citiesSelectedUnitedStates: String = '';
  citiesSelectedCanada: String = '';

  changeValues() {
    console.log(this.citiesSelectedArgentina.length);
    setTimeout(() => {
      this.valorCarrouselTotal = 0;
      this.valorShortTotal = 0;
      this.valorLongTotal = 0;
      this.valorContenidosTotal = 0;
      this.ValorTotal = 0;
      this.ValorCiudadesTotal = 0;
      this.ValorNumeroCreadores = 0;
      // Change Values for Argentina
      if (this.verificarArgentina == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresArgentina;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedArgentina.length;

        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedArgentina.length *
            this.numeroCreadoresArgentina *
            this.numeroCarrouselArgentina *
            100 +
          this.citiesSelectedArgentina.length *
            this.numeroCreadoresArgentina *
            this.numeroShortVideosArgentina *
            150 +
          this.citiesSelectedArgentina.length *
            this.numeroCreadoresArgentina *
            this.numeroLongVideosArgentina *
            300;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedArgentina.length *
          this.numeroCreadoresArgentina *
          this.numeroCarrouselArgentina;
        this.valorShortTotal +=
          this.citiesSelectedArgentina.length *
          this.numeroCreadoresArgentina *
          this.numeroShortVideosArgentina;
        this.valorLongTotal +=
          this.citiesSelectedArgentina.length *
          this.numeroCreadoresArgentina *
          this.numeroLongVideosArgentina;
        this.valorContenidosTotal +=
          this.citiesSelectedArgentina.length *
          (this.numeroCreadoresArgentina *
            (this.numeroCarrouselArgentina +
              this.numeroLongVideosArgentina +
              this.numeroShortVideosArgentina));
      }

      // Change Values for Bolivia
      if (this.verificarBolivia == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresBolivia;

        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedBolivia.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedBolivia.length *
            this.numeroCreadoresBolivia *
            this.numeroCarrouselBolivia *
            40 +
          this.citiesSelectedBolivia.length *
            this.numeroCreadoresBolivia *
            this.numeroShortVideosBolivia *
            90 +
          this.citiesSelectedBolivia.length *
            this.numeroCreadoresBolivia *
            this.numeroLongVideosBolivia *
            70;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedBolivia.length *
          this.numeroCreadoresBolivia *
          this.numeroCarrouselBolivia;
        this.valorShortTotal +=
          this.citiesSelectedBolivia.length *
          this.numeroCreadoresBolivia *
          this.numeroShortVideosBolivia;
        this.valorLongTotal +=
          this.citiesSelectedBolivia.length *
          this.numeroCreadoresBolivia *
          this.numeroLongVideosBolivia;
        this.valorContenidosTotal +=
          this.citiesSelectedBolivia.length *
          this.numeroCreadoresBolivia *
          (this.numeroCarrouselBolivia +
            this.numeroLongVideosBolivia +
            this.numeroShortVideosBolivia);
      }

      // Change Values for Brasil
      if (this.verificarBrasil == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresBrasil;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedBrasil.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedBrasil.length *
            this.numeroCreadoresBrasil *
            this.numeroCarrouselBrasil *
            100 +
          this.citiesSelectedBrasil.length *
            this.numeroCreadoresBrasil *
            this.numeroShortVideosBrasil *
            150 +
          this.citiesSelectedBrasil.length *
            this.numeroCreadoresBrasil *
            this.numeroLongVideosBrasil *
            250;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedBrasil.length *
          this.numeroCreadoresBrasil *
          this.numeroCarrouselBrasil;
        this.valorShortTotal +=
          this.citiesSelectedBrasil.length *
          this.numeroCreadoresBrasil *
          this.numeroShortVideosBrasil;
        this.valorLongTotal +=
          this.citiesSelectedBrasil.length *
          this.numeroCreadoresBrasil *
          this.numeroLongVideosBrasil;
        this.valorContenidosTotal +=
          this.citiesSelectedBrasil.length *
          this.numeroCreadoresBrasil *
          (this.numeroCarrouselBrasil +
            this.numeroLongVideosBrasil +
            this.numeroShortVideosBrasil);
      }

      // Change Values for Chile
      if (this.verificarChile == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresChile;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedChile.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedChile.length *
            this.numeroCreadoresChile *
            this.numeroCarrouselChile *
            20 +
          this.citiesSelectedChile.length *
            this.numeroCreadoresChile *
            this.numeroShortVideosChile *
            50 +
          this.citiesSelectedChile.length *
            this.numeroCreadoresChile *
            this.numeroLongVideosChile *
            70;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedChile.length *
          this.numeroCreadoresChile *
          this.numeroCarrouselChile;
        this.valorShortTotal +=
          this.citiesSelectedChile.length *
          this.numeroCreadoresChile *
          this.numeroShortVideosChile;
        this.valorLongTotal +=
          this.citiesSelectedChile.length *
          this.numeroCreadoresChile *
          this.numeroLongVideosChile;
        this.valorContenidosTotal +=
          this.citiesSelectedChile.length *
          this.numeroCreadoresChile *
          (this.numeroCarrouselChile +
            this.numeroLongVideosChile +
            this.numeroShortVideosChile);
      }

      // Change Values for Colombia
      if (this.verificarColombia == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresColombia;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedColombia.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedColombia.length *
            this.numeroCreadoresColombia *
            this.numeroCarrouselColombia *
            50 +
          this.citiesSelectedColombia.length *
            this.numeroCreadoresColombia *
            this.numeroShortVideosColombia *
            44 +
          this.citiesSelectedColombia.length *
            this.numeroCreadoresColombia *
            this.numeroLongVideosColombia *
            77;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedColombia.length *
          this.numeroCreadoresColombia *
          this.numeroCarrouselColombia;
        this.valorShortTotal +=
          this.citiesSelectedColombia.length *
          this.numeroCreadoresColombia *
          this.numeroShortVideosColombia;
        this.valorLongTotal +=
          this.citiesSelectedColombia.length *
          this.numeroCreadoresColombia *
          this.numeroLongVideosColombia;
        this.valorContenidosTotal +=
          this.citiesSelectedColombia.length *
          this.numeroCreadoresColombia *
          (this.numeroCarrouselColombia +
            this.numeroLongVideosColombia +
            this.numeroShortVideosColombia);
      }

      // Change Values for Ecuador
      if (this.verificarEcuador == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresEcuador;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedEcuador.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedEcuador.length *
            this.numeroCreadoresEcuador *
            this.numeroCarrouselEcuador *
            50 +
          this.citiesSelectedEcuador.length *
            this.numeroCreadoresEcuador *
            this.numeroShortVideosEcuador *
            90 +
          this.citiesSelectedEcuador.length *
            this.numeroCreadoresEcuador *
            this.numeroLongVideosEcuador *
            66;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedEcuador.length *
          this.numeroCreadoresEcuador *
          this.numeroCarrouselEcuador;
        this.valorShortTotal +=
          this.citiesSelectedEcuador.length *
          this.numeroCreadoresEcuador *
          this.numeroShortVideosEcuador;
        this.valorLongTotal +=
          this.citiesSelectedEcuador.length *
          this.numeroCreadoresEcuador *
          this.numeroLongVideosEcuador;
        this.valorContenidosTotal +=
          this.citiesSelectedEcuador.length *
          this.numeroCreadoresEcuador *
          (this.numeroCarrouselEcuador +
            this.numeroLongVideosEcuador +
            this.numeroShortVideosEcuador);
      }

      // Change Values for Paraguay
      if (this.verificarParaguay == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresParaguay;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedParaguay.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedParaguay.length *
            this.numeroCreadoresParaguay *
            this.numeroCarrouselParaguay *
            75 +
          this.citiesSelectedParaguay.length *
            this.numeroCreadoresParaguay *
            this.numeroShortVideosParaguay *
            95 +
          this.citiesSelectedParaguay.length *
            this.numeroCreadoresParaguay *
            this.numeroLongVideosParaguay *
            65;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedParaguay.length *
          this.numeroCreadoresParaguay *
          this.numeroCarrouselParaguay;
        this.valorShortTotal +=
          this.citiesSelectedParaguay.length *
          this.numeroCreadoresParaguay *
          this.numeroShortVideosParaguay;
        this.valorLongTotal +=
          this.citiesSelectedParaguay.length *
          this.numeroCreadoresParaguay *
          this.numeroLongVideosParaguay;
        this.valorContenidosTotal +=
          this.citiesSelectedParaguay.length *
          this.numeroCreadoresParaguay *
          (this.numeroCarrouselParaguay +
            this.numeroLongVideosParaguay +
            this.numeroShortVideosParaguay);
      }

      // Change Values for Peru
      if (this.verificarPeru == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresPeru;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedPeru.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedPeru.length *
            this.numeroCreadoresPeru *
            this.numeroCarrouselPeru *
            80 +
          this.citiesSelectedPeru.length *
            this.numeroCreadoresPeru *
            this.numeroShortVideosPeru *
            100 +
          this.citiesSelectedPeru.length *
            this.numeroCreadoresPeru *
            this.numeroLongVideosPeru *
            150;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedPeru.length *
          this.numeroCreadoresPeru *
          this.numeroCarrouselPeru;
        this.valorShortTotal +=
          this.citiesSelectedPeru.length *
          this.numeroCreadoresPeru *
          this.numeroShortVideosPeru;
        this.valorLongTotal +=
          this.citiesSelectedPeru.length *
          this.numeroCreadoresPeru *
          this.numeroLongVideosPeru;
        this.valorContenidosTotal +=
          this.citiesSelectedPeru.length *
          this.numeroCreadoresPeru *
          (this.numeroCarrouselPeru +
            this.numeroLongVideosPeru +
            this.numeroShortVideosPeru);
      }

      // Change Values for Uruguay
      if (this.verificarUruguay == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresUruguay;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedUruguay.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedUruguay.length *
            this.numeroCreadoresUruguay *
            this.numeroCarrouselUruguay *
            80 +
          this.citiesSelectedUruguay.length *
            this.numeroCreadoresUruguay *
            this.numeroShortVideosUruguay *
            50 +
          this.citiesSelectedUruguay.length *
            this.numeroCreadoresUruguay *
            this.numeroLongVideosUruguay *
            80;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedUruguay.length *
          this.numeroCreadoresUruguay *
          this.numeroCarrouselUruguay;
        this.valorShortTotal +=
          this.citiesSelectedUruguay.length *
          this.numeroCreadoresUruguay *
          this.numeroShortVideosUruguay;
        this.valorLongTotal +=
          this.citiesSelectedUruguay.length *
          this.numeroCreadoresUruguay *
          this.numeroLongVideosUruguay;
        this.valorContenidosTotal +=
          this.citiesSelectedUruguay.length *
          this.numeroCreadoresUruguay *
          (this.numeroCarrouselUruguay +
            this.numeroLongVideosUruguay +
            this.numeroShortVideosUruguay);
      }

      // Change Values for Venezuela
      if (this.verificarVenezuela == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresVenezuela;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedVenezuela.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedVenezuela.length *
            this.numeroCreadoresVenezuela *
            this.numeroCarrouselVenezuela *
            10 +
          this.citiesSelectedVenezuela.length *
            this.numeroCreadoresVenezuela *
            this.numeroShortVideosVenezuela *
            20 +
          this.citiesSelectedVenezuela.length *
            this.numeroCreadoresVenezuela *
            this.numeroLongVideosVenezuela *
            30;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedVenezuela.length *
          this.numeroCreadoresVenezuela *
          this.numeroCarrouselVenezuela;
        this.valorShortTotal +=
          this.citiesSelectedVenezuela.length *
          this.numeroCreadoresVenezuela *
          this.numeroShortVideosVenezuela;
        this.valorLongTotal +=
          this.citiesSelectedVenezuela.length *
          this.numeroCreadoresVenezuela *
          this.numeroLongVideosVenezuela;
        this.valorContenidosTotal +=
          this.citiesSelectedVenezuela.length *
          this.numeroCreadoresVenezuela *
          (this.numeroCarrouselVenezuela +
            this.numeroLongVideosVenezuela +
            this.numeroShortVideosVenezuela);
      }

      // Change Values for CostaRica
      if (this.verificarCostaRica == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresCostaRica;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedCostaRica.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedCostaRica.length *
            this.numeroCreadoresCostaRica *
            this.numeroCarrouselCostaRica *
            150 +
          this.citiesSelectedCostaRica.length *
            this.numeroCreadoresCostaRica *
            this.numeroShortVideosCostaRica *
            100 +
          this.citiesSelectedCostaRica.length *
            this.numeroCreadoresCostaRica *
            this.numeroLongVideosCostaRica *
            200;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedCostaRica.length *
          this.numeroCreadoresCostaRica *
          this.numeroCarrouselCostaRica;
        this.valorShortTotal +=
          this.citiesSelectedCostaRica.length *
          this.numeroCreadoresCostaRica *
          this.numeroShortVideosCostaRica;
        this.valorLongTotal +=
          this.citiesSelectedCostaRica.length *
          this.numeroCreadoresCostaRica *
          this.numeroLongVideosCostaRica;
        this.valorContenidosTotal +=
          this.citiesSelectedCostaRica.length *
          this.numeroCreadoresCostaRica *
          (this.numeroCarrouselCostaRica +
            this.numeroLongVideosCostaRica +
            this.numeroShortVideosCostaRica);
      }

      // Change Values for Cuba
      if (this.verificarCuba == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresCuba;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedCuba.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedCuba.length *
            this.numeroCreadoresCuba *
            this.numeroCarrouselCuba *
            10 +
          this.citiesSelectedCuba.length *
            this.numeroCreadoresCuba *
            this.numeroShortVideosCuba *
            20 +
          this.citiesSelectedCuba.length *
            this.numeroCreadoresCuba *
            this.numeroLongVideosCuba *
            30;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedCuba.length *
          this.numeroCreadoresCuba *
          this.numeroCarrouselCuba;
        this.valorShortTotal +=
          this.citiesSelectedCuba.length *
          this.numeroCreadoresCuba *
          this.numeroShortVideosCuba;
        this.valorLongTotal +=
          this.citiesSelectedCuba.length *
          this.numeroCreadoresCuba *
          this.numeroLongVideosCuba;
        this.valorContenidosTotal +=
          this.citiesSelectedCuba.length *
          this.numeroCreadoresCuba *
          (this.numeroCarrouselCuba +
            this.numeroLongVideosCuba +
            this.numeroShortVideosCuba);
      }

      // Change Values for ElSalvador
      if (this.verificarElSalvador == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresElSalvador;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedElSalvador.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedElSalvador.length *
            this.numeroCreadoresElSalvador *
            this.numeroCarrouselElSalvador *
            200 +
          this.citiesSelectedElSalvador.length *
            this.numeroCreadoresElSalvador *
            this.numeroShortVideosElSalvador *
            100 +
          this.citiesSelectedElSalvador.length *
            this.numeroCreadoresElSalvador *
            this.numeroLongVideosElSalvador *
            150;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedElSalvador.length *
          this.numeroCreadoresElSalvador *
          this.numeroCarrouselElSalvador;
        this.valorShortTotal +=
          this.citiesSelectedElSalvador.length *
          this.numeroCreadoresElSalvador *
          this.numeroShortVideosElSalvador;
        this.valorLongTotal +=
          this.citiesSelectedElSalvador.length *
          this.numeroCreadoresElSalvador *
          this.numeroLongVideosElSalvador;
        this.valorContenidosTotal +=
          this.citiesSelectedElSalvador.length *
          this.numeroCreadoresElSalvador *
          (this.numeroCarrouselElSalvador +
            this.numeroLongVideosElSalvador +
            this.numeroShortVideosElSalvador);
      }

      // Change Values for Guatemala
      if (this.verificarGuatemala == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresGuatemala;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedGuatemala.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedGuatemala.length *
            this.numeroCreadoresGuatemala *
            this.numeroCarrouselGuatemala *
            50 +
          this.citiesSelectedGuatemala.length *
            this.numeroCreadoresGuatemala *
            this.numeroShortVideosGuatemala *
            100 +
          this.citiesSelectedGuatemala.length *
            this.numeroCreadoresGuatemala *
            this.numeroLongVideosGuatemala *
            70;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedGuatemala.length *
          this.numeroCreadoresGuatemala *
          this.numeroCarrouselGuatemala;
        this.valorShortTotal +=
          this.citiesSelectedGuatemala.length *
          this.numeroCreadoresGuatemala *
          this.numeroShortVideosGuatemala;
        this.valorLongTotal +=
          this.citiesSelectedGuatemala.length *
          this.numeroCreadoresGuatemala *
          this.numeroLongVideosGuatemala;
        this.valorContenidosTotal +=
          this.citiesSelectedGuatemala.length *
          this.numeroCreadoresGuatemala *
          (this.numeroCarrouselGuatemala +
            this.numeroLongVideosGuatemala +
            this.numeroShortVideosGuatemala);
      }

      // Change Values for Honduras
      if (this.verificarHonduras == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresHonduras;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedHonduras.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedHonduras.length *
            this.numeroCreadoresHonduras *
            this.numeroCarrouselHonduras *
            100 +
          this.citiesSelectedHonduras.length *
            this.numeroCreadoresHonduras *
            this.numeroShortVideosHonduras *
            120 +
          this.citiesSelectedHonduras.length *
            this.numeroCreadoresHonduras *
            this.numeroLongVideosHonduras *
            170;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedHonduras.length *
          this.numeroCreadoresHonduras *
          this.numeroCarrouselHonduras;
        this.valorShortTotal +=
          this.citiesSelectedHonduras.length *
          this.numeroCreadoresHonduras *
          this.numeroShortVideosHonduras;
        this.valorLongTotal +=
          this.citiesSelectedHonduras.length *
          this.numeroCreadoresHonduras *
          this.numeroLongVideosHonduras;
        this.valorContenidosTotal +=
          this.citiesSelectedHonduras.length *
          this.numeroCreadoresHonduras *
          (this.numeroCarrouselHonduras +
            this.numeroLongVideosHonduras +
            this.numeroShortVideosHonduras);
      }

      // Change Values for Mexico
      if (this.verificarMexico == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresMexico;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedMexico.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedMexico.length *
            this.numeroCreadoresMexico *
            this.numeroCarrouselMexico *
            80 +
          this.citiesSelectedMexico.length *
            this.numeroCreadoresMexico *
            this.numeroShortVideosMexico *
            100 +
          this.citiesSelectedMexico.length *
            this.numeroCreadoresMexico *
            this.numeroLongVideosMexico *
            80;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedMexico.length *
          this.numeroCreadoresMexico *
          this.numeroCarrouselMexico;
        this.valorShortTotal +=
          this.citiesSelectedMexico.length *
          this.numeroCreadoresMexico *
          this.numeroShortVideosMexico;
        this.valorLongTotal +=
          this.citiesSelectedMexico.length *
          this.numeroCreadoresMexico *
          this.numeroLongVideosMexico;
        this.valorContenidosTotal +=
          this.citiesSelectedMexico.length *
          this.numeroCreadoresMexico *
          (this.numeroCarrouselMexico +
            this.numeroLongVideosMexico +
            this.numeroShortVideosMexico);
      }

      // Change Values for Nicaragua
      if (this.verificarNicaragua == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresNicaragua;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedNicaragua.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedNicaragua.length *
            this.numeroCreadoresNicaragua *
            this.numeroCarrouselNicaragua *
            50 +
          this.citiesSelectedNicaragua.length *
            this.numeroCreadoresNicaragua *
            this.numeroShortVideosNicaragua *
            30 +
          this.citiesSelectedNicaragua.length *
            this.numeroCreadoresNicaragua *
            this.numeroLongVideosNicaragua *
            60;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedNicaragua.length *
          this.numeroCreadoresNicaragua *
          this.numeroCarrouselNicaragua;
        this.valorShortTotal +=
          this.citiesSelectedNicaragua.length *
          this.numeroCreadoresNicaragua *
          this.numeroShortVideosNicaragua;
        this.valorLongTotal +=
          this.citiesSelectedNicaragua.length *
          this.numeroCreadoresNicaragua *
          this.numeroLongVideosNicaragua;
        this.valorContenidosTotal +=
          this.citiesSelectedNicaragua.length *
          this.numeroCreadoresNicaragua *
          (this.numeroCarrouselNicaragua +
            this.numeroLongVideosNicaragua +
            this.numeroShortVideosNicaragua);
      }

      // Change Values for Panama
      if (this.verificarPanama == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresPanama;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedPanama.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedPanama.length *
            this.numeroCreadoresPanama *
            this.numeroCarrouselPanama *
            150 +
          this.citiesSelectedPanama.length *
            this.numeroCreadoresPanama *
            this.numeroShortVideosPanama *
            100 +
          this.citiesSelectedPanama.length *
            this.numeroCreadoresPanama *
            this.numeroLongVideosPanama *
            200;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedPanama.length *
          this.numeroCreadoresPanama *
          this.numeroCarrouselPanama;
        this.valorShortTotal +=
          this.citiesSelectedPanama.length *
          this.numeroCreadoresPanama *
          this.numeroShortVideosPanama;
        this.valorLongTotal +=
          this.citiesSelectedPanama.length *
          this.numeroCreadoresPanama *
          this.numeroLongVideosPanama;
        this.valorContenidosTotal +=
          this.citiesSelectedPanama.length *
          this.numeroCreadoresPanama *
          (this.numeroCarrouselPanama +
            this.numeroLongVideosPanama +
            this.numeroShortVideosPanama);
      }

      // Change Values for PuertoRico
      if (this.verificarPuertoRico == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresPuertoRico;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedPuertoRico.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedPuertoRico.length *
            this.numeroCreadoresPuertoRico *
            this.numeroCarrouselPuertoRico *
            240 +
          this.citiesSelectedPuertoRico.length *
            this.numeroCreadoresPuertoRico *
            this.numeroShortVideosPuertoRico *
            295 +
          this.citiesSelectedPuertoRico.length *
            this.numeroCreadoresPuertoRico *
            this.numeroLongVideosPuertoRico *
            350;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedPuertoRico.length *
          this.numeroCreadoresPuertoRico *
          this.numeroCarrouselPuertoRico;
        this.valorShortTotal +=
          this.citiesSelectedPuertoRico.length *
          this.numeroCreadoresPuertoRico *
          this.numeroShortVideosPuertoRico;
        this.valorLongTotal +=
          this.citiesSelectedPuertoRico.length *
          this.numeroCreadoresPuertoRico *
          this.numeroLongVideosPuertoRico;
        this.valorContenidosTotal +=
          this.citiesSelectedPuertoRico.length *
          this.numeroCreadoresPuertoRico *
          (this.numeroCarrouselPuertoRico +
            this.numeroLongVideosPuertoRico +
            this.numeroShortVideosPuertoRico);
      }

      // Change Values for DominicanRepublic
      if (this.verificarDominicanRepublic == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresDominicanRepublic;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedDominicanRepublic.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedDominicanRepublic.length *
            this.numeroCreadoresDominicanRepublic *
            this.numeroCarrouselDominicanRepublic *
            150 +
          this.citiesSelectedDominicanRepublic.length *
            this.numeroCreadoresDominicanRepublic *
            this.numeroShortVideosDominicanRepublic *
            200 +
          this.citiesSelectedDominicanRepublic.length *
            this.numeroCreadoresDominicanRepublic *
            this.numeroLongVideosDominicanRepublic *
            300;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedDominicanRepublic.length *
          this.numeroCreadoresDominicanRepublic *
          this.numeroCarrouselDominicanRepublic;
        this.valorShortTotal +=
          this.citiesSelectedDominicanRepublic.length *
          this.numeroCreadoresDominicanRepublic *
          this.numeroShortVideosDominicanRepublic;
        this.valorLongTotal +=
          this.citiesSelectedDominicanRepublic.length *
          this.numeroCreadoresDominicanRepublic *
          this.numeroLongVideosDominicanRepublic;
        this.valorContenidosTotal +=
          this.citiesSelectedDominicanRepublic.length *
          this.numeroCreadoresDominicanRepublic *
          (this.numeroCarrouselDominicanRepublic +
            this.numeroLongVideosDominicanRepublic +
            this.numeroShortVideosDominicanRepublic);
      }

      // Change Values for UnitedStates
      if (this.verificarUnitedStates == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresUnitedStates;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedUnitedStates.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedUnitedStates.length *
            this.numeroCreadoresUnitedStates *
            this.numeroCarrouselUnitedStates *
            250 +
          this.citiesSelectedUnitedStates.length *
            this.numeroCreadoresUnitedStates *
            this.numeroShortVideosUnitedStates *
            300 +
          this.citiesSelectedUnitedStates.length *
            this.numeroCreadoresUnitedStates *
            this.numeroLongVideosUnitedStates *
            390;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedUnitedStates.length *
          this.numeroCreadoresUnitedStates *
          this.numeroCarrouselUnitedStates;
        this.valorShortTotal +=
          this.citiesSelectedUnitedStates.length *
          this.numeroCreadoresUnitedStates *
          this.numeroShortVideosUnitedStates;
        this.valorLongTotal +=
          this.citiesSelectedUnitedStates.length *
          this.numeroCreadoresUnitedStates *
          this.numeroLongVideosUnitedStates;
        this.valorContenidosTotal +=
          this.citiesSelectedUnitedStates.length *
          this.numeroCreadoresUnitedStates *
          (this.numeroCarrouselUnitedStates +
            this.numeroLongVideosUnitedStates +
            this.numeroShortVideosUnitedStates);
      }

      // Change Values for Canada
      if (this.verificarCanada == true) {
        //Numero de creadores
        this.ValorNumeroCreadores += this.numeroCreadoresCanada;
        //Ciudades
        this.ValorCiudadesTotal += this.citiesSelectedCanada.length;
        // Valor Total

        this.ValorTotal +=
          this.citiesSelectedCanada.length *
            this.numeroCreadoresCanada *
            this.numeroCarrouselCanada *
            213 +
          this.citiesSelectedCanada.length *
            this.numeroCreadoresCanada *
            this.numeroShortVideosCanada *
            263 +
          this.citiesSelectedCanada.length *
            this.numeroCreadoresCanada *
            this.numeroLongVideosCanada *
            238;

        // Contenidos
        this.valorCarrouselTotal +=
          this.citiesSelectedCanada.length *
          this.numeroCreadoresCanada *
          this.numeroCarrouselCanada;
        this.valorShortTotal +=
          this.citiesSelectedCanada.length *
          this.numeroCreadoresCanada *
          this.numeroShortVideosCanada;
        this.valorLongTotal +=
          this.citiesSelectedCanada.length *
          this.numeroCreadoresCanada *
          this.numeroLongVideosCanada;
        this.valorContenidosTotal +=
          this.citiesSelectedCanada.length *
          this.numeroCreadoresCanada *
          (this.numeroCarrouselCanada +
            this.numeroLongVideosCanada +
            this.numeroShortVideosCanada);
      }

      this.valorPromedioContenido =
        (this.ValorTotal + (0.35 * this.ValorTotal) / 0.65) /
        this.valorContenidosTotal;
    }, 100);
  }

  // Metodo listado de Paises

  getCountryList(): string {
    const countryCount = this.selectedCountry.length;
    if (countryCount < 3) {
      return this.selectedCountry.map((country) => country.name).join(', ');
    } else {
      const displayedCountries = this.selectedCountry
        .slice(0, 2)
        .map((country) => country.name)
        .join(', ');
      return `${displayedCountries} + ${countryCount - 2}`;
    }
  }
}
