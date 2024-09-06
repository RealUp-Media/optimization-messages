import { Component, Injectable, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AccordionModule } from 'primeng/accordion';
import {
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartType,
  ChartOptions,
} from 'chart.js';
import { Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { CampaignService } from '../../services/campaign.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { CampaignPreparation } from '../../campaign-preparation.model';
import { InplaceModule } from 'primeng/inplace';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ChecklistService } from '../../services/checklist.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { TreeModule } from 'primeng/tree';
import { TreeDragDropService, TreeNode } from 'primeng/api';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

interface TypeCampaign {
  name: string;
  value: string;
}

interface NameOperation {
  name: string;
}

interface NameOperationFilter {
  name: string;
  value: string;
}

interface Pais {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-campaign',
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
  ],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.css',
  providers: [TreeDragDropService],
})
export class CampaignComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private campaignService: CampaignService,
    private checkListService: ChecklistService,
    private http: HttpClient
  ) {
    Chart.register(ChartDataLabels);

    Chart.defaults.set('plugins.datalabels', {
      anchor: 'center',
      align: 'center',
      formatter: (value: any) => {
        if (value >= 1000000) {
          return (value / 1000000).toFixed(1) + 'M'; // Convierte valores mayores a 1,000,000 en "x.xM"
        } else if (value >= 1000) {
          return (value / 1000).toFixed(1) + 'k'; // Convierte valores mayores a 1000 en "x.xk"
        }
        return value; // Muestra los valores menores a 1000 sin cambios
      },
    });
  }

  public pieChartType: ChartType = 'pie';

  // Diagrama de barras

  public barChartType = 'bar' as const;

  // Nueva campaign

  visible: boolean = false;

  visibleDailyCaro: boolean = false;

  showDialog() {
    this.visible = true;
  }

  // Datos nueva campaña

  campaigns = [
    { name: 'Crowdposting', value: '0' },
    { name: 'UGC', value: '1' },
    { name: 'Brand Ambassadors', value: '2' },
  ];
  selectedTypeCampaign: TypeCampaign | undefined;
  operations = [
    { name: 'Estefany Bermudez' },
    { name: 'Luisa Clavijo' },
    { name: 'Daniela Quintana' },
  ];

  operationsFilter = [
    { name: 'Estefany Bermudez', value: 'Estefany Bermudez' },
    { name: 'Luisa Clavijo', value: 'Luisa Clavijo' },
    { name: 'Daniela Quintana', value: 'Daniela Quintana' },
    { name: 'Todas', value: '' },
  ];
  selectedOperation: NameOperation | undefined;
  barChartData?: ChartData<'bar'>;
  pieChartData?: ChartData<'pie', number[], string | string[]>;
  barChartDataSecond?: ChartData<'bar'>;

  treeNodes?: any[];
  ngOnInit() {
    setTimeout(() => {
      this.loadCampaigns();
      this.loadDaily();
      this.loadDailyTtile();
    }, 500);

    // GRAFICOS

    // GRAFICOS

    this.campaignForm = this.fb.group({
      name: [''],
      initial_date: [''],
      final_date: [''],
      task_completed: [0],
      number_contents: [0],
      number_creators: [0],
      name_op: [''],
      budget: [0],
      campaign_type: [''],
      country: [''],
      pr: [false],
      image_url: [''],
    });

    this.paises = [
      { name: 'Argentina' },
      { name: 'Bolivia' },
      { name: 'Brasil' },
      { name: 'Canada' },
      { name: 'Chile' },
      { name: 'Colombia' },
      { name: 'Costa Rica' },
      { name: 'Cuba' },
      { name: 'Estados Unidos' },
      { name: 'Ecuador' },
      { name: 'El Salvador' },
      { name: 'Guatemala' },
      { name: 'Honduras' },
      { name: 'Mexico' },
      { name: 'Panama' },
      { name: 'Paraguay' },
      { name: 'Peru' },
      { name: 'Puerto Rico' },
      { name: 'Republica Dominicana' },
      { name: 'Uruguay' },
      { name: 'Venezuela' },
    ];
  }

  // Paises

  paises: Pais[] | undefined;

  selectedPais: Pais | undefined;

  // Boolean PR
  stateOptions: any[] = [
    { label: 'Si', value: true },
    { label: 'No', value: false },
  ];

  value: string = 'off';

  // Crear nueva campaign button

  // Fecha final camapaign

  date: Date | undefined;
  initialDate: Date | undefined;

  // Daily OPS

  verificarDaily: boolean = false;
  verificarDailySales: boolean = false;
  verificarCampaign: boolean = true;
  verificaCargas: boolean = false;
  verificarChatbot: boolean = false;
  verificarCampaignArchive: boolean = false;

  weeklyWorkload: any = {};

  dailySales() {
    this.verificarCampaign = false;
    this.verificarDaily = false;
    this.verificaCargas = false;
    this.verificarDailySales = true;
    this.verificarChatbot = false;
    this.verificarCampaignArchive = false;
  }
  dailyOPS() {
    this.verificarCampaign = false;
    this.verificarDaily = true;
    this.verificaCargas = false;
    this.verificarDailySales = false;
    this.verificarChatbot = false;
    this.verificarCampaignArchive = false;
  }

  showCampaign() {
    this.verificarCampaign = true;
    this.verificarDaily = false;
    this.verificaCargas = false;
    this.verificarDailySales = false;
    this.verificarChatbot = false;
    this.verificarCampaignArchive = false;
  }

  showChatbot() {
    this.verificarCampaign = false;
    this.verificarDaily = false;
    this.verificaCargas = false;
    this.verificarDailySales = false;
    this.verificarChatbot = true;
    this.verificarCampaignArchive = false;
  }

  openCampaignArchived() {
    this.verificarCampaign = false;
    this.verificarDaily = false;
    this.verificaCargas = false;
    this.verificarDailySales = false;
    this.verificarChatbot = false;
    this.verificarCampaignArchive = true;
  }

  barChartDataWeekly?: ChartData<'bar'>;
  barChartDataSecondWeekly?: ChartData<'bar'>;
  barChartDataProfileWeekly?: ChartData<'bar'>;

  showCargas() {
    this.verificarCampaign = false;
    this.verificarDaily = false;
    this.verificaCargas = true;
    this.verificarDailySales = false;
    this.verificarChatbot = false;

    this.campaignService.getWeeklyWorkload().subscribe(
      (response) => {
        this.weeklyWorkload = response;
        console.log('Successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    setTimeout(() => {
      this.chargeDataWeekly();
    }, 200);

    console.log(this.weeklyWorkload);
  }
  dan_checked_one: boolean = false;
  dan_checked_two: boolean = false;
  dan_checked_three: boolean = false;
  dan_checked_four: boolean = false;
  dan_checked_five: boolean = false;
  dan_checked_six: boolean = false;
  dan_checked_seven: boolean = false;
  dan_checked_eight: boolean = false;

  est_checked_one: boolean = false;
  est_checked_two: boolean = false;
  est_checked_three: boolean = false;
  est_checked_four: boolean = false;
  est_checked_five: boolean = false;
  est_checked_six: boolean = false;
  est_checked_seven: boolean = false;
  est_checked_eight: boolean = false;

  lui_checked_one: boolean = false;
  lui_checked_two: boolean = false;
  lui_checked_three: boolean = false;
  lui_checked_four: boolean = false;
  lui_checked_five: boolean = false;
  lui_checked_six: boolean = false;
  lui_checked_seven: boolean = false;
  lui_checked_eight: boolean = false;

  // Daily OPS

  // Daniela

  displayDialogDaniela: boolean = false;
  newItemHeaderDaniela: string = '';
  newItemContentDaniela: string = '';

  showDialogDaniela() {
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

  // Carolina

  displayDialogCarolina: boolean = false;
  newItemHeaderCarolina: string = '';
  newItemContentCarolina: string = '';

  showDialogCarolina() {
    this.displayDialogCarolina = true;
  }

  displayDialogChatbot: boolean = false;
  newItemHeaderChatbot: string = '';
  newItemContentChatbot: string = '';

  showDialogChatbot() {
    this.displayDialogChatbot = true;
  }

  // Add Campaign

  campaignForm!: FormGroup;

  addCampaign() {
    if (this.campaignForm.valid) {
      this.campaignForm.patchValue({
        campaign_type: this.selectedTypeCampaign?.value,
      });

      this.campaignForm.patchValue({
        country: this.selectedPais?.name,
      });

      this.campaignForm.patchValue({
        name_op: this.selectedOperation?.name,
      });

      this.campaignService
        .addCampaign(this.campaignForm.value)
        .subscribe((response) => {
          console.log('Campaign saved successfully', response);
        });
    }
    this.visible = false;
    setTimeout(() => {
      this.loadCampaigns();
      this.chargeData();
    }, 200);
  }
  campaignsPropuesta: any[] = [];
  campaignsArchivados: any[] = [];
  campaignsPreparation: any[] = [];
  campaignsExecution: any[] = [];
  campaignsClosed: any[] = [];

  loadCampaigns(): void {
    this.campaignService.getCampaignPreparation().subscribe(
      (response) => {
        this.campaignsPreparation = response;
        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getCampaignExecution().subscribe(
      (response) => {
        this.campaignsExecution = response;
        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getCampaignClosed().subscribe(
      (response) => {
        this.campaignsClosed = response;
        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getCampaignsProposal().subscribe(
      (response) => {
        this.campaignsPropuesta = response;
        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getCampaignsArchived().subscribe(
      (response) => {
        this.campaignsArchivados = response;
        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    setTimeout(() => {
      this.chargeData();
    }, 200);

    this.chart?.update();

    console.log(this.campaignExecutionDaniela);

    console.log(this.campaignPRLuisa);
  }

  // Click ver checklist

  verChecklist(idCampaign: number) {
    const url = `checklist/${idCampaign}`;
    window.open(url, '_blank');
  }

  // Estadisticas

  campaignActiveDaniela: number = 0;
  campaignActiveEstefany: number = 0;
  campaignActiveLuisa: number = 0;

  campaignExecutionDaniela: number = 0;
  campaignExecutionEstefany: number = 0;
  campaignExecutionLuisa: number = 0;

  campaignPRDaniela: number = 0;
  campaignPREstefany: number = 0;
  campaignPRLuisa: number = 0;

  campaignNoPRDaniela: number = 0;
  campaignNoPREstefany: number = 0;
  campaignNoPRLuisa: number = 0;

  campaignBudgetDaniela: number = 0;
  campaignBudgetEstefany: number = 0;
  campaignBudgetLuisa: number = 0;

  cargaDaniela: number = 0;
  cargaEstefany: number = 0;
  cargaLuisa: number = 0;

  porcentajeDaniela: number = 0;
  porcentajeEstefany: number = 0;
  porcentajeLuisa: number = 0;

  chargeData() {
    this.campaignActiveDaniela = 0;
    this.campaignActiveEstefany = 0;
    this.campaignActiveLuisa = 0;
    this.campaignExecutionDaniela = 0;
    this.campaignExecutionEstefany = 0;
    this.campaignExecutionLuisa = 0;
    this.campaignPRDaniela = 0;
    this.campaignPREstefany = 0;
    this.campaignPRLuisa = 0;
    this.campaignNoPRDaniela = 0;
    this.campaignNoPREstefany = 0;
    this.campaignNoPRLuisa = 0;
    this.campaignBudgetDaniela = 0;
    this.campaignBudgetEstefany = 0;
    this.campaignBudgetLuisa = 0;
    this.cargaDaniela = 0;
    this.cargaEstefany = 0;
    this.cargaLuisa = 0;
    this.porcentajeDaniela = 0;
    this.porcentajeEstefany = 0;
    this.porcentajeLuisa = 0;
    for (let campaign of this.campaignsPreparation) {
      if (campaign.name_op == 'Luisa Clavijo') {
        this.campaignActiveLuisa += 1;
        if (campaign.pr === true) {
          this.campaignPRLuisa += campaign.number_contents;
        }
        if (campaign.pr === false) {
          this.campaignNoPRLuisa += campaign.number_contents;
        }
        this.campaignBudgetLuisa += campaign.budget;
      }

      if (campaign.name_op == 'Daniela Quintana') {
        this.campaignActiveDaniela += 1;
        if (campaign.pr === true) {
          this.campaignPRDaniela += campaign.number_contents;
        }
        if (campaign.pr === false) {
          this.campaignNoPRDaniela += campaign.number_contents;
        }
        this.campaignBudgetDaniela += campaign.budget;
      }

      if (campaign.name_op == 'Estefany Bermudez') {
        this.campaignActiveEstefany += 1;
        if (campaign.pr === true) {
          this.campaignPREstefany += campaign.number_contents;
        }
        if (campaign.pr === false) {
          this.campaignNoPREstefany += campaign.number_contents;
        }
        this.campaignBudgetEstefany += campaign.budget;
      }
    }

    for (let campaign of this.campaignsExecution) {
      if (campaign.name_op == 'Luisa Clavijo') {
        this.campaignExecutionLuisa += 1;
        if (campaign.pr === true) {
          this.campaignPRLuisa += campaign.number_contents;
        }
        if (campaign.pr === false) {
          this.campaignNoPRLuisa += campaign.number_contents;
        }
        this.campaignBudgetLuisa += campaign.budget;
      }

      if (campaign.name_op == 'Daniela Quintana') {
        this.campaignExecutionDaniela += 1;
        if (campaign.pr === true) {
          this.campaignPRDaniela += campaign.number_contents;
        }
        if (campaign.pr === false) {
          this.campaignNoPRDaniela += campaign.number_contents;
        }
        this.campaignBudgetDaniela += campaign.budget;
      }

      if (campaign.name_op == 'Estefany Bermudez') {
        this.campaignExecutionEstefany += 1;
        if (campaign.pr === true) {
          this.campaignPREstefany += campaign.number_contents;
        }
        if (campaign.pr === false) {
          this.campaignNoPREstefany += campaign.number_contents;
        }
        this.campaignBudgetEstefany += campaign.budget;
      }
    }

    // Cargas

    this.cargaDaniela =
      this.campaignActiveDaniela * 0.7 +
      this.campaignExecutionDaniela * 0.3 +
      (this.campaignPRDaniela * 0.3 + this.campaignNoPRDaniela * 0.7) / 2;
    this.cargaEstefany =
      this.campaignActiveEstefany * 0.7 +
      this.campaignExecutionEstefany * 0.3 +
      (this.campaignPREstefany * 0.3 + this.campaignNoPREstefany * 0.7) / 2;
    this.cargaLuisa =
      this.campaignActiveLuisa * 0.7 +
      this.campaignExecutionLuisa * 0.3 +
      (this.campaignPRLuisa * 0.3 + this.campaignNoPRLuisa * 0.7) / 2;

    if (
      this.cargaDaniela > this.cargaEstefany &&
      this.cargaDaniela > this.cargaLuisa
    ) {
      this.porcentajeDaniela = 80;
      this.porcentajeEstefany = (this.cargaEstefany * 80) / this.cargaDaniela;
      this.porcentajeLuisa = (this.cargaLuisa * 80) / this.cargaDaniela;
    }
    // Gano Estefany
    if (
      this.cargaEstefany > this.cargaDaniela &&
      this.cargaEstefany > this.cargaLuisa
    ) {
      this.porcentajeEstefany = 80;
      this.porcentajeDaniela = (this.cargaDaniela * 80) / this.cargaEstefany;
      this.porcentajeLuisa = (this.cargaLuisa * 80) / this.cargaEstefany;
    }
    // Gano Luisa
    if (
      this.cargaLuisa > this.cargaEstefany &&
      this.cargaLuisa > this.cargaDaniela
    ) {
      this.porcentajeLuisa = 80;
      this.porcentajeEstefany = (this.cargaEstefany * 80) / this.cargaLuisa;
      this.porcentajeDaniela = (this.cargaDaniela * 80) / this.cargaLuisa;
    }

    console.log(
      this.cargaDaniela,
      this.cargaEstefany,
      this.cargaEstefany,
      this.campaignExecutionDaniela,
      this.campaignExecutionEstefany,
      this.campaignExecutionLuisa,
      this.campaignActiveDaniela,
      this.campaignActiveEstefany,
      this.campaignActiveLuisa
    );

    this.barChartData = {
      labels: ['Daniela', 'Estefany', 'Luisa'],
      datasets: [
        {
          data: [
            this.campaignExecutionDaniela,
            this.campaignExecutionEstefany,
            this.campaignExecutionLuisa,
          ],
          label: 'Ejecucion',
        },
        {
          data: [
            this.campaignActiveDaniela,
            this.campaignActiveEstefany,
            this.campaignActiveLuisa,
          ],
          label: 'Preparación',
        },
      ],
    };

    this.pieChartData = {
      labels: [['Daniela'], ['Estefany'], 'Luisa'],
      datasets: [
        {
          data: [
            this.campaignBudgetDaniela,
            this.campaignBudgetEstefany,
            this.campaignBudgetLuisa,
          ],
        },
      ],
    };

    this.barChartDataSecond = {
      labels: ['Daniela', 'Estefany', 'Luisa'],
      datasets: [
        {
          data: [
            this.campaignPRDaniela,
            this.campaignPREstefany,
            this.campaignPRLuisa,
          ],
          label: 'Con PR',
        },
        {
          data: [
            this.campaignNoPRDaniela,
            this.campaignNoPREstefany,
            this.campaignNoPRLuisa,
          ],
          label: 'Sin PR',
        },
      ],
    };
  }

  // Daily OPS

  dailyDaniela: string = 'Hola que hace';

  dailyDanielaList: any[] = [];
  dailyEstefanyList: any[] = [];
  dailyLuisaList: any[] = [];
  dailyCarolinaList: any[] = [];
  chatbotList: any[] = [];

  loadDaily() {
    const nameDaniela = {
      op: 'Daniela Quintana',
    };
    const nameEstefany = {
      op: 'Estefany Bermudez',
    };
    const nameLuisa = {
      op: 'Luisa Clavijo',
    };

    const nameCarolina = {
      op: 'Carolina Correa',
    };

    const nameChatbot = {
      op: 'Chatbot',
    };
    this.campaignService.getOpDaily(nameDaniela).subscribe(
      (response) => {
        this.dailyDanielaList = response;
        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDaily(nameEstefany).subscribe(
      (response) => {
        this.dailyEstefanyList = response;
        this.dailyEstefanyList.sort((a, b) => a.order_task - b.order_task);

        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDaily(nameLuisa).subscribe(
      (response) => {
        this.dailyLuisaList = response;

        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDaily(nameCarolina).subscribe(
      (response) => {
        this.dailyCarolinaList = response;
        this.dailyCarolinaList.sort((a, b) => a.order_task - b.order_task);

        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDaily(nameChatbot).subscribe(
      (response) => {
        this.chatbotList = response;
        this.chatbotList.sort((a, b) => a.order_task - b.order_task);

        console.log('Tasks updated successfully', response);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );
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

  loadDailyTtile() {
    const nameDanielaFirst = {
      op: 'Daniela Quintana',
      titleTask: 'Visibilidad a Cliente: 5 min',
    };

    const nameDanielaSecond = {
      op: 'Daniela Quintana',
      titleTask: 'Hablar con perfiles para ejecución',
    };

    const nameDanielaThird = {
      op: 'Daniela Quintana',
      titleTask: 'Hablar con perfiles para ppt y/o cotización',
    };

    const nameDanielaFourth = {
      op: 'Daniela Quintana',
      titleTask: 'Entrega de propuestas y/o cotizaciones',
    };

    const nameDanielaFifth = {
      op: 'Daniela Quintana',
      titleTask: 'Reuniones del día',
    };

    const nameDanielaSixth = {
      op: 'Daniela Quintana',
      titleTask: '',
    };

    const nameEstefanyFirst = {
      op: 'Estefany Bermudez',
      titleTask: 'Visibilidad a Cliente: 5 min',
    };

    const nameEstefanySecond = {
      op: 'Estefany Bermudez',
      titleTask: 'Hablar con perfiles para ejecución',
    };

    const nameEstefanyThird = {
      op: 'Estefany Bermudez',
      titleTask: 'Hablar con perfiles para ppt y/o cotización',
    };

    const nameEstefanyFourth = {
      op: 'Estefany Bermudez',
      titleTask: 'Entrega de propuestas y/o cotizaciones',
    };

    const nameEstefanyFifth = {
      op: 'Estefany Bermudez',
      titleTask: 'Reuniones del día',
    };

    const nameEstefanySixth = {
      op: 'Estefany Bermudez',
      titleTask: '',
    };

    const nameLuisaFirst = {
      op: 'Luisa Clavijo',
      titleTask: 'Visibilidad a Cliente: 5 min',
    };

    const nameLuisaSecond = {
      op: 'Luisa Clavijo',
      titleTask: 'Hablar con perfiles para ejecución',
    };

    const nameLuisaThird = {
      op: 'Luisa Clavijo',

      titleTask: 'Hablar con perfiles para ppt y/o cotización',
    };

    const nameLuisaFourth = {
      op: 'Luisa Clavijo',
      titleTask: 'Entrega de propuestas y/o cotizaciones',
    };

    const nameLuisaFifth = {
      op: 'Luisa Clavijo',
      titleTask: 'Reuniones del día',
    };

    const nameLuisaSixth = {
      op: 'Luisa Clavijo',
      titleTask: '',
    };

    this.campaignService.getOpDailyTitle(nameDanielaFirst).subscribe(
      (response) => {
        this.dailyDanielaListFirst = response;
        this.dailyDanielaListFirst.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDailyTitle(nameDanielaSecond).subscribe(
      (response) => {
        this.dailyDanielaListSecond = response;
        this.dailyDanielaListSecond.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDailyTitle(nameDanielaThird).subscribe(
      (response) => {
        this.dailyDanielaListThird = response;
        this.dailyDanielaListThird.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDailyTitle(nameDanielaFourth).subscribe(
      (response) => {
        this.dailyDanielaListFourth = response;
        this.dailyDanielaListFourth.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDailyTitle(nameDanielaFifth).subscribe(
      (response) => {
        this.dailyDanielaListFifth = response;
        this.dailyDanielaListFifth.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDailyTitle(nameDanielaSixth).subscribe(
      (response) => {
        this.dailyDanielaListSixth = response;
        this.dailyDanielaListSixth.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    // Estefany

    this.campaignService.getOpDailyTitle(nameEstefanyFirst).subscribe(
      (response) => {
        this.dailyEstefanyListFirst = response;
        this.dailyEstefanyListFirst.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDailyTitle(nameEstefanySecond).subscribe(
      (response) => {
        this.dailyEstefanyListSecond = response;
        this.dailyEstefanyListSecond.sort(
          (a, b) => a.order_task - b.order_task
        );
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDailyTitle(nameEstefanyThird).subscribe(
      (response) => {
        this.dailyEstefanyListThird = response;
        this.dailyEstefanyListThird.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDailyTitle(nameEstefanyFourth).subscribe(
      (response) => {
        this.dailyEstefanyListFourth = response;
        this.dailyEstefanyListFourth.sort(
          (a, b) => a.order_task - b.order_task
        );
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDailyTitle(nameEstefanyFifth).subscribe(
      (response) => {
        this.dailyEstefanyListFifth = response;
        this.dailyEstefanyListFifth.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDailyTitle(nameEstefanySixth).subscribe(
      (response) => {
        this.dailyEstefanyListSixth = response;
        this.dailyEstefanyListSixth.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );
    // Luisa

    this.campaignService.getOpDailyTitle(nameLuisaFirst).subscribe(
      (response) => {
        this.dailyLuisaListFirst = response;
        this.dailyLuisaListFirst.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDailyTitle(nameLuisaSecond).subscribe(
      (response) => {
        this.dailyLuisaListSecond = response;
        this.dailyLuisaListSecond.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDailyTitle(nameLuisaThird).subscribe(
      (response) => {
        this.dailyLuisaListThird = response;
        this.dailyLuisaListThird.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDailyTitle(nameLuisaFourth).subscribe(
      (response) => {
        this.dailyLuisaListFourth = response;
        this.dailyLuisaListFourth.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDailyTitle(nameLuisaFifth).subscribe(
      (response) => {
        this.dailyLuisaListFifth = response;
        this.dailyLuisaListFifth.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );

    this.campaignService.getOpDailyTitle(nameLuisaSixth).subscribe(
      (response) => {
        this.dailyLuisaListSixth = response;
        this.dailyLuisaListSixth.sort((a, b) => a.order_task - b.order_task);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );
  }

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
      this.loadDaily();
    }, 200);
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

    this.displayDialogDaniela = false;
    this.displayDialogEstefany = false;
    this.displayDialogLuisa = false;
    this.displayDialogCarolina = false;
    this.displayDialogChatbot = false;

    this.newItemHeaderEstefany = '';
    this.newItemContentEstefany = '';
    this.newItemHeaderDaniela = '';
    this.newItemContentDaniela = '';
    this.newItemHeaderLuisa = '';
    this.newItemContentLuisa = '';

    setTimeout(() => {
      this.loadDaily();
      this.loadDailyTtile();
    }, 200);
  }

  // Update Campaign

  visibleUpdateDialog: boolean = false;
  updateIdCampaign: number = 0;
  updateNameCampaign: string = '';
  updateNameOp?: NameOperation;
  updateCampaignType?: TypeCampaign;
  updateCountry?: Pais;
  updateBudget: number = 0;
  updateNumberCreators: number = 0;
  updateNumberContents: number = 0;
  updatePr?: any[];
  updateFinalDate: String = '';
  updateUrlCampaign: string = '';

  showDialogUpdate(event: Event, campaign: any) {
    event.stopPropagation(); // Evita que el evento se propague al botón principal
    this.updateIdCampaign = campaign.id;
    this.updateCampaignType = { name: '', value: '' };
    this.visibleUpdateDialog = true;
    this.updateNameCampaign = campaign.name;
    this.updateNameOp = this.operations.find(
      (op) => op.name === campaign.name_op
    );
    if (campaign.campaign_type === 'CROWDPOSTING') {
      this.updateCampaignType = this.campaigns.find(
        (campaignSelected) => campaignSelected.name === 'Crowdposting'
      );
    }
    if (campaign.campaign_type === 'UGC') {
      this.updateCampaignType = this.campaigns.find(
        (campaignSelected) => campaignSelected.name === 'UGC'
      );
    }
    if (campaign.campaign_type === 'BRAND_AMBASSADOR') {
      this.updateCampaignType = this.campaigns.find(
        (campaignSelected) => campaignSelected.name === 'Brand Ambassador'
      );
    }
    this.updateCountry = this.paises?.find(
      (pais) => pais.name === campaign.country
    );
    this.updateBudget = campaign.budget;
    this.updateNumberCreators = campaign.number_creators;
    this.updateNumberContents = campaign.number_contents;
    this.updatePr = campaign.pr;
    this.updateFinalDate = campaign.final_date;
    this.updateUrlCampaign = campaign.image_url;
  }

  archivedCampaign() {
    this.campaignService
      .updateCampaignTitle(this.updateIdCampaign, 3)
      .subscribe(
        (response) => {
          console.log('Campaign updated successfully', response);
        },
        (error) => {
          console.error('Error updating campaign', error);
        }
      );

    this.visibleUpdateDialog = false;

    setTimeout(() => {
      this.loadCampaigns();
      this.chargeData();
    }, 200);
  }

  unarchivedCampaign() {
    this.campaignService
      .updateCampaignTitle(this.updateIdCampaign, 4)
      .subscribe(
        (response) => {
          console.log('Campaign updated successfully', response);
        },
        (error) => {
          console.error('Error updating campaign', error);
        }
      );

    setTimeout(() => {
      this.loadCampaigns();
      this.chargeData();
    }, 200);
  }

  deleteCampaign() {
    this.campaignService
      .updateCampaignTitle(this.updateIdCampaign, 5)
      .subscribe(
        (response) => {
          console.log('Campaign updated successfully', response);
        },
        (error) => {
          console.error('Error updating campaign', error);
        }
      );

    setTimeout(() => {
      this.loadCampaigns();
      this.chargeData();
    }, 200);
  }

  updateCampaign() {
    const dataCampaign = {
      id: this.updateIdCampaign,
      name: this.updateNameCampaign,
      name_op: this.updateNameOp?.name,
      number_contents: this.updateNumberContents,
      number_creators: this.updateNumberCreators,
      budget: this.updateBudget,
      campaign_type: this.updateCampaignType?.value,
      country: this.updateCountry?.name,
      pr: this.updatePr,
      final_date: this.updateFinalDate,
      image_url: this.updateUrlCampaign,
    };
    console.log(dataCampaign);

    this.campaignService.updateCampaign(dataCampaign).subscribe(
      (response) => {
        console.log('Campaign updated successfully', response);
      },
      (error) => {
        console.error('Error updating campaign', error);
      }
    );

    this.visibleUpdateDialog = false;

    setTimeout(() => {
      this.loadCampaigns();
      this.chargeData();
    }, 200);
  }

  updateWeeklyLoad() {
    const data = {
      contents_no_pr_daniela: this.weeklyWorkload.contents_no_pr_daniela,
      contents_pr_daniela: this.weeklyWorkload.contents_pr_daniela,
      campaign_preparation_daniela:
        this.weeklyWorkload.campaign_preparation_daniela,
      campaign_active_daniela: this.weeklyWorkload.campaign_active_daniela,
      profiles_no_pr_daniela: this.weeklyWorkload.profiles_no_pr_daniela,
      profiles_pr_daniela: this.weeklyWorkload.profiles_pr_daniela,
      contents_no_pr_estefany: this.weeklyWorkload.contents_no_pr_estefany,
      contents_pr_estefany: this.weeklyWorkload.contents_pr_estefany,
      campaign_preparation_estefany:
        this.weeklyWorkload.campaign_preparation_estefany,
      campaign_active_estefany: this.weeklyWorkload.campaign_active_estefany,
      profiles_no_pr_estefany: this.weeklyWorkload.profiles_no_pr_estefany,
      profiles_pr_estefany: this.weeklyWorkload.profiles_pr_estefany,
      contents_no_pr_luisa: this.weeklyWorkload.contents_no_pr_luisa,
      contents_pr_luisa: this.weeklyWorkload.contents_pr_luisa,
      campaign_preparation_luisa:
        this.weeklyWorkload.campaign_preparation_luisa,
      campaign_active_luisa: this.weeklyWorkload.campaign_active_luisa,
      profiles_no_pr_luisa: this.weeklyWorkload.profiles_no_pr_luisa,
      profiles_pr_luisa: this.weeklyWorkload.profiles_pr_luisa,
    };
    this.campaignService.updateWeeklyLoad(data).subscribe(
      (response) => {
        console.log('Weekly updated successfully', response);
      },
      (error) => {
        console.error('Error updating Weekly', error);
      }
    );
    setTimeout(() => {
      this.chargeDataWeekly();
    }, 200);
  }

  chargeDataWeekly() {
    this.barChartDataWeekly = {
      labels: ['Daniela', 'Estefany', 'Luisa'],
      datasets: [
        {
          data: [
            this.weeklyWorkload.campaign_preparation_daniela,
            this.weeklyWorkload.campaign_preparation_estefany,
            this.weeklyWorkload.campaign_preparation_luisa,
          ],
          label: 'Preparación',
        },
      ],
    };

    this.barChartDataSecondWeekly = {
      labels: ['Daniela', 'Estefany', 'Luisa'],
      datasets: [
        {
          data: [
            this.weeklyWorkload.contents_pr_daniela,
            this.weeklyWorkload.contents_pr_estefany,
            this.weeklyWorkload.contents_pr_luisa,
          ],
          label: 'Con PR',
        },
        {
          data: [
            this.weeklyWorkload.contents_no_pr_daniela,
            this.weeklyWorkload.contents_no_pr_estefany,
            this.weeklyWorkload.contents_no_pr_luisa,
          ],
          label: 'Sin PR',
        },
      ],
    };

    this.barChartDataProfileWeekly = {
      labels: ['Daniela', 'Estefany', 'Luisa'],
      datasets: [
        {
          data: [
            this.weeklyWorkload.profiles_no_pr_daniela,
            this.weeklyWorkload.profiles_no_pr_estefany,
            this.weeklyWorkload.profiles_no_pr_luisa,
          ],
          label: 'Con PR',
        },
        {
          data: [
            this.weeklyWorkload.profiles_pr_daniela,
            this.weeklyWorkload.profiles_pr_estefany,
            this.weeklyWorkload.profiles_pr_luisa,
          ],
          label: 'Sin PR',
        },
      ],
    };
  }

  // Filtros para las campañas

  filtroNombre: string = '';
  filtroFecha: string = '';
  filtroAcciones: number | null = null;
  filtroCreadores: number | null = null;
  filtroOp?: NameOperationFilter;

  getFilteredCampaigns(campaigns: any[]): any[] {
    return campaigns.filter((campaign) => {
      const coincideNombre = this.filtroNombre
        ? campaign.name.toLowerCase().includes(this.filtroNombre.toLowerCase())
        : true;
      const coincideFecha = this.filtroFecha
        ? new Date(campaign.final_date) <= new Date(this.filtroFecha)
        : true;
      const coincideAcciones =
        this.filtroAcciones !== null
          ? campaign.number_contents >= this.filtroAcciones
          : true;

      const coincideCreadores =
        this.filtroCreadores !== null
          ? campaign.number_creators >= this.filtroCreadores
          : true;
      const coincideOp =
        this.filtroOp?.value && campaign.name_op
          ? campaign.name_op === this.filtroOp.value
          : true;
      return (
        coincideNombre &&
        coincideFecha &&
        coincideAcciones &&
        coincideOp &&
        coincideCreadores
      );
    });
  }

  // Daily actualizado

  files!: TreeNode[];

  selectedFiles!: TreeNode[];

  drop(
    event: CdkDragDrop<
      {
        id: number;
        task: string;
        comment: string;
        task_completed: boolean;
        op: string;
        titleTask: String;
        dateTask: string;
      }[]
    >,
    title: string
  ) {
    console.log(title);
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const newItem = {
        id: event.previousContainer.data[event.previousIndex].id,
        order_task: event.previousIndex,
        task: event.previousContainer.data[event.previousIndex].task,
        comment: event.previousContainer.data[event.previousIndex].comment,
        task_completed:
          event.previousContainer.data[event.previousIndex].task_completed,
        op: event.previousContainer.data[event.previousIndex].op,
        titleTask: event.previousContainer.data[event.currentIndex].titleTask,
        dateTask: event.previousContainer.data[event.previousIndex].dateTask,
      };

      const newItemSecond = {
        id: event.previousContainer.data[event.currentIndex].id,
        order_task: event.currentIndex,
        task: event.previousContainer.data[event.currentIndex].task,
        comment: event.previousContainer.data[event.currentIndex].comment,
        task_completed:
          event.previousContainer.data[event.currentIndex].task_completed,
        op: event.previousContainer.data[event.currentIndex].op,
        titleTask: event.previousContainer.data[event.previousIndex].titleTask,
        dateTask: event.previousContainer.data[event.currentIndex].dateTask,
      };

      // console.log(newItem);
      // console.log(newItemSecond);

      this.campaignService.updateDaily(newItem).subscribe(
        (response) => {
          console.log('Tasks updated successfully', response);
        },
        (error) => {
          console.error('Error updating tasks', error);
        }
      );

      this.campaignService.updateDaily(newItemSecond).subscribe(
        (response) => {
          console.log('Tasks updated successfully', response);
        },
        (error) => {
          console.error('Error updating tasks', error);
        }
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      const newItem = {
        id: event.container.data[event.currentIndex].id,
        order_task: event.currentIndex,
        task: event.container.data[event.currentIndex].task,
        comment: event.container.data[event.currentIndex].comment,
        task_completed: event.container.data[event.currentIndex].task_completed,
        op: event.container.data[event.currentIndex].op,
        titleTask: title,
      };

      this.campaignService.updateDaily(newItem).subscribe(
        (response) => {
          console.log('Tasks updated successfully', response);
        },
        (error) => {
          console.error('Error updating tasks', error);
        }
      );

      setTimeout(() => {
        for (let i = 0; i < event.container.data.length; i++) {
          console.log(event.container.data[i]);
          const updateItem = {
            id: event.container.data[i].id,
            order_task: i,
          };
          this.campaignService.updateDailyTitle(updateItem).subscribe(
            (response) => {
              console.log('Tasks updated successfully', response);
            },
            (error) => {
              console.error('Error updating tasks', error);
            }
          );
        }
      }, 1000);
    }
    console.log(event.container.data);
    console.log(event);
  }

  titleOPS: string = '';

  // Update Date

  datetime24h: Date[] | undefined;

  openCotizador() {
    window.open('home', '_self');
  }
}
