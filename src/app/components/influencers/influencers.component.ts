import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { DataView, DataViewModule } from 'primeng/dataview';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { GlobalConfig } from '../../global-config';
import { CheckboxModule } from 'primeng/checkbox';
import { GoogleSheetsService } from '../../services/google-sheets.service';
import { InfluencersService } from '../../services/influencers.service';
import { SkeletonModule } from 'primeng/skeleton';
import { trigger, transition, style, animate } from '@angular/animations';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';

// URL Base de mi Back-End
const BASE_URL = GlobalConfig.apiUrl;

@Component({
  selector: 'app-influencers',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
    DropdownModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextareaModule,
    ButtonModule,
    DataViewModule,
    OverlayPanelModule,
    ToastModule,
    FloatLabelModule,
    CheckboxModule,
    SkeletonModule,
    ToastModule,
    DialogModule,
  ],
  templateUrl: './influencers.component.html',
  styleUrl: './influencers.component.css',
  animations: [
    trigger('delayedFadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms 200ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
  providers: [MessageService],
})
export class InfluencersComponent {
  prompt: string = ''; // Guardará el prompt del usuario
  influencersData: any = []; // Datos mostrados en la tabla
  loading: boolean = true;
  baseUrl: string = BASE_URL;

  constructor(
    private http: HttpClient,
    private googleSheetsService: GoogleSheetsService,
    private influencerService: InfluencersService,
    private messageService: MessageService
  ) {}

  encodeUrl(url: string): string {
    return encodeURIComponent(url);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllInfluencers();
  }

  getAllInfluencers() {
    this.influencerService.getAllInfluencer().subscribe(
      (response: any) => {
        this.influencersData = response;
        this.loading = false;
        console.log(response);
      },

      (error) => {
        console.error('Error:', error);
        alert('Hubo un problema al realizar la búsqueda.');
        this.loading = false;
      }
    );
  }

  // Método para buscar influencers basado en el prompt
  onSearch() {
    if (!this.prompt.trim()) {
      alert('Por favor, escribe un prompt válido.');
      return;
    }

    this.loading = true;
    this.http
      .post(BASE_URL + 'manual-ops/api/influencers/search', {
        prompt: this.prompt,
      })
      .subscribe(
        (response: any) => {
          this.influencersData = response; // Actualiza los datos de la tabla
          this.loading = false;
          console.log(response);
        },
        (error) => {
          console.error('Error:', error);
          alert('Hubo un problema al realizar la búsqueda.');
          this.loading = false;
        }
      );
  }

  sendEmailToInfluencer(email: string, event: Event) {
    event.stopPropagation(); // Detiene la propagación del evento
    const recipient = email; // Reemplaza con el correo del destinatario
    const subject = 'Asunto del correo';
    const body = 'Este es el contenido del correo.';
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      recipient
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank'); // Abre Gmail en una nueva pestaña
  }

  openSocialMedia(socialMediaUrl: string) {
    window.open(socialMediaUrl, '_blank'); // Abre Gmail en una nueva pestaña
  }

  sendMessageToInfluencer(number: string, event: Event) {
    event.stopPropagation(); // Detiene la propagación del evento

    const numberRightFormat = parseInt(number);
    const whatsappUlr = 'https://wa.me/';
    window.open(whatsappUlr + numberRightFormat, '_blank'); // Abre Gmail en una nueva pestaña
  }

  selectedInfluencer: any;

  showDetails(event: any, influencer: any, overlayPanel: any) {
    event.stopPropagation(); // Detiene la propagación del evento
    this.selectedInfluencer = influencer;
    overlayPanel.toggle(event);
  }

  // Seleccion de Influencers

  selectedInfluencers: any[] = []; // Lista de influencers seleccionados
  toggleSelection(influencer: any) {
    influencer.selected = !influencer.selected;
    if (influencer.selected) {
      this.selectedInfluencers.push(influencer);
    } else {
      this.selectedInfluencers = this.selectedInfluencers.filter(
        (item) => item !== influencer
      );
    }
    console.log('Selected Influencers:', this.selectedInfluencers);
  }

  // Guardar mis datos en Google Sheets

  exportSelectedInfluencers() {
    if (!this.selectedInfluencers || this.selectedInfluencers.length === 0) {
      alert('Por favor selecciona al menos un influencer.');
      return;
    }

    // Procesa los datos seleccionados para cada red social
    const processedData: any[] = [];
    this.selectedInfluencers.forEach((influencer) => {
      influencer.selectedNetworks.forEach((networkKey: string) => {
        const networkIndex = this.exportOptions.find(
          (option) => option.key === networkKey
        )?.index;

        if (networkIndex !== undefined) {
          processedData.push({
            name: influencer.name || '',
            network: networkKey.charAt(0).toUpperCase() + networkKey.slice(1), // Formatea el nombre de la red
            username: influencer.usernameInfluencer[networkIndex]?.value || '',
            followers: influencer.followers[networkIndex]?.value || 0,
            engagementRate: influencer.engagementRate[networkIndex]?.value || 0,
            country: influencer.country || '',
            city: influencer.city || '',
          });
        }
      });
    });

    // Exportar a Google Sheets
    this.googleSheetsService
      .requestAccessToken()
      .then(() =>
        this.googleSheetsService.createAndPopulateSheet(processedData)
      )
      .then(() => {
        this.showMessageSucces();
        this.visibleDialog = false;
      })
      .catch((error) => {
        console.error('Error exportando a Google Sheets:', error);
        this.showMessageError();
      });
  }

  // Mensaje de carga de datos correcto

  showMessageSucces() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data exported correctly',
    });
  }

  showMessageError() {
    this.messageService.add({
      severity: 'error',
      summary: 'error',
      detail: 'There was a problem loading the data',
    });
  }

  // Pantalla de Carga

  counterArray(length: number): number[] {
    return Array.from({ length }, (_, index) => index);
  }

  // Seleccionar que redes sociales quiero

  visibleDialog: boolean = false;
  selectedNetworks: string[] = []; // Redes seleccionadas

  exportOptions = [
    { name: 'Instagram', key: 'instagram', index: 0 },
    { name: 'TikTok', key: 'tiktok', index: 1 },
    { name: 'YouTube', key: 'youtube', index: 2 },
  ];

  openExportDialog() {
    this.selectedInfluencers = this.influencersData
      .filter((influencer: any) => influencer.selected)
      .map((influencer: any) => ({
        ...influencer,
        selectedNetworks: [], // Almacena las redes seleccionadas para cada influencer
      }));

    if (this.selectedInfluencers.length > 0) {
      this.visibleDialog = true;
    } else {
      alert('Por favor selecciona al menos un influenciador.');
    }
  }

  exportSelectedNetworks() {
    if (!this.selectedNetworks.length) {
      alert('Selecciona al menos una red social para exportar.');
      return;
    }

    const exportData = this.exportOptions
      .filter((option) => this.selectedNetworks.includes(option.key))
      .map((option) => ({
        platform: option.name,
        username:
          this.selectedInfluencer.usernameInfluencer[option.index]?.value || '',
        followers: this.selectedInfluencer.followers[option.index]?.value || 0,
        engagementRate:
          this.selectedInfluencer.engagementRate[option.index]?.value || 0,
      }));

    console.log('Datos seleccionados para exportar:', exportData);
    alert(
      'Datos exportados con éxito. Revisa la consola para ver los resultados.'
    );
    this.visibleDialog = false; // Cierra el diálogo
  }

  exportNetworks() {
    const exportData = this.selectedInfluencers.map((influencer) => ({
      name: influencer.name,
      networks: this.exportOptions
        .filter((option) => influencer.selectedNetworks.includes(option.key))
        .map((option) => ({
          platform: option.name,
          username: influencer.usernameInfluencer[option.index]?.value || '',
          followers: influencer.followers[option.index]?.value || 0,
          engagementRate: influencer.engagementRate[option.index]?.value || 0,
        })),
    }));

    console.log('Datos exportados:', exportData);
    alert('Datos exportados con éxito. Revisa la consola para más detalles.');
    this.visibleDialog = false; // Cierra el diálogo
  }
}
