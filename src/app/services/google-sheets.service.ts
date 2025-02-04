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

    data.forEach((item) => {
      values.push([
        item.name,
        item.network,
        item.username,
        item.followersInstagram,
        item.engagementRate,
        item.country,
        item.city,
      ]);
    });

    try {
      const response = await gapi.client.sheets.spreadsheets.create({
        properties: {
          title: 'Influencer Report',
        },
      });

      const spreadsheetId = response.result.spreadsheetId;

      await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!A2',
        valueInputOption: 'RAW',
        resource: {
          values: values,
        },
      });

      await gapi.client.sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        resource: {
          requests: [
            {
              mergeCells: {
                range: {
                  sheetId: 0,
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: 7,
                },
                mergeType: 'MERGE_ALL',
              },
            },
            {
              repeatCell: {
                range: {
                  sheetId: 0,
                  startRowIndex: 0,
                  endRowIndex: 1,
                  startColumnIndex: 0,
                  endColumnIndex: 7,
                },
                cell: {
                  userEnteredValue: { stringValue: 'Mapeo de influenciadores' },
                  userEnteredFormat: {
                    backgroundColor: { red: 0, green: 1, blue: 1 },
                    horizontalAlignment: 'CENTER',
                    textFormat: {
                      foregroundColor: { red: 0, green: 0, blue: 0 },
                      fontSize: 14,
                      bold: true,
                    },
                  },
                },
                fields: 'userEnteredValue,userEnteredFormat',
              },
            },
            {
              repeatCell: {
                range: {
                  sheetId: 0,
                  startRowIndex: 1,
                  endRowIndex: 2,
                  startColumnIndex: 0,
                  endColumnIndex: 7,
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: { red: 0, green: 0, blue: 0 },
                    horizontalAlignment: 'CENTER',
                    textFormat: {
                      foregroundColor: { red: 1, green: 1, blue: 1 },
                      fontSize: 12,
                      bold: true,
                    },
                  },
                },
                fields:
                  'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)',
              },
            },
            {
              repeatCell: {
                range: {
                  sheetId: 0,
                  startRowIndex: 2,
                  endRowIndex: values.length + 1,
                  startColumnIndex: 0,
                  endColumnIndex: 7,
                },
                cell: {
                  userEnteredFormat: {
                    horizontalAlignment: 'CENTER',
                  },
                },
                fields: 'userEnteredFormat(horizontalAlignment)',
              },
            },
            {
              updateCells: {
                range: {
                  sheetId: 0,
                  startRowIndex: 2,
                  endRowIndex: values.length + 1,
                  startColumnIndex: 3,
                  endColumnIndex: 4,
                },
                rows: values.slice(1).map((row) => ({
                  values: [
                    {
                      userEnteredValue: { numberValue: parseInt(row[3], 10) },
                      userEnteredFormat: {
                        numberFormat: {
                          type: 'NUMBER',
                          pattern: '#,##0',
                        },
                      },
                    },
                  ],
                })),
                fields: 'userEnteredValue,userEnteredFormat.numberFormat',
              },
            },
            {
              updateCells: {
                range: {
                  sheetId: 0,
                  startRowIndex: 2,
                  endRowIndex: values.length + 1,
                  startColumnIndex: 4,
                  endColumnIndex: 5,
                },
                rows: values.slice(1).map((row) => ({
                  values: [
                    {
                      userEnteredValue: { numberValue: parseFloat(row[4]) },
                      userEnteredFormat: {
                        numberFormat: {
                          type: 'NUMBER',
                          pattern: '#,##0.00',
                        },
                      },
                    },
                  ],
                })),
                fields: 'userEnteredValue,userEnteredFormat.numberFormat',
              },
            },
            {
              updateDimensionProperties: {
                range: {
                  sheetId: 0,
                  dimension: 'COLUMNS',
                  startIndex: 0,
                  endIndex: 7,
                },
                properties: {
                  pixelSize: 150,
                },
                fields: 'pixelSize',
              },
            },
            {
              updateDimensionProperties: {
                range: {
                  sheetId: 0,
                  dimension: 'ROWS',
                  startIndex: 0,
                  endIndex: values.length + 1,
                },
                properties: {
                  pixelSize: 25,
                },
                fields: 'pixelSize',
              },
            },
            {
              updateBorders: {
                range: {
                  sheetId: 0,
                  startRowIndex: 2,
                  endRowIndex: values.length + 1,
                  startColumnIndex: 0,
                  endColumnIndex: 7,
                },
                innerHorizontal: {
                  style: 'DASHED',
                  width: 2,
                  color: { red: 0.5, green: 0.5, blue: 0.5 },
                },
                innerVertical: {
                  style: 'DASHED',
                  width: 2,
                  color: { red: 0.5, green: 0.5, blue: 0.5 },
                },
                bottom: {
                  style: 'DASHED',
                  width: 2,
                  color: { red: 0.5, green: 0.5, blue: 0.5 },
                },
                top: {
                  style: 'DASHED',
                  width: 2,
                  color: { red: 0.5, green: 0.5, blue: 0.5 },
                },
                left: {
                  style: 'DASHED',
                  width: 2,
                  color: { red: 0.5, green: 0.5, blue: 0.5 },
                },
                right: {
                  style: 'DASHED',
                  width: 2,
                  color: { red: 0.5, green: 0.5, blue: 0.5 },
                },
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
