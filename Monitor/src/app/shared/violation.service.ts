import { Injectable } from '@angular/core';
import { Violation } from './violation.model';
import { Driver } from './driver.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MonitorService } from './monitor.service';

@Injectable({
  providedIn: 'root'
})
export class ViolationService {

  numViolations: number;
  driverViolations: Violation[];
  viewViolations: boolean;
  numViolationsPerDayList: any ={};
  numAllViolationsPerCategory: any={};
  //HTTP API For retrieving driver related data
  readonly rootUrl = "https://europe-west2-taxi-boss-3792e.cloudfunctions.net";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }) 
  }
  
  constructor(private http : HttpClient, private monitorService: MonitorService) {
    this.driverViolations=[];
    this.numViolationsPerDayList=[];
  }
  
  getList(curDriver: Driver): Promise<any>{
    return new Promise((resolve, reject) => {
      resolve(this.refreshViolations(curDriver));
    });
  }
  refreshViolations(curDriver: Driver): Array<any>{
      var numPlate = {
        'numberPlate': curDriver.numberPlate
      }
      this.http.post(this.rootUrl+"/allViolationsByPlate", numPlate, this.httpOptions)
      .toPromise().then(res => this.driverViolations = res as Violation[])
      .then((res) => {
        if (typeof this.driverViolations !== 'undefined') {
          this.numViolations=this.driverViolations.length;
        }else{
          this.numViolations=0;
        }
      });
      return this.driverViolations;
  }

  getWorstDriver(){
    
  }

  getNumViolationsPerDay(): Promise<any>{
    return this.http.post(this.rootUrl+"/numViolationsByMonitorWeek", this.monitorService.monitorDetails, this.httpOptions)
    .toPromise().then(res => this.numViolationsPerDayList = res );
  }

  getAllViolationsPerCategory(): Promise<any>{
    return this.http.post(this.rootUrl+"/violationsByDescriptionMonitor", this.monitorService.monitorDetails, this.httpOptions)
    .toPromise().then(res => this.numAllViolationsPerCategory = res )
    .then(res => console.log(this.numAllViolationsPerCategory));
  }
}
