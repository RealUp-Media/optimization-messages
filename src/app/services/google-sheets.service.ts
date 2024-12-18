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
        'Network',
        'Username',
        'Followers',
        'Engagement Rate',
        'Country',
        'City',
      ],
    ];

    // Agrega las filas de datos
    data.forEach((item) => {
      values.push([
        item.name,
        item.network,
        item.username,
        item.followers,
        item.engagementRate,
        item.country,
        item.city,
      ]);
    });

    try {
      // Crear la hoja de cálculo
      const response = await gapi.client.sheets.spreadsheets.create({
        properties: {
          title: 'Influencer Styled Report',
        },
      });

      const spreadsheetId = response.result.spreadsheetId;

      // Insertar los datos
      await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        resource: {
          values: values,
        },
      });

      // Aplicar estilos al encabezado y ajustar columnas
      await gapi.client.sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [
            // 1. Aplicar estilos al encabezado
            {
              repeatCell: {
                range: {
                  sheetId: 0,
                  startRowIndex: 0,
                  endRowIndex: 1,
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: { red: 0.2, green: 0.6, blue: 0.86 }, // Color azul claro
                    horizontalAlignment: 'CENTER',
                    textFormat: {
                      foregroundColor: { red: 1, green: 1, blue: 1 }, // Texto blanco
                      fontSize: 12,
                      bold: true,
                    },
                  },
                },
                fields:
                  'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)',
              },
            },
            // 2. Ajustar el ancho de las columnas
            {
              updateDimensionProperties: {
                range: {
                  sheetId: 0,
                  dimension: 'COLUMNS',
                  startIndex: 0,
                  endIndex: 7, // Ajustar las primeras 7 columnas
                },
                properties: {
                  pixelSize: 150, // Ancho de 150 píxeles
                },
                fields: 'pixelSize',
              },
            },
            // 3. Ajustar altura de filas
            {
              updateDimensionProperties: {
                range: {
                  sheetId: 0,
                  dimension: 'ROWS',
                  startIndex: 0,
                  endIndex: values.length,
                },
                properties: {
                  pixelSize: 25,
                },
                fields: 'pixelSize',
              },
            },
          ],
        },
      });

      console.log(`Datos y estilos agregados correctamente: ${spreadsheetId}`);
    } catch (error) {
      console.error('Error interactuando con Google Sheets:', error);
    }
  }
}
