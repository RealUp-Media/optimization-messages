import { Component } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { InplaceModule } from 'primeng/inplace';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

interface DailyTask {
  id: number;
  op: string;
  task: string;
  comment: string;
  task_completed: boolean;
  order_task: number;
  titleTask: string;
  nameCampaign: string;
  dateTask: string | Date; // Puede ser string o Date, dependiendo de la conversión
}

@Component({
  selector: 'app-daily-sales',
  standalone: true,
  imports: [
    ButtonModule,
    FloatLabelModule,
    DropdownModule,
    AccordionModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    InplaceModule,
    InputTextareaModule,
    CheckboxModule,
    CalendarModule,
    DialogModule,
    InputTextModule,
  ],
  templateUrl: './daily-sales.component.html',
  styleUrl: './daily-sales.component.css',
})
export class DailySalesComponent {
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllDailyTask();
  }
  statusCampaign: any[] = [
    { status: 'PREPARATION', source: 'assets/icons/letter-p.svg' },
    { status: 'EXECUTION', source: 'assets/icons/letter-e.svg' },
    { status: 'CLOSED', source: 'assets/icons/letter-c.svg' },
    { status: 'ARCHIVED', source: 'assets/icons/letter-a.svg' },
    { status: 'APPROVAL', source: 'assets/icons/letter-i.svg' },
    { status: 'DELETED', source: 'assets/icons/letter-d.svg' },
  ];

  listSales: any[] = ['Maria Cipamocha', 'Carolina Correa', 'Daniela Quintana'];
  OpSelected: string = '';

  colors: string[] = ['#4CAF50', '#8BC34A', '#FFC107', '#F44336', '#D0D2D5'];
  colorSelected: string = '';

  SaleSelected: string = '';

  listTitleDaily: any[] = [
    'Visibilidad a Cliente: 5 min',
    'Hablar con perfiles para ejecución',
    'Hablar con perfiles para ppt y/o cotización',
    'Entrega de propuestas y/o cotizaciones',
    'Reuniones del día',
    'Otros',
  ];

  constructor(private campaignService: CampaignService) {}

  showDailySales() {
    window.open('daily-sales', '_self');
  }

  showDailyOps() {
    window.open('daily-checklist', '_self');
  }

  showCampaign() {
    window.open('campaign', '_self');
  }

  showWeeklyWorkload() {
    window.open('weekly-workloads', '_self');
  }

  showChatbot() {
    window.open('chatbot', '_self');
  }

  showCotizador() {
    window.open('home', '_self');
  }

  allDailyTask: any[] = [];
  getAllDailyTask() {
    this.campaignService.getAllDailyTask().subscribe(
      (response) => {
        this.allDailyTask = response.map((task: DailyTask) => {
          // Convertir dateTask a objeto Date si no lo es
          if (task.dateTask && !(task.dateTask instanceof Date)) {
            task.dateTask = new Date(task.dateTask);
          }
          return task;
        });

        // Ordenar las tareas por order_task
        this.allDailyTask.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.log('Error get DailyTask', error);
      }
    );
  }

  getAllCampaigns() {
    this.campaignService.getAllCampaigns().subscribe(
      (response) => {
        this.allCampaigns = response;
      },
      (error) => {
        console.log('Error get Campaign', error);
      }
    );
  }

  allCampaigns: any[] = [];

  getBrandByNameOp(nameOp: string): string[] {
    return Array.from(
      new Set(
        this.allCampaigns
          .filter((item) => item.name_op === nameOp)
          .map((item) => item.brand)
      )
    );
  }

  getClientByNameOp(nameOp: string, brand: string): string[] {
    return Array.from(
      new Set(
        this.allCampaigns
          .filter((item) => item.name_op === nameOp && item.brand == brand)
          .map((item) => item.client)
      )
    );
  }

  getCampaignByNameOp(nameOp: string, brand: string, client: string): any[] {
    return this.allCampaigns.filter(
      (item) =>
        item.name_op === nameOp && item.brand == brand && item.client == client
    );
  }

  displayDialogNewTask: boolean = false;
  newItemHeader: string = '';
  newItemContent: string = '';
  nameCampaign: string = '';
  nameOp: string = '';

  titleOPS: string = '';

  showDialogNewTask(nameOp: string) {
    this.nameOp = nameOp;
    this.displayDialogNewTask = true;
  }

  updateColorCampaign(data: any) {
    this.campaignService.updateColorCampaign(data).subscribe(
      (response) => {
        console.log('Color updated successfully', response);
      },
      (error) => {
        console.error('Color updating tasks', error);
      }
    );
  }

  getItemsByCampaign(name: string) {
    return this.allDailyTask.filter((item) => item.nameCampaign === name);
  }

  drop(event: CdkDragDrop<any[]>) {
    let indexTask: number = 0;
    let indexPreviousTask: number = 0;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      for (const item of event.container.data) {
        for (const itemAll of this.allDailyTask) {
          if (item.id === itemAll.id) {
            itemAll.order_task = indexTask;
            indexTask++;
            break;
          }
        }
      }
      this.allDailyTask.sort((a, b) => a.order_task - b.order_task);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      for (const item of event.container.data) {
        for (const itemAll of this.allDailyTask) {
          if (item.id === itemAll.id) {
            itemAll.order_task = indexPreviousTask;
            indexPreviousTask++;
            break;
          }
        }
      }

      this.allDailyTask.sort((a, b) => a.order_task - b.order_task);
    }
    console.log(event);
    this.updateAllDaily(this.allDailyTask);
  }

  updateAllDaily(dailyData: any[]) {
    this.campaignService.updateAllDaily(dailyData).subscribe(
      (response) => {
        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );
  }

  saveAndCloseTask(inplace: any, dailyData: any) {
    this.campaignService.updateDaily(dailyData).subscribe(
      (response) => {
        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    inplace.deactivate();
  }

  deleteDaily(idDaily: any) {
    this.campaignService.deleteOpDaily(idDaily).subscribe(
      (response) => {
        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error deleting tasks', error);
      }
    );

    setTimeout(() => {
      this.getAllDailyTask();
    }, 200);
  }

  getItemsByTitle(nameOp: string) {
    return this.allDailyTask.filter((item) => item.op === nameOp);
  }

  addDailyTask(op: string, task: string, comment: string) {
    const dailyData = {
      op: op,
      task: task,
      comment: comment,
      titleTask: this.titleOPS,
    };

    this.campaignService.addDaily(dailyData).subscribe(
      (response) => {
        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.displayDialogNewTask = false;

    this.newItemHeader = '';
    this.newItemContent = '';

    setTimeout(() => {
      this.getAllDailyTask();
    }, 200);
  }
}
