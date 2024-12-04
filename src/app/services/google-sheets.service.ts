import { Injectable } from '@angular/core';

declare var gapi: any;
declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleSheetsService {
  private CLIENT_ID =
    '1011214502175-uheqlp6v5jq3mfnmadg6j74rafltr0dv.apps.googleusercontent.com';
  private API_KEY = 'AIzaSyDOFmBr_UnJ9Qyp8VxH7gw3Q0VQlwZq9OQ';
  private DISCOVERY_DOCS = [
    'https://sheets.googleapis.com/$discovery/rest?version=v4',
  ];
  private SCOPES =
    'https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file';

  private gapiInitialized = false;
  private gisInitialized = false;
  private tokenClient: any;

  constructor() {
    this.loadGapi();
    this.initializeGisClient();
  }

  // Carga la API de Google
  private loadGapi() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      gapi.load('client', async () => {
        await gapi.client.init({
          apiKey: this.API_KEY,
          discoveryDocs: this.DISCOVERY_DOCS,
        });
        this.gapiInitialized = true;
      });
    };
    document.body.appendChild(script);
  }

  // Inicializa el cliente de autenticación
  private initializeGisClient() {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: (tokenResponse: any) => {
        console.log('Token recibido:', tokenResponse);
      },
    });
    this.gisInitialized = true;
  }

  // Solicita un token de acceso
  requestAccessToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.tokenClient.callback = (tokenResponse: any) => {
        if (tokenResponse.access_token) {
          resolve(tokenResponse.access_token);
        } else {
          reject('Error obteniendo el token.');
        }
      };
      this.tokenClient.requestAccessToken();
    });
  }

  // Crear y poblar una hoja con los datos
  async createAndPopulateSheet(data: any[]): Promise<void> {
    const values = [
      [
        'Name',
        'Username',
        'Creator Age',
        'Gender',
        'Instagram URL',
        'Country',
        'City',
        'Followers',
        'Engagement Rate',
        'Female Audience %',
        'Male Audience %',
        'Content Categories',
        'Languages',
        'Top Audience City',
        'Top Audience Country',
      ],
    ];

    // Agrega las filas de datos
    data.forEach((item) => {
      values.push([
        item.name,
        item.username,
        item.creatorAge,
        item.gender,
        item.urlInstagram,
        item.country,
        item.city,
        item.followersInstagram,
        item.engagementRate,
        item.audienceFemalePercentage,
        item.audienceMalePercentage,
        item.contentCategories,
        item.languages,
        item.top1AudienceCity,
        item.top1AudienceCountry,
      ]);
    });

    try {
      const response = await gapi.client.sheets.spreadsheets.create({
        properties: {
          title: 'Influencer Reports',
        },
      });

      const spreadsheetId = response.result.spreadsheetId;

      await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        resource: {
          values: values,
        },
      });

      console.log(`Datos agregados correctamente a la hoja: ${spreadsheetId}`);
    } catch (error) {
      console.error('Error interactuando con Google Sheets:', error);
    }
  }
}
