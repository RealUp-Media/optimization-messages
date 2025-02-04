import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ModashService } from '../../services/modash.service';
import { InfluencersService } from '../../services/influencers.service';
import { TableModule } from 'primeng/table';
import { GoogleSheetsService } from '../../services/google-sheets.service';
import { lastValueFrom, Observable } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { DropdownModule } from 'primeng/dropdown';
import { error } from 'node:console';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../services/auth.service';
import { DiscoverInfluencersService } from '../../services/discover-influencers.service';
import { response } from 'express';

interface EngagementRate {
  name: string;
  value: number | null; // Usamos `null` para valores no numéricos como "Hidden likes"
}

interface FollowerOption {
  title: string;
  value: number;
}

// interface Location {
//   id: number; // Nombre del país
//   name: string; // Código ISO 3166-1 Alpha-2
//   title: string; // Región (América, Europa, Asia, etc.)
// }

@Component({
  selector: 'app-discover-influencers',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    FieldsetModule,
    DropdownModule,
    PanelModule,
    InputNumberModule,
    MultiSelectModule,
    ChipsModule,
    ReactiveFormsModule,
    FormsModule,
    FloatLabelModule,
  ],
  templateUrl: './discover-influencers.component.html',
  styleUrl: './discover-influencers.component.css',
})
export class DiscoverInfluencersComponent {
  constructor(
    private modashService: ModashService,
    private influencerService: InfluencersService,
    private googleSheetsService: GoogleSheetsService,
    private fb: FormBuilder,
    private http: HttpClient,
    private service: AuthService,
    private discoverInfluencerService: DiscoverInfluencersService
  ) {}

  // Filtros Influencers
  username: string = '';

  locations: any = [];

  selectedCountry: any = [];

  locationsSelected: any = [];

  followersFrom: FollowerOption[] = [
    1000, 3000, 5000, 10000, 15000, 20000, 25000, 35000, 50000, 75000, 100000,
    125000, 150000, 175000, 200000, 250000, 300000, 350000, 500000, 1000000,
    2000000, 5000000, 10000000, 20000000, 50000000,
  ].map((num) => ({
    title: num.toLocaleString('es-ES'), // Formatea el número, por ejemplo, 1000 → "1.000"
    value: num,
  }));

  // Inicialmente, ambos arrays filtrados contienen todas las opciones
  filteredFromOptions: FollowerOption[] = [...this.followersFrom];
  filteredToOptions: FollowerOption[] = [...this.followersFrom];

  // Valores seleccionados (se guardará el "value" numérico)
  selectedFollowersFrom: number | null = null;
  selectedFollowersTo: number | null = null;

  onFromChange() {
    if (this.selectedFollowersFrom !== null) {
      // Filtra las opciones del dropdown "To" para que solo se muestren valores mayores que el seleccionado en "From"
      this.filteredToOptions = this.followersFrom.filter(
        (option) => option.value > this.selectedFollowersFrom!
      );
      // Opcional: Si el valor seleccionado en "To" ya no es válido, reinícialo
      if (
        this.selectedFollowersTo !== null &&
        this.selectedFollowersTo <= this.selectedFollowersFrom
      ) {
        this.selectedFollowersTo = null;
      }
    } else {
      this.filteredToOptions = [...this.followersFrom];
    }
  }

  onToChange() {
    if (this.selectedFollowersTo !== null) {
      // Filtra las opciones del dropdown "From" para que solo se muestren valores menores que el seleccionado en "To"
      this.filteredFromOptions = this.followersFrom.filter(
        (option) => option.value < this.selectedFollowersTo!
      );
      // Opcional: Si el valor seleccionado en "From" ya no es válido, reinícialo
      if (
        this.selectedFollowersFrom !== null &&
        this.selectedFollowersFrom >= this.selectedFollowersTo
      ) {
        this.selectedFollowersFrom = null;
      }
    } else {
      this.filteredFromOptions = [...this.followersFrom];
    }
  }

  gender: any[] = [
    { name: 'Female', value: 'FEMALE' },
    { name: 'Male', value: 'MALE' },
    { name: 'Female or Male', value: '' },
  ];
  selectedGender: any = [];

  engagmentRate: EngagementRate[] = [
    { name: '≥0.5%', value: 0.005 },
    { name: '≥1%', value: 0.01 },
    { name: '≥2% (average)', value: 0.02 },
    { name: '≥3%', value: 0.03 },
    { name: '≥4%', value: 0.04 },
    { name: '≥5%', value: 0.05 },
    { name: '≥6%', value: 0.06 },
    { name: '≥7%', value: 0.07 },
    { name: '≥8%', value: 0.08 },
    { name: '≥9%', value: 0.09 },
    { name: '≥10%', value: 0.1 },
  ];
  selectedEngagmentRate: any = [];

  ngOnInit(): void {
    this.service.verificarToken();
    this.getLocations();
  }

  searchResults: any = [];

  getLocations() {
    this.discoverInfluencerService.getLocations().subscribe((response) => {
      this.locations = response.locations;
    });
  }

  loadData(event: any) {
    // Calcula el número de página: event.first es el índice del primer registro y event.rows la cantidad por página
    const page = event.first / event.rows;

    // Si ya se consultó esta página, carga los datos del caché
    if (this.pageCache.hasOwnProperty(page)) {
      this.searchResults = this.pageCache[page];
      this.currentPage = page;
    } else {
      // Si no, solicita los datos a la API para esa página
      this.discoverInfluencers(page);
    }
  }

  // Guarda los datos por página para evitar nuevas peticiones si ya se consultó esa página
  pageCache: { [page: number]: any[] } = {};

  // Total de resultados (lo que devuelve la API)
  totalResults: number = 0;

  // Variable para la página actual (útil si deseas hacer controles adicionales)
  currentPage: number = 0;

  // MODASH ACTIVO
  discoverInfluencers(page: number = 0) {
    const dataFilter = {
      sort: {
        field: 'followers',
        direction: 'desc',
      },
      page: page,
      filter: {
        influencer: {
          // Incluye el username si se ha ingresado
          ...(this.username ? { username: this.username } : {}),
          followers: {
            min: this.selectedFollowersFrom || 100000,
            max: this.selectedFollowersTo || 1000000000,
          },
          engagementRate: this.selectedEngagmentRate?.value || 0,
          // Se asume que la opción de ubicación tiene la propiedad "id"
          location: this.selectedCountry?.id ? [this.selectedCountry.id] : [],
          gender: this.selectedGender?.value || '',
        },
      },
    };

    this.discoverInfluencerService.discoverInfluencers(dataFilter).subscribe(
      (response) => {
        // Mapea los resultados de la página actual
        const newResults = response.lookalikes.map(
          (lookalike: any, index: number) => {
            // Asigna un id único basado en la página y la posición (suponiendo 15 registros por página)
            const newId = page * 15 + index + 1;
            return {
              id: newId,
              userId: lookalike.userId,
              engagementRate: lookalike.profile.engagementRate,
              engagements: lookalike.profile.engagements,
              followers: lookalike.profile.followers,
              fullname: lookalike.profile.fullname,
              username: lookalike.profile.username,
              url: lookalike.profile.url,
              isVerified: lookalike.profile.isVerified,
              isPrivate: lookalike.profile.isPrivate,
              picture: lookalike.profile.picture,
            };
          }
        );

        // Guarda los resultados en el caché usando el número de página como clave
        this.pageCache[page] = newResults;

        // Asigna los resultados a searchResults para mostrarlos en la tabla
        this.searchResults = newResults;

        // Actualiza el total de registros (útil para el paginator)
        this.totalResults = response.total;

        // Actualiza la página actual
        this.currentPage = page;

        console.log('Search Results:', this.searchResults);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // LOCAL
  // discoverInfluencers() {
  //   this.modashService.discoverInfluencers().subscribe(
  //     (response) => {
  //       console.log(response);
  //       // Recorre el array 'lookalikes' para estructurar los datos deseados
  //       this.searchResults = response.lookalikes.map(
  //         (lookalike: any, index: number) => ({
  //           id: index + 1, // Asignar un ID único basado en el índice
  //           userId: lookalike.userId,
  //           engagementRate: lookalike.profile.engagementRate,
  //           engagements: lookalike.profile.engagements,
  //           followers: lookalike.profile.followers,
  //           fullname: lookalike.profile.fullname,
  //           username: lookalike.profile.username,
  //           url: lookalike.profile.url,
  //           isVerified: lookalike.profile.isVerified,
  //           isPrivate: lookalike.profile.isPrivate,
  //           picture: lookalike.profile.picture,
  //         })
  //       );

  //       console.log('Search Results:', this.searchResults);
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }

  selectedResults: any[] = []; // Fila(s) seleccionada(s)
  influencerData: any = [];

  saveInfluencers(selectedUsers: any[]) {
    this.selectedResults = selectedUsers;

    // Llamar a cada reporte con retraso
    this.processRequestsWithDelay(this.selectedResults)
      .then(() => {
        this.exportToGoogleSheets();
      })
      .catch((error) => {
        console.error('Error al procesar las solicitudes:', error);
      });
  }

  async processRequestsWithDelay(users: any[]) {
    for (const user of users) {
      try {
        await this.getReportByUsername(user.username);
        await this.delay(1000); // Retraso de 1 segundo entre cada petición
      } catch (error) {
        console.error(
          `Error al obtener el reporte para ${user.username}:`,
          error
        );
      }
    }
  }

  getReportByUsername(username: string): Promise<void> {
    return lastValueFrom(
      this.discoverInfluencerService.getReportInstagram(username)
    ).then((response) => {
      const userData = response.profile;

      // Construir el informe del influencer
      const influencerInfo = {
        netwwork: 'Instagram',
        name: userData.profile?.fullname || '', // Nombre completo
        username: userData.profile?.username || '', // Nombre de usuario
        creatorAge: userData.ageGroup || '', // Rango de edad,
        gender: userData.gender || '', // Género
        urlInstagram: userData.profile?.url || '', // URL de Instagram
        country: userData.country || '', // País
        city: userData.city || '', // Ciudad
        followersInstagram: userData.profile?.followers || 0, // Seguidores en Instagram
        engagementRate: userData.profile?.engagementRate || 0.0, // Tasa de interacción
        audienceFemalePercentage: userData.audience?.genders[0]?.weight || 0, // Audiencia femenina
        audienceMalePercentage: userData.audience?.genders[1]?.weight || 0, // Audiencia masculina
        contentCategories:
          userData.interests
            ?.map((interest: any) => interest.name)
            .join(', ') || '', // Categorías de contenido
        languages: userData.language?.name || '', // Idioma
        top1AudienceCity: `${userData.audience?.geoCities?.[0]?.name || ''} ${
          userData.audience?.geoCities?.[0]?.weight || ''
        }`.trim(), // Principal ciudad de audiencia
        top1AudienceCountry: `${
          userData.audience?.geoCountries?.[0]?.name || ''
        } ${userData.audience?.geoCountries?.[0]?.weight || ''}`.trim(), // Principal país de audiencia
      };

      // Agregar el informe a la lista de datos
      this.influencerData.push(influencerInfo);
      console.log('Informe del influencer:', influencerInfo);
    });
  }

  searchInfluencers(): void {
    if (this.username && this.username.trim() !== '') {
      // Si se ha ingresado un username, se hace la búsqueda por username
      this.searchInfluencerByUsername();
    } else {
      // Si el input está vacío, se hace la búsqueda por filtros (por ejemplo, la primera página)
      this.discoverInfluencers(0);
    }
  }

  // Método nuevo para buscar el influencer por username
  searchInfluencerByUsername(): Promise<void> {
    // Se asume que 'this.username' contiene el valor del input (por ejemplo, "cristiano")
    return lastValueFrom(
      this.discoverInfluencerService.getReportInstagram(this.username)
    )
      .then((response) => {
        console.log(response.profile);
        const influencerData = response.profile.profile;
        // Mapeo de la respuesta al formato que se usa en la tabla
        const influencer = {
          id: 1, // Puedes generar un id único o asignar 1 si solo se muestra un resultado
          fullname: influencerData.fullname,
          username: influencerData.username,
          picture: influencerData.picture,
          engagementRate: influencerData.engagementRate,
          engagements: influencerData.engagements,
          followers: influencerData.followers,
          url: influencerData.url,
          // Estos campos no vienen en la respuesta, por lo que se pueden asignar valores por defecto
          isVerified: response.profile.isVerified,
          isPrivate: response.profile.isPrivate,
        };

        // Se asigna el resultado a searchResults para que la tabla lo muestre
        this.searchResults = [influencer];

        console.log('Resultado de búsqueda por username:', influencer);
      })
      .catch((error) => {
        console.error('Error al buscar influencer por username:', error);
      });
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async exportToGoogleSheets() {
    if (this.influencerData.length === 0) {
      console.error('No hay datos para exportar.');
      return;
    }

    try {
      const accessToken = await this.googleSheetsService.requestAccessToken();
      await this.googleSheetsService.createAndPopulateSheet(
        this.influencerData
      );
    } catch (error) {
      console.error('Error exportando a Google Sheets:', error);
    }
  }
  clearFilters() {
    // Resetear valores de los filtros
    this.username = '';
    this.selectedCountry = [];
    this.selectedFollowersFrom = null;
    this.selectedFollowersTo = null;
    this.selectedGender = [];
    this.selectedEngagmentRate = [];

    // Restaurar opciones de dropdown
    this.filteredFromOptions = [...this.followersFrom];
    this.filteredToOptions = [...this.followersFrom];
  }
}
