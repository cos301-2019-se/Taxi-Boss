import { Injectable } from '@angular/core';
import { Monitor } from './monitor.model';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  monitorDetails: Monitor;
  constructor() { 
    this.monitorDetails=new Monitor;
    this.monitorDetails.email="brian@brian.com";
  }

  setMonitor(mDetails: string){
    this.monitorDetails.email=mDetails;
    console.log(this.monitorDetails.email);
  }
}
