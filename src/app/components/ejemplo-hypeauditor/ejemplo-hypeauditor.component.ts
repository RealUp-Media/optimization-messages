import { Component } from '@angular/core';
import { EjemploHypeauditorService } from '../../services/ejemplo-hypeauditor.service';
import { CommonModule } from '@angular/common';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { SelectItem } from 'primeng/api';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';

declare var google: any;

@Component({
  selector: 'app-ejemplo-hypeauditor',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    InputNumberModule,
    MultiSelectModule,
    InputSwitchModule,
  ],
  templateUrl: './ejemplo-hypeauditor.component.html',
  styleUrl: './ejemplo-hypeauditor.component.css',
})
export class EjemploHypeauditorComponent {
  private CLIENT_ID =
    '1011214502175-uheqlp6v5jq3mfnmadg6j74rafltr0dv.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyDOFmBr_UnJ9Qyp8VxH7gw3Q0VQlwZq9OQ';
  private DISCOVERY_DOCS = [
    'https://sheets.googleapis.com/$discovery/rest?version=v4',
  ];
  private SCOPES =
    'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file';

  private tokenClient: any;
  private gapiInitialized = false;
  private gisInitialized = false;
  influencerInfo: any = null; // Agrega esta línea

  socialNetworkOptions: SelectItem[] = [
    { label: 'Instagram', value: 'instagram' },
    { label: 'YouTube', value: 'youtube' },
    { label: 'TikTok', value: 'tiktok' },
    { label: 'Twitter', value: 'twitter' },
    { label: 'Twitch', value: 'twitch' },
  ];

  genderOptions: SelectItem[] = [
    { label: 'Masculino', value: 'male' },
    { label: 'Femenino', value: 'female' },
  ];

  countryOptions: SelectItem[] = [
    { label: 'Estados Unidos', value: 'US' },
    { label: 'México', value: 'MX' },
    { label: 'Colombia', value: 'CO' },
    // Agrega más países según necesites
  ];

  ageRangeOptions: SelectItem[] = [
    { label: '13-17', value: '13_17' },
    { label: '18-24', value: '18_24' },
    { label: '25-34', value: '25_34' },
    { label: '35-44', value: '35_44' },
    { label: '45-54', value: '45_54' },
    { label: '55-64', value: '55_64' },
    { label: '65+', value: '65' },
  ];

  // Valores iniciales de los filtros
  filters = {
    socialNetwork: 'instagram', // Valor predeterminado
    accountGender: null,
    accountCountry: null,
    accountAge: [], // Selección múltiple de rangos de edad
    subscribersCount: { from: null, to: null },
    er: { from: null, to: null },
    accountHasContacts: true,
  };

  constructor(private hypeAuditorService: EjemploHypeauditorService) {}

  ngOnInit(): void {
    this.loadGapi();
    this.initializeGisClient();
  }

  nameInfluencer: string = '';

  getReportByUsername() {
    this.hypeAuditorService.getReport(this.nameInfluencer).subscribe(
      (response) => {
        console.log(response);
        const userData = response.result.user;

        this.influencerInfo = {
          name: userData.full_name || userData.username,
          socialLink: `https://instagram.com/${userData.username}`,
          followers: userData.followers_count,
          engagementRate: userData.er.value,
          reach: userData.blogger_reach.reach,
          genderDistribution: {
            male: userData.demography.find((d: any) => d.gender === 'M')?.value,
            female: userData.demography.find((d: any) => d.gender === 'F')
              ?.value,
          },
          topCountries: userData.audience_geography.countries
            .slice(0, 3)
            .map((country: any) => ({
              name: country.name,
              percentage: country.value,
            })),
        };

        // Llamar a createSheetAndAddData una vez que tenemos la información del influencer
        this.handleAuthClick();
      },
      (error) => {
        console.error('Error fetching report:', error);
      }
    );
  }

  loadGapi() {
    // Load the Google API client library for Sheets
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      gapi.load('client', async () => {
        await gapi.client.init({
          apiKey: this.API_KEY,
          discoveryDocs: this.DISCOVERY_DOCS,
        });
        this.gapiInitialized = true;
        this.maybeEnableButtons();
      });
    };
    document.body.appendChild(script);
  }

  initializeGisClient() {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: (tokenResponse: any) => {
        if (tokenResponse && tokenResponse.access_token) {
          this.createSheetAndAddData(tokenResponse.access_token);
        }
      },
    });
    this.gisInitialized = true;
    this.maybeEnableButtons();
  }

  maybeEnableButtons() {
    if (this.gapiInitialized && this.gisInitialized) {
      // Enable your app’s buttons or UI as both GIS and GAPI are ready
    }
  }

  handleAuthClick() {
    // Request an access token
    this.tokenClient.requestAccessToken();
  }

  createSheetAndAddData(accessToken: string) {
    const influencerInfo = this.influencerInfo;

    // Datos para poblar en la hoja de cálculo
    const values = [
      [
        'Influencer UGC',
        'Redes sociales',
        'Seguidores',
        'E.R',
        'Reach',
        'Genero',
        'Pais',
      ],
      [
        influencerInfo.name,
        influencerInfo.socialLink,
        influencerInfo.followers,
        influencerInfo.engagementRate,
        influencerInfo.reach,
        `M: ${influencerInfo.genderDistribution.male}%\nF: ${influencerInfo.genderDistribution.female}%`,
        influencerInfo.topCountries
          .map((country: any) => `${country.name}: ${country.percentage}%`)
          .join('\n'),
      ],
    ];

    gapi.client.sheets.spreadsheets
      .create({
        properties: {
          title: 'Influencer Report',
        },
      })
      .then((response: any) => {
        const spreadsheetId = response.result.spreadsheetId;

        // Población de la hoja con los datos
        gapi.client.sheets.spreadsheets.values
          .update({
            spreadsheetId: spreadsheetId,
            range: 'Sheet1!A1', // Celda inicial
            valueInputOption: 'RAW',
            resource: {
              values: values,
            },
          })
          .then(() => {
            console.log('Data added to sheet:', spreadsheetId);
          });
      });
  }

  searchResults: any[] = [];

  sendRequest() {
    const requestBody: any = {
      social_network: this.filters.socialNetwork,
      account_has_contacts: this.filters.accountHasContacts,
    };

    // Agrega los campos solo si están definidos
    if (this.filters.accountGender) {
      requestBody.account_gender = this.filters.accountGender;
    }
    if (this.filters.accountCountry) {
      requestBody.account_geo = { country: [this.filters.accountCountry] };
    }
    if (this.filters.accountAge.length > 0) {
      requestBody.audience_age = { groups: this.filters.accountAge };
    }
    if (
      this.filters.subscribersCount.from ||
      this.filters.subscribersCount.to
    ) {
      requestBody.subscribers_count = {
        from: this.filters.subscribersCount.from,
        to: this.filters.subscribersCount.to,
      };
    }
    // if (this.filters.er.from || this.filters.er.to) {
    //   requestBody.er = { from: this.filters.er.from, to: this.filters.er.to };
    // }

    this.hypeAuditorService.sendData(requestBody).subscribe(
      (response) => {
        this.searchResults = response.result.search_results.map(
          (result: any, index: any) => ({
            ...result,
            basic: {
              ...result.basic,
              id: index + 1, // Asignar un id único basado en el índice
            },
          })
        );

        console.log('Search Results:', this.searchResults);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  uploadAllSearchResultsToGoogleSheet() {
    if (!this.searchResults || this.searchResults.length === 0) {
      console.error('No hay resultados para guardar.');
      return;
    }

    const values = [
      [
        'Title',
        'Username',
        'Avatar URL',
        'ER (%)',
        'Subscribers',
        'Real Subscribers',
        'AQS',
        'Blogger Topics',
      ],
    ];

    this.searchResults.forEach((result) => {
      values.push([
        result.basic.title,
        result.basic.username,
        result.basic.avatar_url,
        result.metrics.er.value,
        result.metrics.subscribers_count.value,
        result.metrics.real_subscribers_count.value,
        result.features.aqs.data.mark,
        result.features.blogger_topics.data.join(', '),
      ]);
    });

    gapi.client.sheets.spreadsheets
      .create({
        properties: {
          title: 'All Search Results',
        },
      })
      .then((response: any) => {
        const spreadsheetId = response.result.spreadsheetId;

        gapi.client.sheets.spreadsheets.values
          .update({
            spreadsheetId: spreadsheetId,
            range: 'Sheet1!A1',
            valueInputOption: 'RAW',
            resource: {
              values: values,
            },
          })
          .then(() => {
            console.log(`Datos guardados correctamente en: ${spreadsheetId}`);
          })
          .catch((error: any) => {
            console.error('Error al actualizar la hoja:', error);
          });
      })
      .catch((error: any) => {
        console.error('Error al crear la hoja:', error);
      });
  }

  selectedResults: any[] = []; // Fila(s) seleccionada(s)

  // Este método es opcional si quieres manejar eventos al seleccionar filas
  onRowSelect(event: any) {
    console.log('Fila seleccionada:', event);
  }

  generateReportsForSelectedRows() {
    if (!this.selectedResults || this.selectedResults.length === 0) {
      console.error('No hay filas seleccionadas.');
      return;
    }

    const values = [
      [
        'Name',
        'Social Link',
        'Followers',
        'ER (%)',
        'Reach',
        'Male %',
        'Female %',
        'Top Countries',
      ], // Encabezados
    ];

    // Itera sobre las filas seleccionadas y realiza las peticiones
    const requests = this.selectedResults.map((result) =>
      this.hypeAuditorService.getReport(result.basic.username).toPromise()
    );

    Promise.all(requests)
      .then((responses) => {
        responses.forEach((response: any) => {
          const userData = response.result.user;

          values.push([
            userData.full_name || userData.username,
            `https://instagram.com/${userData.username}`,
            userData.followers_count,
            userData.er.value,
            userData.blogger_reach.reach,
            userData.demography.find((d: any) => d.gender === 'M')?.value || 0,
            userData.demography.find((d: any) => d.gender === 'F')?.value || 0,
            userData.audience_geography.countries
              .slice(0, 3)
              .map((country: any) => `${country.name}: ${country.value}%`)
              .join(', '),
          ]);
        });

        // Crear y poblar la hoja de Google Sheets con los datos generados
        this.createSheetAndAddDataAll(values);
      })
      .catch((error) => {
        console.error('Error obteniendo los reportes:', error);
      });
  }

  createSheetAndAddDataAll(values: any[][]) {
    gapi.client.sheets.spreadsheets
      .create({
        properties: {
          title: 'Selected Influencer Reports',
        },
      })
      .then((response: any) => {
        const spreadsheetId = response.result.spreadsheetId;

        gapi.client.sheets.spreadsheets.values
          .update({
            spreadsheetId: spreadsheetId,
            range: 'Sheet1!A1',
            valueInputOption: 'RAW',
            resource: {
              values: values,
            },
          })
          .then(() => {
            console.log(
              `Datos agregados correctamente en la hoja: ${spreadsheetId}`
            );
          })
          .catch((error: any) => {
            console.error('Error actualizando la hoja:', error);
          });
      })
      .catch((error: any) => {
        console.error('Error creando la hoja:', error);
      });
  }
}
