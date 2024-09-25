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
import { response } from 'express';

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

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor(
    private fb: FormBuilder,
    private campaignService: CampaignService
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
    { name: 'Alejandra Correa' },
    { name: 'Daniela Quintana' },
  ];

  operationsFilter = [
    { name: 'Estefany Bermudez', value: 'Estefany Bermudez' },
    { name: 'Luisa Clavijo', value: 'Luisa Clavijo' },
    { name: 'Alejandra Correa', value: 'Alejandra Correa' },
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
    }, 500);

    this.campaignForm = this.fb.group({
      name: [''],
      initial_date: [''],
      final_date: [''],
      task_completed: [0],
      number_contents: [0],
      number_creators: [0],
      name_op: [''],
      client: [''],
      brand: [''],

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

  verificarCampaignArchive: boolean = false;
  verificarCampaign: boolean = true;

  weeklyWorkload: any = {};

  openCampaignArchived() {
    this.verificarCampaignArchive = true;
    this.verificarCampaign = false;
  }

  barChartDataWeekly?: ChartData<'bar'>;
  barChartDataSecondWeekly?: ChartData<'bar'>;
  barChartDataProfileWeekly?: ChartData<'bar'>;

  showCargas() {
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

  allClients: any[] = [];
  allBrands: any[] = [
    'Estefany Bermudez',
    'Alejandra Correa',
    'Luisa Clavijo',
    'Daniela Quintana',
  ];
  BrandSelected: string = '';

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

    this.campaignService.getAllCampaigns().subscribe(
      (response) => {
        // Extraer solo el atributo 'client' de cada campaña y eliminar duplicados
        this.allClients = [
          ...new Set(response.map((campaign: any) => campaign.client)),
        ];
        this.allBrands = [
          ...new Set(response.map((campaign: any) => campaign.brand)),
        ];
        console.log('Todos las marcas: ' + this.allBrands);
        console.log('Todos los clientes: ' + this.allClients);
      },
      (error) => {
        console.error('Error updating tasks', error);
      }
    );
    // this.campaignService.getAllCampaigns().subscribe(
    //   (response) => {
    //     // Extraer solo el atributo 'client' de cada campaña, eliminar duplicados y asignarlo al array allBrands
    //     this.allBrands = [
    //       ...new Set(response.map((campaign: any) => campaign.client)),
    //     ];
    //   },
    //   (error) => {
    //     console.error('Error updating tasks', error);
    //   }
    // );

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

      if (campaign.name_op == 'Alejandra Correa') {
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

      if (campaign.name_op == 'Alejandra Correa') {
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
      labels: ['Alejandra', 'Estefany', 'Luisa'],
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
      labels: [['Alejandra'], ['Estefany'], 'Luisa'],
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
      labels: ['Alejandra', 'Estefany', 'Luisa'],
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

  chatbotList: any[] = [];

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

  updateClient: string = '';
  updateBrand: string = '';

  showDialogUpdate(event: Event, campaign: any) {
    event.stopPropagation(); // Evita que el evento se propague al botón principal
    this.updateIdCampaign = campaign.id;
    this.updateCampaignType = { name: '', value: '' };
    this.visibleUpdateDialog = true;
    this.updateNameCampaign = campaign.name;
    this.updateClient = campaign.client;
    this.updateBrand = campaign.brand;
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
      client: this.updateClient,
      brand: this.updateBrand,
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
      labels: ['Alejandra', 'Estefany', 'Luisa'],
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
      labels: ['Alejandra', 'Estefany', 'Luisa'],
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
      labels: ['Alejandra', 'Estefany', 'Luisa'],
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
}
