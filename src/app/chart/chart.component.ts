import {Component, OnInit} from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs.min';
import {ChartDataService} from './data/chart.data.service';
import {Observable} from 'rxjs';
import {ChartData} from './data/chart.data';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(private chartDataService: ChartDataService) {}

  ngOnInit() {
    const chartData: Observable<ChartData[]> = this.chartDataService.getChartData();

    chartData.subscribe(data => {
      const residenceData = [];
      const indexationData = [];

      for (const chartDataItem of data) {
        const residenceDatapoint = {x: new Date(chartDataItem.valueDate), y: chartDataItem.residenceValue};
        const indexationDatapoint = {x: new Date(chartDataItem.valueDate), y: chartDataItem.indexationValue};

        residenceData.push(residenceDatapoint);
        indexationData.push(indexationDatapoint);
      }

      const chart = new CanvasJS.Chart('chartContainer',
        {
          animationEnabled: true,
          zoomEnabled: true,
          fontSize: 20,
          title: {
            text: 'Verloop woningwaarde',
            fontSize: 40,
          },
          axisX: {
            valueFormatString: 'MMM YY',
            labelFontSize: 15,
          },
          axisY2: {
            title: 'Woningwaarde',
            prefix: 'EUR ',
            includeZero: false,
            titleFontSize: 25,
            labelFontSize: 15,
          },
          toolTip: {
            shared: true

          },
          legend: {
            cursor: 'pointer',
            fontSize: 20,
            verticalAlign: 'top',
            horizontalAlign: 'center',
            dockInsidePlotArea: true

          },
          data: [
            {
              type: 'line',
              axisYType: 'secondary',
              name: 'Woningwaarde',
              showInLegend: true,
              dataPoints: residenceData
            },
            {
              type: 'line',
              axisYType: 'secondary',
              name: 'Geïndexeerde taxatiewaarde',
              showInLegend: true,
              dataPoints: indexationData
            }
          ]
        });

      chart.render();
    });

  }
}
