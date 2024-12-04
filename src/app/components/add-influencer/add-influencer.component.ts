import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { ModashService } from '../../services/modash.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InfluencersService } from '../../services/influencers.service';

interface SocialNetwork {
  name: string;
}

@Component({
  selector: 'app-add-influencer',
  standalone: true,
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    RatingModule,
    ButtonModule,
    InputSwitchModule,
    TableModule,
    CommonModule,
  ],
  templateUrl: './add-influencer.component.html',
  styleUrl: './add-influencer.component.css',
})
export class AddInfluencerComponent {
  constructor(
    private modashService: ModashService,
    private influencerService: InfluencersService
  ) {}

  socialNetworkSelect: SocialNetwork | undefined;
  socialNetwork: SocialNetwork[] = [
    { name: 'Instagram' },
    { name: 'TikTok' },
    { name: 'YouTube' },
  ];

  teamExperienceRating: number = 0;
  teamExperienceComment: string = '';
  contactPhone: string = '';
  contactEmail: string = '';

  usernameSelected: string = '';
  influencerInfo: any = null; // Agrega esta línea

  influencerData: any[] = []; // Lista para almacenar los datos del influencer

  getReportByUsername() {
    this.modashService.getReportInstagram(this.usernameSelected).subscribe(
      (response) => {
        const userData = response.profile;
        console.log(userData);
        var emailContact: any = [{ name: '', value: '' }];

        if (this.contactEmail == '') {
          emailContact = userData.contacts.find(
            (contact: any) => contact.type === 'email'
          );
        } else {
          emailContact.value = this.contactEmail;
        }

        console.log(userData);
        this.influencerInfo = {
          name: userData.profile?.fullname || '', // Nombre completo
          username: userData.profile?.username || '', // Nombre de usuario
          creatorAge: userData.ageGroup || '', // Rango de edad
          gender: userData.gender || '', // Género del influencer
          urlInstagram: userData.profile?.url || '', // URL de Instagram
          country: userData.country || '', // País del influencer
          city: userData.city || '', // Ciudad del influencer
          followersInstagram: userData.profile?.followers || 0, // Seguidores en Instagram
          engagementRate: userData.profile?.engagementRate || 0.0, // Tasa de interacción
          audienceFemalePercentage: userData.audience?.genders[0].weight || 0,
          audienceMalePercentage: userData.audience?.genders[1].weight || 0,
          contentCategories:
            userData.interests
              .map((interest: any) => interest.name)
              .join(', ') || '',
          languages: userData.language?.name || '', // Idioma principal

          top1AudienceCity: `${userData.audience?.geoCities?.[0]?.name || ''} ${
            userData.audience?.geoCities?.[0]?.weight || ''
          }`.trim(),

          top1AudienceCountry: `${
            userData.audience?.geoCountries?.[0]?.name || ''
          } ${userData.audience?.geoCountries?.[0]?.weight || ''}`.trim(),

          // Nuestros datos
          teamExperienceRating: this.teamExperienceRating,
          teamExperienceComment: this.teamExperienceComment,

          contactEmail: emailContact ? emailContact.value : '',

          contactPhone: this.contactPhone,
        };

        // Actualizar los datos de la tabla
        this.influencerData = [this.influencerInfo]; // Reemplazar con el nuevo array
        console.log(this.influencerData);
      },
      (error) => {
        console.error('Error fetching report:', error);
      }
    );
  }

  openSocialMedia(socialMediaUrl: string) {
    window.open(socialMediaUrl, '_blank'); // Abre Gmail en una nueva pestaña
  }

  pruebaRating() {
    console.log(this.teamExperienceRating);
  }

  postInfluencer() {
    console.log(this.influencerInfo);
    this.influencerService
      .postInfluencer(this.influencerInfo)
      .subscribe((response) => {
        console.log('Campaign saved successfully', response);
      });
  }
}
