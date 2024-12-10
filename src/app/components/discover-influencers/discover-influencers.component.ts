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
    private http: HttpClient
  ) {}

  locations: any = [];
  locationsSelected: any = [];

  ngOnInit(): void {
    console.log(this.dataFilter);
    this.locations = this.getLocations();
    console.log(this.locations);
  }

  getLocations(): Observable<any> {
    return this.http.get('/assets/locations.json');
  }

  dataFilter: any = {
    page: 0,
    sort: {
      field: 'followers',
      value: 123,
      direction: 'desc',
    },
    filter: {
      influencer: {
        followers: {
          min: 50000,
          max: 80000,
        },
        engagementRate: 0.04,
        language: 'en',
        lastposted: 90,
        gender: 'MALE',
        age: {
          min: 18,
          max: 25,
        },
      },
    },
  };
  searchResults: [] = [];

  discoverInfluencers() {
    this.modashService.discoverInfluencers(this.dataFilter).subscribe(
      (response) => {
        // Recorre el array 'lookalikes' para estructurar los datos deseados
        this.searchResults = response.lookalikes.map(
          (lookalike: any, index: number) => ({
            id: index + 1, // Asignar un ID único basado en el índice
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
          })
        );

        console.log('Search Results:', this.searchResults);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

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
    return lastValueFrom(this.modashService.getReportInstagram(username)).then(
      (response) => {
        const userData = response.profile;

        // Construir el informe del influencer
        const influencerInfo = {
          name: userData.profile?.fullname || '', // Nombre completo
          username: userData.profile?.username || '', // Nombre de usuario
          creatorAge: userData.ageGroup || '', // Rango de edad
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
      }
    );
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
}
