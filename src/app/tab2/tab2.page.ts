import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';


interface DataPoint {
  x: Date;
  y: number;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas!: ElementRef;
  lineChart: any;
  constructor() { }

  ngAfterViewInit() {
    ///this.drawChart();
    this.lineChartMethod()
  }

  drawChart(): void {
    const data: DataPoint[][] = [
      [
        { x: new Date('2020-01-01'), y: 0 },
        { x: new Date('2020-02-01'), y: 30 },
        // More data points...
      ],
      [
        { x: new Date('2020-01-01'), y: 10 },
        { x: new Date('2020-02-01'), y: 40 },
        // More data points...
      ],
      [
        { x: new Date('2020-01-01'), y: 30 },
        { x: new Date('2020-02-01'), y: 50 },
        // More data points...
      ]
    ];

    //const ctx = this.chartCanvas.nativeElement.getContext('2d');

    // new Chart(ctx, {
    //   type: 'line',
    //   data: {
    //     datasets: data.map((lineData, i) => ({
    //       label: `Line ${i + 1}`,
    //       data: lineData,
    //       borderColor: ['#f5842e', 'blue', 'green'][i],
    //       backgroundColor: 'transparent',
    //       borderWidth: 3
    //     }))
    //   },
    //   options: {
    //     scales: {
    //       x: [{
    //         type: 'time', // Change the type to 'time'
    //         time: {
    //           unit: 'day'
    //         }
    //       }],
    //       y: [{
    //         ticks: {
    //           beginAtZero: true
    //         }
    //       }]
    //     },
    //     animation: {
    //       duration: 2000,
    //       easing: 'easeOutCubic'
    //     }
    //   }
    // });
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: 'Sell per week',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40, 10, 5, 50, 10, 15],
            spanGaps: false,
          }
        ]
      },
      options: {
                      animation: {
          duration: 2000,
          easing: 'easeOutCubic'
        }
      }

    });
  }

  refreshGraph(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    ctx.clearRect(0, 0, this.chartCanvas.nativeElement.width, this.chartCanvas.nativeElement.height);
    this.drawChart();
  }
}
