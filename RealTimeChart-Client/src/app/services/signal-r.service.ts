import { Injectable } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ChartModel } from '../ChartModel';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  constructor(private http: HttpClient) { }

  public data: ChartModel[];
 
  private hubConnection: signalR.HubConnection
   
    public startConnection = () => {
      this.hubConnection = new signalR.HubConnectionBuilder()
                              .withUrl('https://localhost:44332/chart', {skipNegotiation:true, transport: signalR.HttpTransportType.WebSockets})
                              .build();
   
      this.hubConnection
        .start()
        .then(() => console.log('Connection started'))
        .catch(err => console.log('Error while starting connection: ' + err))
    }
   
    public addTransferChartDataListener = () => {
      this.hubConnection.on('transferchartdata', (data) => {
        this.data = data;
        console.log(data);
      });
  }
}
  // //Establishes SignalR hub connection with API url provided
  // public startConnection() {
  //   console.log('entered startConnection');
  //   this.hubConnection = new signalR.HubConnectionBuilder()
  //     .withUrl('https://localhost:44332/chart', {skipNegotiation:true, transport: signalR.HttpTransportType.WebSockets})
  //     .build();

  //     this.hubConnection
  //     .start()
  //     .then(() => console.log('Connection started'))
  //     .catch(err => console.log('Error while starting connection: ' + err))
  
  // } 

  // //Fetches data from server
  // public addTransferChartDataListener = () => {
  //   this.hubConnection.on('transferchartdata', (data) => {
  //     this.data = data;
  //     console.log(data);
  //   });
  // }


    // this.hubConnection
    //   .start()
    //   .then(() => {
    //        this.hubConnection.on('transferchartdata', (userId , data) => {  
    //        this.userId = userId,
    //        this.data = data;})              
    //   })
    //   .catch(err => console.log('Error while starting connection: ' + err))

  // public addTransferChartDataListener = () => {
  //   console.log('entered addTransferData');
  //   debugger;
  //   this.hubConnection.on('transferchartdata', function(userId , data) {  
  //     this.userId = userId,
  //     this.data = data;
  //     console.log('Data from API: ', data + 'user: ', userId);
  //   });
  // }


  //Sends data to server
  // public BroadcastChartData = () => {
  //   this.hubConnection.invoke('broadcastchartdata', this.data)
  //   .catch(err => console.error(err));
  // }
  