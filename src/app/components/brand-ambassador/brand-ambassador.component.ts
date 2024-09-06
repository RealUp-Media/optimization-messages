import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BrandAmbassadorService } from '../../services/brand-ambassador.service';
import { CitiesService } from '../../services/cities.service';

// Imports

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

interface GeneralInterests {
  name: string;
}

interface Idiom {
  name: string;
}

interface Ages {
  name: string;
}

interface Gender {
  name: string;
}

interface SocialMedia {
  name: string;
}

interface CreatorFollowers {
  name: string;
}

interface CreatorGender {
  name: string;
}
@Component({
  selector: 'app-brand-ambassador',
  templateUrl: './brand-ambassador.component.html',
  styleUrl: './brand-ambassador.component.css',
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
export class BrandAmbassadorComponent {
  date: Date[] | undefined;

  citiesFinal: string[] = [''];
  selectedCountry: string = '';
  numeroCreadores: number = 1;

  countries: string[] = [
    'Argentina',
    'Bolivia',
    'Brasil',
    'Canada',
    'Chile',
    'Colombia',
    'Costa Rica',
    'Cuba',
    'Dominican Republic',
    'Ecuador',
    'El Salvador',
    'Guatemala',
    'Honduras',
    'Mexico',
    'Nicaragua',
    'Panama',
    'Paraguay',
    'Peru',
    'Puerto Rico',
    'United States',
    'Uruguay',
    'Venezuela',
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

  generalInterests: GeneralInterests[] = [
    { name: 'Lifestyle' },
    { name: 'Comedy' },
    { name: 'Moms' },
    { name: 'Wellness' },
    { name: 'Nutrition' },
    { name: 'Fitness' },
    { name: 'Beauty' },
    { name: 'Foodies' },
    { name: 'Family' },
    { name: 'Travelers' },
    { name: 'Sports' },
    { name: 'Movies' },
    { name: 'Recommendations / Plans' },
    { name: 'Pets' },
    { name: 'Technology' },
    { name: 'Gamers' },
    { name: 'Fashion Beauty' },
    { name: 'Artists/Music' },
  ];

  idioms: Idiom[] = [
    { name: 'Spanish' },
    { name: 'English' },
    { name: 'Portuguese' },
  ];

  ages: Ages[] = [
    { name: '13 - 19' },
    { name: '20 - 35' },
    { name: '36 - 55' },
    { name: '56 - 75' },
    { name: '75+' },
  ];

  gender: Gender[] = [
    { name: 'Male' },
    { name: 'Female' },
    { name: 'No preference' },
  ];

  socialMedia: SocialMedia[] = [
    { name: 'Instagram Post' },
    { name: 'Instagram Story' },
    { name: 'Instagram Reel' },
    { name: 'TikTok Video' },
    { name: 'YouTube Video' },
  ];

  creatorFollowers: CreatorFollowers[] = [
    { name: '1k - 10k' },
    { name: '10k - 100k' },
    { name: '100k - 500k' },
    { name: '500k - 1M' },
    { name: '1M - 5M' },
    { name: '+5M' },
    { name: 'Macro + Celebrity' },
  ];

  creatorGender: CreatorGender[] = [
    { name: 'Male' },
    { name: 'Female' },
    { name: 'No preference' },
  ];

  client = new FormControl('', Validators.required);
  campaign_name = new FormControl('', Validators.required);
  campaign_objective = new FormControl('', Validators.required);
  brief_campaign_objective = new FormControl('', Validators.required);
  location = new FormControl('', Validators.required);
  cities = new FormControl('', Validators.required);
  cities_argentina = new FormControl('', Validators.required);
  cities_bolivia = new FormControl('', Validators.required);
  cities_brasil = new FormControl('', Validators.required);
  cities_chile = new FormControl('', Validators.required);
  cities_colombia = new FormControl('', Validators.required);
  cities_ecuador = new FormControl('', Validators.required);
  cities_paraguay = new FormControl('', Validators.required);
  cities_peru = new FormControl('', Validators.required);
  cities_uruguay = new FormControl('', Validators.required);
  cities_venezuela = new FormControl('', Validators.required);
  audience_interests = new FormControl('', Validators.required);
  audience_language = new FormControl('', Validators.required);
  audience_ages = new FormControl('', Validators.required);
  audience_genders = new FormControl('', Validators.required);
  content_type = new FormControl('', Validators.required);
  creator_gender = new FormControl('', Validators.required);
  brief_video_content = new FormControl('', Validators.required);
  date_publish = new FormControl('', Validators.required);
  minimum_followers = new FormControl('', Validators.required);
  number_creators = new FormControl('', Validators.required);

  saveClientForm = new FormGroup({
    client: this.client,
    campaign_objective: this.campaign_objective,
    brief_campaign_objective: this.brief_campaign_objective,
    campaign_name: this.campaign_name,
    location: this.location,
    cities: this.cities,
    cities_argentina: this.cities_argentina,
    cities_bolivia: this.cities_bolivia,
    cities_brasil: this.cities_brasil,
    cities_chile: this.cities_chile,
    cities_colombia: this.cities_colombia,
    cities_ecuador: this.cities_ecuador,
    cities_paraguay: this.cities_paraguay,
    cities_peru: this.cities_peru,
    cities_uruguay: this.cities_uruguay,
    cities_venezuela: this.cities_venezuela,
    audience_interests: this.audience_interests,
    audience_language: this.audience_language,
    audience_ages: this.audience_ages,
    audience_genders: this.audience_genders,
    content_type: this.content_type,
    creator_gender: this.creator_gender,
    brief_video_content: this.brief_video_content,
    date_publish: this.date_publish,
    minimum_followers: this.minimum_followers,
    number_creators: this.number_creators,
  });

  ngOnInit() {
    this.service.verificarToken();
    this.getCities();
  }

  constructor(
    private service: AuthService,

    private BrandAmbassadorService: BrandAmbassadorService,
    private router: Router,
    private citiesService: CitiesService
  ) {}

  saveClientCrowdposting() {
    console.log(this.saveClientForm.value);
    this.BrandAmbassadorService.saveSaleBrandAmbassador(
      this.saveClientForm.value
    ).subscribe(() => {
      console.log();
      alert('¡La compra se envio con exito!');
      this.router.navigateByUrl('/ugc');
    });
  }

  // changeCountry(){
  //   if(this.selectedCountry == 'Colombia'){
  //     this.citiesFinal = this.citiesListColombia
  //   }
  //   if(this.selectedCountry == 'Panama'){
  //     this.citiesFinal = this.citiesListPanama
  //   }
  //   if(this.selectedCountry == 'Brasil'){
  //     this.citiesFinal = this.citiesListBrazil
  //   }
  //   if(this.selectedCountry == 'Peru'){
  //     this.citiesFinal = this.citiesListPeru
  //   }
  //   if(this.selectedCountry == 'Estados Unidos'){
  //     this.citiesFinal = this.citiesListUSA
  //   }
  // }

  sumCreators() {
    this.numeroCreadores += 1;
  }

  restCreators() {
    if (this.numeroCreadores > 1) {
      this.numeroCreadores--;
    }
  }

  putCreators(event: number) {
    this.numeroCreadores = event;
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

  showCities() {
    if (this.selectedCountry.includes('Argentina')) {
      this.verificarArgentina = true;
    } else {
      this.verificarArgentina = false;
    }
    if (this.selectedCountry.includes('Bolivia')) {
      this.verificarBolivia = true;
    } else {
      this.verificarBolivia = false;
    }
    if (this.selectedCountry.includes('Brasil')) {
      this.verificarBrasil = true;
    } else {
      this.verificarBrasil = false;
    }
    if (this.selectedCountry.includes('Chile')) {
      this.verificarChile = true;
    } else {
      this.verificarChile = false;
    }
    if (this.selectedCountry.includes('Colombia')) {
      this.verificarColombia = true;
    } else {
      this.verificarColombia = false;
    }
    if (this.selectedCountry.includes('Ecuador')) {
      this.verificarEcuador = true;
    } else {
      this.verificarEcuador = false;
    }
    if (this.selectedCountry.includes('Paraguay')) {
      this.verificarParaguay = true;
    } else {
      this.verificarParaguay = false;
    }
    if (this.selectedCountry.includes('Peru')) {
      this.verificarPeru = true;
    } else {
      this.verificarPeru = false;
    }
    if (this.selectedCountry.includes('Uruguay')) {
      this.verificarUruguay = true;
    } else {
      this.verificarUruguay = false;
    }
    if (this.selectedCountry.includes('Venezuela')) {
      this.verificarVenezuela = true;
    } else {
      this.verificarVenezuela = false;
    }
    if (this.selectedCountry.includes('Costa Rica')) {
      this.verificarCostaRica = true;
    } else {
      this.verificarCostaRica = false;
    }
    if (this.selectedCountry.includes('Cuba')) {
      this.verificarCuba = true;
    } else {
      this.verificarCuba = false;
    }
    if (this.selectedCountry.includes('El Salvador')) {
      this.verificarElSalvador = true;
    } else {
      this.verificarElSalvador = false;
    }
    if (this.selectedCountry.includes('Guatemala')) {
      this.verificarGuatemala = true;
    } else {
      this.verificarGuatemala = false;
    }
    if (this.selectedCountry.includes('Honduras')) {
      this.verificarHonduras = true;
    } else {
      this.verificarHonduras = false;
    }
    if (this.selectedCountry.includes('Mexico')) {
      this.verificarMexico = true;
    } else {
      this.verificarMexico = false;
    }
    if (this.selectedCountry.includes('Nicaragua')) {
      this.verificarNicaragua = true;
    } else {
      this.verificarNicaragua = false;
    }
    if (this.selectedCountry.includes('Panama')) {
      this.verificarPanama = true;
    } else {
      this.verificarPanama = false;
    }
    if (this.selectedCountry.includes('Puerto Rico')) {
      this.verificarPuertoRico = true;
    } else {
      this.verificarPuertoRico = false;
    }
    if (this.selectedCountry.includes('Dominican Republic')) {
      this.verificarDominicanRepublic = true;
    } else {
      this.verificarDominicanRepublic = false;
    }
    if (this.selectedCountry.includes('United States')) {
      this.verificarUnitedStates = true;
    } else {
      this.verificarUnitedStates = false;
    }
    if (this.selectedCountry.includes('Canada')) {
      this.verificarCanada = true;
    } else {
      this.verificarCanada = false;
    }
  }

  // Generar ciudades

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

  options = [
    { id: 'awareness', label: 'Awareness', value: 0 },
    { id: 'consideration', label: 'Consideration', value: 1 },
    { id: 'conversion', label: 'Conversion', value: 2 },
    { id: 'loyalty', label: 'Loyalty', value: 3 },
  ];
}
