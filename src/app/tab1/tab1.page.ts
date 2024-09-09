import { AfterViewInit, Component } from '@angular/core';
import * as d3 from 'd3';
import { Browser } from '@capacitor/browser';
import { ContactsPlugin } from 'contacts-plugin';
// import { GGBluetoothIonic } from '@greatergoods/gg-bluetooth-ionic-plugin';
interface DataPoint {
  date: Date;
  value: number;
}


interface LineData {
  name: string;
  data: DataPoint[];
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    this.drawChart();
  }

  getContacts() {
    ContactsPlugin.getContacts({value: "testing"})
  }

  drawChart(): void {
    const data: LineData[] = [
      {
        name: 'Line 1',
        data: [
          { date: new Date('2020-01-01'), value: 0 },
          { date: new Date('2020-02-01'), value: 30 },
          { date: new Date('2020-02-03'), value: 90 },
          { date: new Date('2020-02-04'), value: 10 },
          { date: new Date('2020-02-05'), value: 20 },
          { date: new Date('2020-02-06'), value: 10 },
          { date: new Date('2020-02-07'), value: 15 },
          { date: new Date('2020-02-08'), value: 25 },
          { date: new Date('2020-02-09'), value: 35 },
          { date: new Date('2020-02-10'), value: 50 },
          { date: new Date('2020-02-11'), value: 60 },
          { date: new Date('2020-02-12'), value: 70 },
          // Third month with increased density and fluctuating values
          { date: new Date('2020-03-01'), value: 80 },
          { date: new Date('2020-03-02'), value: 85 },
          { date: new Date('2020-03-03'), value: 90 },
          { date: new Date('2020-03-04'), value: 85 },
          { date: new Date('2020-03-05'), value: 80 },
          { date: new Date('2020-03-06'), value: 75 },
          { date: new Date('2020-03-07'), value: 70 },
          { date: new Date('2020-03-08'), value: 75 },
          { date: new Date('2020-03-09'), value: 80 },
          { date: new Date('2020-03-10'), value: 85 },
          // Fourth month with fluctuating values
          { date: new Date('2020-04-01'), value: 75 },
          { date: new Date('2020-04-02'), value: 70 },
          { date: new Date('2020-04-03'), value: 65 },
          { date: new Date('2020-04-04'), value: 70 },
          { date: new Date('2020-04-05'), value: 75 },
          { date: new Date('2020-04-06'), value: 80 },
          { date: new Date('2020-04-07'), value: 85 },
          { date: new Date('2020-04-08'), value: 80 },
          { date: new Date('2020-04-09'), value: 75 },
          { date: new Date('2020-04-10'), value: 70 },
          // Fifth month with fluctuating values
          { date: new Date('2020-05-01'), value: 70 },
          { date: new Date('2020-05-02'), value: 75 },
          { date: new Date('2020-05-03'), value: 80 },
          { date: new Date('2020-05-04'), value: 85 },
          { date: new Date('2020-05-05'), value: 80 },
          { date: new Date('2020-05-06'), value: 75 },
          { date: new Date('2020-05-07'), value: 70 },
          { date: new Date('2020-05-08'), value: 65 },
          { date: new Date('2020-05-09'), value: 70 },
          { date: new Date('2020-05-10'), value: 75 },
          // Sixth month with fluctuating values
          { date: new Date('2020-06-01'), value: 75 },
          { date: new Date('2020-06-02'), value: 80 },
          { date: new Date('2020-06-03'), value: 85 },
          { date: new Date('2020-06-04'), value: 80 },
          { date: new Date('2020-06-05'), value: 75 },
          { date: new Date('2020-06-06'), value: 70 },
          { date: new Date('2020-06-07'), value: 65 },
          { date: new Date('2020-06-08'), value: 70 },
          { date: new Date('2020-06-09'), value: 75 },
          { date: new Date('2020-06-10'), value: 80 }
          // Add more data points as needed
        ]
      }
      ,
      {
        name: 'Line 2',
        data: [
          { date: new Date('2020-01-01'), value: 10 },
          { date: new Date('2020-02-01'), value: 40 },
          { date: new Date('2020-03-01'), value: 70 },
          { date: new Date('2020-04-01'), value: 30 },
          { date: new Date('2020-05-01'), value: 80 },
          { date: new Date('2020-06-01'), value: 60 }
        ]
      },
      {
        name: 'Line 3',
        data: [
          { date: new Date('2020-01-01'), value: 30 },
          { date: new Date('2020-02-01'), value: 50 },
          { date: new Date('2020-03-01'), value: 60 },
          { date: new Date('2020-04-01'), value: 40 },
          { date: new Date('2020-05-01'), value: 70 },
          { date: new Date('2020-06-01'), value: 50 }
        ]
      }
    ];

    const margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };

    const width = 400 - (margin.left + margin.right);
    const height = 350 - (margin.top + margin.bottom);

    const svg = d3.select('#viz')
      .append('svg')
      .attr('viewBox', `0 0 ${width + (margin.left + margin.right)} ${height + (margin.top + margin.bottom)}`)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    const path = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);

    const allDataPoints: DataPoint[] = ([] as DataPoint[]).concat(...data.map((lineData) => lineData.data)); // Flatten the array

    const xScale = d3.scaleTime()
      .domain(d3.extent(allDataPoints, (d: DataPoint) => d.date) as [Date, Date])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(allDataPoints, (d: DataPoint) => d.value) || 0])
      .range([height, 0]);

    const line = d3.line<DataPoint>()
      .x((d: DataPoint) => xScale(d.date)!)
      .y((d: DataPoint) => yScale(d.value)!)
      .curve(d3.curveMonotoneX);

    const xAxis = d3.axisBottom(xScale);
    path.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    path.append('g').call(yAxis);

    // Append the path elements for each line
    data.forEach((lineData, i) => {
      const pathElement = path.append('path')
        .datum(lineData.data)
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', ['#f5842e', 'blue', 'green'][i])
        .attr('stroke-width', '3')
        .attr('d', line);

      // Get the total length of the path
      const pathLength = pathElement.node()?.getTotalLength();

      // Animate the path drawing
      if (pathLength) {
        pathElement.attr('stroke-dasharray', pathLength + ' ' + pathLength)
          .attr('stroke-dashoffset', pathLength)
          // .transition()
          // .duration(2000)
          // .ease(d3.easeSinOut)
          .attr('stroke-dashoffset', 0);
      }
    });
  }

  async navigateToHelpPage() {
    await Browser.open({ url: 'https://greatergoods.com/legal/privacy-policy' });
  }


  refreshGraph(): void {
    // Remove the existing SVG element
    d3.select('#viz svg').remove();

    // Redraw the chart
    this.drawChart();
    // GGBluetoothIonic.isDarkMode()
  }
}
