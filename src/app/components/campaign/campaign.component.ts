import { Component, ViewChild } from '@angular/core';
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
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
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

interface TypeCampaign {
  name: string;
  value: string;
}

interface NameOperation {
  name: string;
}

interface Pais {
  name: string;
}

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
  ],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.css',
  providers: [],
})
export class CampaignComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private campaignService: CampaignService,
    private http: HttpClient
  ) {}
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        display: true,
        align: 'center',
        anchor: 'center',
        formatter: (value: any, context: any) => {
          return value;
        },
      },
    },
  };

  public pieChartSecondData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Daniela'], ['Estefany'], 'Luisa'],
    datasets: [
      {
        data: [5, 15, 31],
      },
    ],
  };

  public pieChartContentData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Realizados'], ['Restante']],
    datasets: [
      {
        data: [80, 20],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

  // Diagrama de barras

  public barChartType = 'bar' as const;

  // Nueva campaign

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  // Datos nueva campaña

  campaigns: TypeCampaign[] | undefined;
  selectedTypeCampaign: TypeCampaign | undefined;

  operations: NameOperation[] | undefined;
  selectedOperation: NameOperation | undefined;
  barChartData?: ChartData<'bar'>;
  pieChartData?: ChartData<'pie', number[], string | string[]>;
  barChartDataSecond?: ChartData<'bar'>;
  ngOnInit() {
    this.loadCampaigns();
    this.loadDaily();
    // GRAFICOS
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

    // GRAFICOS

    this.campaignForm = this.fb.group({
      name: [''],
      final_date: [''],
      task_completed: [0],
      number_contents: [0],
      number_creators: [0],
      name_op: [''],
      budget: [0],
      campaign_type: [''],
      country: [''],
      pr: [false],
    });

    this.campaigns = [
      { name: 'Crowdposting', value: '0' },
      { name: 'UGC', value: '1' },
      { name: 'Brand Ambassadors', value: '2' },
    ];

    this.operations = [
      { name: 'Estefany Bermudez' },
      { name: 'Luisa Clavijo' },
      { name: 'Daniela Quintana' },
    ];

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
    { label: 'Si', value: 'true' },
    { label: 'No', value: 'false' },
  ];

  value: string = 'off';

  // Crear nueva campaign button

  // Fecha final camapaign

  date: Date | undefined;

  // Daily OPS

  verificarDaily: boolean = false;
  verificarCampaign: boolean = true;

  dailyOPS() {
    this.verificarCampaign = false;
    this.verificarDaily = true;
  }

  showCampaign() {
    this.verificarCampaign = true;
    this.verificarDaily = false;
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
    window.location.reload();
  }

  campaignsPreparation: any[] = [];
  campaignsExecution: any[] = [];
  campaignsClosed: any[] = [];

  loadCampaigns(): void {
    this.campaignService.getCampaignPreparation().subscribe({
      next: (data: CampaignPreparation[]) => {
        this.campaignsPreparation = data;
        console.log('Campañas en preparación:', this.campaignsPreparation);
      },
      error: (err) => {
        console.error('Error al cargar las campañas:', err);
      },
    });

    this.campaignService.getCampaignExecution().subscribe({
      next: (data) => {
        this.campaignsExecution = data;
        console.log('Campañas en ejecucion:', this.campaignsExecution);
      },
      error: (err) => {
        console.error('Error al cargar las campañas:', err);
      },
    });

    this.campaignService.getCampaignClosed().subscribe({
      next: (data) => {
        this.campaignsClosed = data;
        console.log('Campañas cerradas:', this.campaignsClosed);
      },
      error: (err) => {
        console.error('Error al cargar las campañas:', err);
      },
    });

    this.chargeData();
    this.chart?.update();
    console.log(this.campaignExecutionDaniela);
    console.log(this.campaignPRLuisa);
  }

  // Click ver checklist

  verChecklist(idCampaign: number) {
    this.router.navigate([`checklist/${idCampaign}`]);
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
  }

  // Daily OPS

  dailyDaniela: string = 'Hola que hace';

  dailyDanielaList: any[] = [];
  dailyEstefanyList: any[] = [];
  dailyLuisaList: any[] = [];

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
      this.loadDaily();
    }, 200);
  }
}
