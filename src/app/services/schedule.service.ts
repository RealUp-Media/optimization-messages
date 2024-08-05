import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor() {}
  getScheduleData() {
    return [
      {
        id: '1000',
        name: 'Influencer 1',
        link: 'https://redes.com/influencer1',
        contentType: 'Tipo de contenido 1',
        outboundLink: 'https://salida.com/influencer1',
        actualReleaseDate: '2023-01-01',
        expectedReleaseDate: '2023-01-10',
      },
      {
        id: '1001',
        name: 'Influencer 2',
        link: 'https://redes.com/influencer2',
        contentType: 'Tipo de contenido 2',
        outboundLink: 'https://salida.com/influencer2',
        actualReleaseDate: '2023-02-01',
        expectedReleaseDate: '2023-02-10',
      },
      {
        id: '1002',
        name: 'Influencer 3',
        link: 'https://redes.com/influencer3',
        contentType: 'Tipo de contenido 3',
        outboundLink: 'https://salida.com/influencer3',
        actualReleaseDate: '2023-03-01',
        expectedReleaseDate: '2023-03-10',
      },
      {
        id: '1003',
        name: 'Influencer 4',
        link: 'https://redes.com/influencer4',
        contentType: 'Tipo de contenido 4',
        outboundLink: 'https://salida.com/influencer4',
        actualReleaseDate: '2023-04-01',
        expectedReleaseDate: '2023-04-10',
      },
      {
        id: '1004',
        name: 'Influencer 5',
        link: 'https://redes.com/influencer5',
        contentType: 'Tipo de contenido 5',
        outboundLink: 'https://salida.com/influencer5',
        actualReleaseDate: '2023-05-01',
        expectedReleaseDate: '2023-05-10',
      },
      {
        id: '1005',
        name: 'Influencer 6',
        link: 'https://redes.com/influencer6',
        contentType: 'Tipo de contenido 6',
        outboundLink: 'https://salida.com/influencer6',
        actualReleaseDate: '2023-06-01',
        expectedReleaseDate: '2023-06-10',
      },
    ];
  }
}
