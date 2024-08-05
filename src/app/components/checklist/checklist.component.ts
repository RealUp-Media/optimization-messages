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

interface TipoContenido {
  name: string;
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
  ],
  templateUrl: './checklist.component.html',
  styleUrl: './checklist.component.css',
})
export class ChecklistComponent {
  constructor(
    private route: ActivatedRoute,
    private checklistService: ChecklistService,
    private campaignService: CampaignService
  ) {}
  ngOnInit() {
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

  // Dialog Checklist

  visibleOneCheck: boolean = false;

  showDialogOneCheck() {
    this.visibleOneCheck = true;
  }

  disableOne: boolean = true;

  linkOne: string = '';
  commentOne: string = '';
  ValuesOne: boolean = false;
  disableCheckOne() {
    this.disableOne = false;
    this.ValuesOne = true;
  }

  // Servicio checklist

  tasks: any = {};
  idCampaign: number = 1022;
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
  }
}
