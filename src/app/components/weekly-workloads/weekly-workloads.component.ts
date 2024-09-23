import { Component, ViewChild } from '@angular/core';
import {
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartType,
  ChartOptions,
} from 'chart.js';
import { CampaignService } from '../../services/campaign.service';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart } from 'chart.js';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-weekly-workloads',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputNumberModule,
    ReactiveFormsModule,
    FormsModule,
    BaseChartDirective,
  ],
  templateUrl: './weekly-workloads.component.html',
  styleUrl: './weekly-workloads.component.css',
})
export class WeeklyWorkloadsComponent {
  ngOnInit(): void {
    this.showCargas();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.chart?.update();
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

  // Graficos
  public pieChartType: ChartType = 'pie';

  public barChartType = 'bar' as const;

  barChartDataWeekly?: ChartData<'bar'>;
  barChartDataSecondWeekly?: ChartData<'bar'>;
  barChartDataProfileWeekly?: ChartData<'bar'>;

  // Cargar datos

  weeklyWorkload: any = {};

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
}
