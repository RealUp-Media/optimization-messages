import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ChecklistService } from '../../services/checklist.service';
import { privateDecrypt } from 'node:crypto';
import { CampaignService } from '../../services/campaign.service';
import { CampaignComponent } from '../campaign/campaign.component';
import { InplaceModule } from 'primeng/inplace';
import { KnobModule } from 'primeng/knob';

interface TipoContenido {
  name: string;
}

interface Campaign {
  name: string;
  image_url: string;
}

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    InputTextModule,
    ChipsModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    AccordionModule,
    InputTextareaModule,
    CommonModule,
    InplaceModule,
    KnobModule,
  ],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.css',
})
export class ChecklistComponent {
  constructor(
    private route: ActivatedRoute,
    private checklistService: ChecklistService,
    private campaignService: CampaignService,
    private campaignComponent: CampaignComponent
  ) {}

  numberOfContents: number = 0;

  campaign: Campaign = { name: '', image_url: '' };

  ngOnInit() {
    this.verifyContent();
    this.tipoContenidos = [
      { name: 'Reel' },
      { name: 'TikTok' },
      { name: 'Story' },
      { name: 'YouTube Video' },
    ];

    this.route.paramMap.subscribe((params) => {
      this.idCampaign = Number(params.get('idCampaign'));
      this.checklistService
        .getTaskCompleted(this.idCampaign)
        .subscribe((data) => {
          this.tasks = data;
          this.updateTaskChecks();
        });
    });

    this.campaignService.getCampaignById(this.idCampaign).subscribe(
      (response) => {
        this.campaign = response;
        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService
      .getNumberOfContents(this.idCampaign)
      .subscribe((data) => {
        this.numberOfContents = data;
      });
  }

  // Configurar Dialog

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  values: string[] | undefined;

  tipoContenidos: TipoContenido[] | undefined;

  ContenidoSeleccionado: TipoContenido | undefined;

  date: Date | undefined;

  // Servicio checklist

  tasks: any = {};
  idCampaign: number = 0;
  cuantityTrue: number = 0;

  updateTaskChecks() {
    this.checked_one = this.tasks.task_1;
    this.checked_two = this.tasks.task_2;
    this.checked_three = this.tasks.task_3;
    this.checked_four = this.tasks.task_4;
    this.checked_five = this.tasks.task_5;
    this.checked_six = this.tasks.task_6;
    this.checked_seven = this.tasks.task_7;
    this.checked_eight = this.tasks.task_8;
    this.checked_nine = this.tasks.task_9;
    this.checked_ten = this.tasks.task_10;
    this.checked_eleven = this.tasks.task_11;
    this.checked_twelve = this.tasks.task_12;
    this.checked_thirteen = this.tasks.task_13;
    this.checked_fourteen = this.tasks.task_14;
    this.checked_fiveteen = this.tasks.task_15;
    this.checked_sixteen = this.tasks.task_16;
    this.checked_seventeen = this.tasks.task_17;
    this.checked_eighteen = this.tasks.task_18;

    this.commentTask1 = this.tasks.comment_task_1;
    this.commentTask2 = this.tasks.comment_task_2;
    this.commentTask3 = this.tasks.comment_task_3;
    this.commentTask4 = this.tasks.comment_task_4;
    this.commentTask5 = this.tasks.comment_task_5;
    this.commentTask6 = this.tasks.comment_task_6;
    this.commentTask7 = this.tasks.comment_task_7;
    this.commentTask8 = this.tasks.comment_task_8;
    this.commentTask9 = this.tasks.comment_task_9;
    this.commentTask10 = this.tasks.comment_task_10;
    this.commentTask11 = this.tasks.comment_task_11;
    this.commentTask12 = this.tasks.comment_task_12;
    this.commentTask13 = this.tasks.comment_task_13;
    this.commentTask14 = this.tasks.comment_task_14;
    this.commentTask15 = this.tasks.comment_task_15;
    this.commentTask16 = this.tasks.comment_task_16;
    this.commentTask17 = this.tasks.comment_task_17;
    this.commentTask18 = this.tasks.comment_task_18;

    this.linkTask2 = this.tasks.link_task_2;
    this.linkTask4 = this.tasks.link_task_4;
    this.linkTask5 = this.tasks.link_task_5;
    this.linkTask7 = this.tasks.link_task_7;
    this.linkTask9 = this.tasks.link_task_9;
    this.linkTask16 = this.tasks.link_task_16;
    this.linkTask18 = this.tasks.link_task_18;

    this.contentCompleted = this.tasks.content_completed;

    this.verifyContent(); // Verifica el contenido del link y actualiza el estado del checkbox
  }

  checked_one: boolean = false;
  checked_two: boolean = false;
  checked_three: boolean = false;
  checked_four: boolean = false;
  checked_five: boolean = false;
  checked_six: boolean = false;
  checked_seven: boolean = false;
  checked_eight: boolean = false;
  checked_nine: boolean = false;
  checked_ten: boolean = false;
  checked_eleven: boolean = false;
  checked_twelve: boolean = false;
  checked_thirteen: boolean = false;
  checked_fourteen: boolean = false;
  checked_fiveteen: boolean = false;
  checked_sixteen: boolean = false;
  checked_seventeen: boolean = false;
  checked_eighteen: boolean = false;

  onTaskChange() {
    this.cuantityTrue = 0;

    if (this.checked_one == true) this.cuantityTrue += 1;
    if (this.checked_two == true) this.cuantityTrue += 1;
    if (this.checked_three == true) this.cuantityTrue += 1;
    if (this.checked_four == true) this.cuantityTrue += 1;
    if (this.checked_five == true) this.cuantityTrue += 1;
    if (this.checked_six == true) this.cuantityTrue += 1;
    if (this.checked_seven == true) this.cuantityTrue += 1;
    if (this.checked_eight == true) this.cuantityTrue += 1;
    if (this.checked_nine == true) this.cuantityTrue += 1;
    if (this.checked_ten == true) this.cuantityTrue += 1;
    if (this.checked_eleven == true) this.cuantityTrue += 1;
    if (this.checked_twelve == true) this.cuantityTrue += 1;
    if (this.checked_thirteen == true) this.cuantityTrue += 1;
    if (this.checked_fourteen == true) this.cuantityTrue += 1;
    if (this.checked_fiveteen == true) this.cuantityTrue += 1;
    if (this.checked_sixteen == true) this.cuantityTrue += 1;
    if (this.checked_seventeen == true) this.cuantityTrue += 1;
    if (this.checked_eighteen == true) this.cuantityTrue += 1;
    const updatedTasks = {
      task_1: this.checked_one,
      task_2: this.checked_two,
      task_3: this.checked_three,
      task_4: this.checked_four,
      task_5: this.checked_five,
      task_6: this.checked_six,
      task_7: this.checked_seven,
      task_8: this.checked_eight,
      task_9: this.checked_nine,
      task_10: this.checked_ten,
      task_11: this.checked_eleven,
      task_12: this.checked_twelve,
      task_13: this.checked_thirteen,
      task_14: this.checked_fourteen,
      task_15: this.checked_fiveteen,
      task_16: this.checked_sixteen,
      task_17: this.checked_seventeen,
      task_18: this.checked_eighteen,
      number_task_completed: this.cuantityTrue,
    };

    const taskCompletedFinal = {
      task_completed: this.cuantityTrue,
    };

    this.checklistService
      .updateTaskCompleted(this.idCampaign, updatedTasks)
      .subscribe(
        (response) => {
          console.log('Tasks updated successfully', response);
        },
        (error) => {
          console.error('Error updating tasks', error);
        }
      );

    this.campaignService
      .updateNumberCompletedTask(this.idCampaign, taskCompletedFinal)
      .subscribe(
        (response) => {
          console.log('Tasks updated successfully', response);
        },
        (error) => {
          console.error('Error updating tasks', error);
        }
      );
    this.campaignComponent.loadCampaigns();
  }

  // Comentarios y links y tasks

  commentTask1: string = '';
  commentTask2: string = '';
  commentTask3: string = '';
  commentTask4: string = '';
  commentTask5: string = '';
  commentTask6: string = '';
  commentTask7: string = '';
  commentTask8: string = '';
  commentTask9: string = '';
  commentTask10: string = '';
  commentTask11: string = '';
  commentTask12: string = '';
  commentTask13: string = '';
  commentTask14: string = '';
  commentTask15: string = '';
  commentTask16: string = '';
  commentTask17: string = '';
  commentTask18: string = '';

  contentCompleted: number = 0;

  saveContentTask(inplace: any) {
    const contentTaskData = {
      comment_task_1: this.commentTask1,
      comment_task_2: this.commentTask2,
      comment_task_3: this.commentTask3,
      comment_task_4: this.commentTask4,
      comment_task_5: this.commentTask5,
      comment_task_6: this.commentTask6,
      comment_task_7: this.commentTask7,
      comment_task_8: this.commentTask8,
      comment_task_9: this.commentTask9,
      comment_task_10: this.commentTask10,
      comment_task_11: this.commentTask11,
      comment_task_12: this.commentTask12,
      comment_task_13: this.commentTask13,
      comment_task_14: this.commentTask14,
      comment_task_15: this.commentTask15,
      comment_task_16: this.commentTask16,
      comment_task_17: this.commentTask17,
      comment_task_18: this.commentTask18,

      link_task_2: this.linkTask2,
      link_task_4: this.linkTask4,
      link_task_5: this.linkTask5,
      link_task_7: this.linkTask7,
      link_task_9: this.linkTask9,
      link_task_16: this.linkTask16,
      link_task_18: this.linkTask18,

      content_completed: this.contentCompleted,
    };

    console.log(contentTaskData);

    this.checklistService
      .updateContentTaskCompleted(this.idCampaign, contentTaskData)
      .subscribe(
        (response) => {
          console.log('Tasks updated successfully', response);
        },
        (error) => {
          console.error('Error updating tasks', error);
        }
      );
    inplace.deactivate();
  }

  goHome() {
    window.open('campaign', '_self');
  }

  // Verificar contenidos (comentario, link)

  linkTask2: string = '';
  linkTask4: string = '';
  linkTask5: string = '';
  linkTask7: string = '';
  linkTask9: string = '';
  linkTask16: string = '';
  linkTask18: string = '';

  disableTwo: boolean = true;
  disableFour: boolean = true;
  disableFive: boolean = true;
  disableSeven: boolean = true;
  disableNine: boolean = true;
  disableSixteen: boolean = true;
  disableEighteen: boolean = true;

  // Verifica si el link está vacío y actualiza el checkbox
  verifyContent() {
    if (this.linkTask2 === '') {
      this.disableTwo = true; // Deshabilitar el checkbox si está vacío
      this.checked_two = false; // Desmarcar el checkbox si el link está vacío
    } else {
      this.disableTwo = false; // Habilitar el checkbox si hay contenido
    }

    if (this.linkTask4 === '') {
      this.disableFour = true; // Deshabilitar el checkbox si está vacío
      this.checked_four = false; // Desmarcar el checkbox si el link está vacío
    } else {
      this.disableFour = false; // Habilitar el checkbox si hay contenido
    }

    if (this.linkTask5 === '') {
      this.disableFive = true; // Deshabilitar el checkbox si está vacío
      this.checked_five = false; // Desmarcar el checkbox si el link está vacío
    } else {
      this.disableFive = false; // Habilitar el checkbox si hay contenido
    }

    if (this.linkTask7 === '') {
      this.disableSeven = true; // Deshabilitar el checkbox si está vacío
      this.checked_seven = false; // Desmarcar el checkbox si el link está vacío
    } else {
      this.disableSeven = false; // Habilitar el checkbox si hay contenido
    }

    if (this.linkTask9 === '') {
      this.disableNine = true; // Deshabilitar el checkbox si está vacío
      this.checked_nine = false; // Desmarcar el checkbox si el link está vacío
    } else {
      this.disableNine = false; // Habilitar el checkbox si hay contenido
    }

    if (this.linkTask16 === '') {
      this.disableSixteen = true; // Deshabilitar el checkbox si está vacío
      this.checked_sixteen = false; // Desmarcar el checkbox si el link está vacío
    } else {
      this.disableSixteen = false; // Habilitar el checkbox si hay contenido
    }

    if (this.linkTask18 === '') {
      this.disableEighteen = true; // Deshabilitar el checkbox si está vacío
      this.checked_eighteen = false; // Desmarcar el checkbox si el link está vacío
    } else {
      this.disableEighteen = false; // Habilitar el checkbox si hay contenido
    }
  }
}
