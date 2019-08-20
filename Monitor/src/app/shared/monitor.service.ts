import { Injectable } from '@angular/core';
import { Monitor } from './monitor.model';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  monitorDetails: Monitor;
  constructor() { 

  }

  setMonitor(mDetails: string){
    this.monitorDetails.email=mDetails;
    console.log(this.monitorDetails.email);
  }
}
