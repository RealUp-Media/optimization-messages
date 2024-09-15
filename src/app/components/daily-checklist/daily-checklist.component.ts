import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InplaceModule } from 'primeng/inplace';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { TreeModule } from 'primeng/tree';
import { CampaignService } from '../../services/campaign.service';
import { TreeDragDropService, TreeNode } from 'primeng/api';
import { response, Router } from 'express';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { error } from 'node:console';
import { Item } from 'pdfmake-wrapper';

@Component({
  selector: 'app-daily-checklist',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    BaseChartDirective,
    ProgressBarModule,
    DialogModule,
    DropdownModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    SelectButtonModule,
    CalendarModule,
    AccordionModule,
    CheckboxModule,
    ReactiveFormsModule,
    ToastModule,
    InplaceModule,
    InputTextareaModule,
    FloatLabelModule,
    ProgressSpinnerModule,
    TreeModule,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
  ],
  providers: [TreeDragDropService],

  templateUrl: './daily-checklist.component.html',
  styleUrl: './daily-checklist.component.css',
})
export class DailyChecklistComponent {
  constructor(private campaignService: CampaignService) {}

  connectedDropLists: string[] = [];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.'
    setTimeout(() => {
      this.getAllDailyTask();
      this.getAllCampaigns();
    }, 500);
  }

  dailyDanielaListFirst: any[] = [];
  dailyDanielaListSecond: any[] = [];
  dailyDanielaListThird: any[] = [];
  dailyDanielaListFourth: any[] = [];
  dailyDanielaListFifth: any[] = [];
  dailyDanielaListSixth: any[] = [];

  dailyEstefanyListFirst: any[] = [];
  dailyEstefanyListSecond: any[] = [];
  dailyEstefanyListThird: any[] = [];
  dailyEstefanyListFourth: any[] = [];
  dailyEstefanyListFifth: any[] = [];
  dailyEstefanyListSixth: any[] = [];

  dailyLuisaListFirst: any[] = [];
  dailyLuisaListSecond: any[] = [];
  dailyLuisaListThird: any[] = [];
  dailyLuisaListFourth: any[] = [];
  dailyLuisaListFifth: any[] = [];
  dailyLuisaListSixth: any[] = [];

  saveAndCloseTask(inplace: any, dailyData: any) {
    // Aquí puedes realizar cualquier acción de guardado antes de cerrar
    this.campaignService.updateDaily(dailyData).subscribe(
      (response) => {
        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    // Cierra el inplace
    inplace.deactivate();
  }

  deleteDaily(idDaily: any) {
    console.log(idDaily);
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

  addDailyTask(name: string, op: string, task: string, comment: string) {
    const dailyData = {
      op: op,
      task: task,
      comment: comment,
      titleTask: this.titleOPS,
      nameCampaign: name,
    };

    this.campaignService.addDaily(dailyData).subscribe(
      (response) => {
        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.displayDialogDaniela = false;
    this.displayDialogEstefany = false;
    this.displayDialogLuisa = false;

    this.newItemHeaderEstefany = '';
    this.newItemContentEstefany = '';
    this.newItemHeaderDaniela = '';
    this.newItemContentDaniela = '';
    this.newItemHeaderLuisa = '';
    this.newItemContentLuisa = '';

    setTimeout(() => {
      this.getAllDailyTask();
    }, 200);
  }

  titleOPS: string = '';

  // Daily OPS

  // Daniela

  displayDialogDaniela: boolean = false;
  newItemHeaderDaniela: string = '';
  newItemContentDaniela: string = '';
  nameCampaign: string = '';

  showDialogDaniela(name: string) {
    this.nameCampaign = name;
    this.displayDialogDaniela = true;
  }

  // Estefany

  displayDialogEstefany: boolean = false;
  newItemHeaderEstefany: string = '';
  newItemContentEstefany: string = '';

  showDialogEstefany() {
    this.displayDialogEstefany = true;
  }

  // Luisa

  displayDialogLuisa: boolean = false;
  newItemHeaderLuisa: string = '';
  newItemContentLuisa: string = '';

  showDialogLuisa() {
    this.displayDialogLuisa = true;
  }

  // Drop

  // drop(
  //   event: CdkDragDrop<
  //     {
  //       id: number;
  //       task: string;
  //       comment: string;
  //       task_completed: boolean;
  //       op: string;
  //       titleTask: String;
  //       dateTask: string;
  //       nameCampaign: string;
  //     }[]
  //   >,
  //   title: string,
  //   nameCampaign: string
  // ) {
  //   // Verificar que los contenedores de arrastre tengan datos válidos
  //   if (!event.previousContainer.data || !event.container.data) {
  //     console.error('Los datos del contenedor son indefinidos');
  //     return;
  //   }

  //   // Si el arrastre ocurre dentro de la misma lista
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );

  //     const newItem = event.container.data[event.currentIndex];

  //     if (newItem) {
  //       this.campaignService
  //         .updateDaily({
  //           ...newItem,
  //           order_task: event.currentIndex,
  //           titleTask: title,
  //         })
  //         .subscribe(
  //           (response) => console.log('Task updated successfully', response),
  //           (error) => console.error('Error updating task', error)
  //         );
  //     } else {
  //       console.error('El nuevo elemento de arrastre es indefinido.');
  //     }
  //   } else {
  //     // Si el arrastre ocurre entre diferentes listas
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );

  //     const newItem = event.container.data[event.currentIndex];
  //     this.allDailyTask[event.currentIndex] =
  //       event.container.data[event.currentIndex];
  //     this.allDailyTask[event.previousIndex] =
  //       event.container.data[event.previousIndex];

  //     if (newItem) {
  //       this.campaignService
  //         .updateDaily({
  //           ...newItem,
  //           order_task: event.currentIndex,
  //           titleTask: title, // Título de la lista de destino
  //         })
  //         .subscribe(
  //           (response) => console.log('Task updated successfully', response),
  //           (error) => console.error('Error updating task', error)
  //         );

  //       // Actualizar todas las posiciones de la nueva lista (opcional)
  //       setTimeout(() => {
  //         event.container.data.forEach((task, i) => {
  //           this.campaignService
  //             .updateDailyTitle({
  //               id: task.id,
  //               order_task: i,
  //             })
  //             .subscribe(
  //               (response) =>
  //                 console.log('Task updated successfully', response),
  //               (error) => console.error('Error updating task', error)
  //             );
  //         });
  //       }, 1000);
  //     } else {
  //       console.error('El nuevo elemento de arrastre es indefinido.');
  //     }

  //     setTimeout(() => {
  //       this.getAllDailyTask();
  //     }, 1000);
  //   }
  //   console.log(event);
  // }

  drop(event: CdkDragDrop<any[]>, title: string) {
    let found = false;
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

      console.log(event.container.data[event.currentIndex]);
      console.log(event.container.data[event.previousIndex]);

      console.log(event);
      console.log(this.allDailyTask);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      for (const item of this.allDailyTask) {
        if (item.id === event.container.data[event.currentIndex].id) {
          this.allDailyTask[indexTask].titleTask = title;
          break; // Sale del bucle interno
        } else {
          indexTask++;
        }
      }

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

      console.log(event);
      // console.log(this.allDailyTask);
    }

    this.updateAllDaily(this.allDailyTask);
  }

  showCampaign() {
    window.open('campaign', '_self');
  }

  nameCampaignDaniela: [] = [];
  nameCampaignEstefany: [] = [];
  nameCampaignLuisa: [] = [];

  // Obtiene los nombres de las campaign de cada OP
  // getNameCampaign() {
  //   const name = 'Daniela Quintana';
  //   this.campaignService.getNameCampaign(name).subscribe(
  //     (response) => {
  //       this.nameCampaignDaniela = response;
  //     },
  //     (error) => {
  //       console.error('Error updating tasks', error);
  //     }
  //   );

  //   this.campaignService.getNameCampaign('Estefany Bermudez').subscribe(
  //     (response) => {
  //       this.nameCampaignEstefany = response;
  //     },
  //     (error) => {
  //       console.error('Error updating tasks', error);
  //     }
  //   );

  //   this.campaignService.getNameCampaign('Luisa Clavijo').subscribe(
  //     (response) => {
  //       this.nameCampaignLuisa = response;
  //     },
  //     (error) => {
  //       console.error('Error updating tasks', error);
  //     }
  //   );
  // }

  @ViewChildren(CdkDropList) dropLists: QueryList<CdkDropList> =
    new QueryList<CdkDropList>();

  getDropLists(index: number) {
    // Devuelve una lista de identificadores conectados
    return this.dropLists.toArray().filter((_, i) => i !== index);
  }

  getInplaceReference(index: number, type = 'task') {
    return document.getElementById(`inplace-${index}`);
  }

  getConnectedLists(currentIndex: number) {
    // Devuelve todas las listas de arrastre excepto la actual
    return this.dropLists.toArray().filter((_, i) => i !== currentIndex);
  }

  trackById(index: number, item: any): number {
    return item.id; // O cualquier otra propiedad única
  }

  getItemsByCampaign(titleTask: string, nameOp: string) {
    return this.allDailyTask.filter(
      (item) => item.op === nameOp && item.titleTask === titleTask
    );
    return this.allDailyTask;
  }

  allDailyTask: any[] = [];
  getAllDailyTask() {
    this.campaignService.getAllDailyTask().subscribe(
      (response) => {
        this.allDailyTask = response;
        this.allDailyTask.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.log('Error get DailyTask', error);
      }
    );
  }

  listTitleDaily: any[] = [
    'Visibilidad a Cliente: 5 min',
    'Hablar con perfiles para ejecución',
    'Hablar con perfiles para ppt y/o cotización',
    'Entrega de propuestas y/o cotizaciones',
    'Reuniones del día',
    'Otros',
  ];

  listOPS: any[] = ['Daniela Quintana', 'Estefany Bermudez', 'Luisa Clavijo'];

  allCampaigns: any[] = [];
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

  getNameCampaignByNameOp(nameOp: string) {
    return this.allCampaigns
      .filter((item) => item.name_op === nameOp)
      .map((Item) => Item.name);
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
}
