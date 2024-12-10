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
import { DataViewModule } from 'primeng/dataview';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { GlobalConfig } from '../../global-config';

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
  ],
  templateUrl: './influencers.component.html',
  styleUrl: './influencers.component.css',
})
export class InfluencersComponent {
  prompt: string = ''; // Guardará el prompt del usuario
  influencers: any[] = []; // Datos mostrados en la tabla
  loading: boolean = false;
  baseUrl: string = BASE_URL;

  constructor(private http: HttpClient) {}

  encodeUrl(url: string): string {
    return encodeURIComponent(url);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.http
      .get('http://localhost:8080/manual-ops/api/influencers/see-influencer')
      .subscribe(
        (response: any) => {
          this.influencers = response; // Actualiza los datos de la tabla
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
      .post('http://localhost:8080/manual-ops/api/influencers/search', {
        prompt: this.prompt,
      })
      .subscribe(
        (response: any) => {
          this.influencers = response; // Actualiza los datos de la tabla
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

  searchValue: string = '';

  sendEmailToInfluencer(email: string) {
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

  sendMessageToInfluencer(number: string) {
    const numberRightFormat = parseInt(number);
    const whatsappUlr = 'https://wa.me/';
    window.open(whatsappUlr + numberRightFormat, '_blank'); // Abre Gmail en una nueva pestaña
  }

  selectedInfluencer: any;

  showDetails(event: any, influencer: any, overlayPanel: any) {
    this.selectedInfluencer = influencer;
    overlayPanel.toggle(event);
  }
}
