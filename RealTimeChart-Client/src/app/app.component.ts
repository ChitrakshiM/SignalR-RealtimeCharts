import { Component, OnInit } from '@angular/core';
import { SignalRService } from './services/signal-r.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as signalR from "@aspnet/signalr";
//import {HubConnection} from '@aspnet/signalr-client';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private hubConnection: signalR.HubConnection;
 
  constructor(public SignalRService: SignalRService, private http: HttpClient) { }

  public chartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public chartLabels: string[] = ['Real time data for the chart'];
  public chartType: string = 'bar';
  public chartLegend: boolean = true;
  public colors: any[] = [{ backgroundColor: '#5491DA' }, { backgroundColor: '#E74C3C' }, { backgroundColor: '#82E0AA' }, { backgroundColor: '#E5E7E9' }]
 
  ngOnInit() {

   this.SignalRService.startConnection();
 
    this.startHttpRequest();
    this.SignalRService.addTransferChartDataListener();   
  }
 
  private startHttpRequest = () => {
    this.http.get('https://localhost:44332/api/chart')
      .subscribe(res => {
        console.log(res);
      })
  }  





}
//{ params: new HttpParams().set('userId', 'dummyUser')}