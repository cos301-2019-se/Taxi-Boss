import { Injectable } from '@angular/core';
import { Driver } from './driver.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MonitorService } from './monitor.service';
import { ViolationService } from './violation.service';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  formData :Driver;
  driverDetails :Driver;
  driverList: Driver[];
  numDrivers: number;
  readonly rootURL="https://europe-west2-taxi-boss-3792e.cloudfunctions.net";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }) 
  }

  constructor(private firestore:AngularFirestore, private http: HttpClient, private monitorService: MonitorService, private violationService: ViolationService) { }
  
  postDriver(formData: Driver){
    return this.http.post(this.rootURL+'/addDriver', formData, this.httpOptions);
  }
  
  getDrivers(){
    return this.firestore.collection('Taxi Driver').snapshotChanges();
  }
  refreshList(){
    this.http.post(this.rootURL+'/listOfDrivers',this.monitorService.monitorDetails)
    .toPromise().then(res => this.driverList = res as Driver[])
    .then( res => this.driverDetails=this.driverList[0])
    .then((res) => {
      if (typeof this.driverList !== 'undefined') {
        this.numDrivers=this.driverList.length;
        this.violationService.getDriverViolations(this.driverDetails);
      }else{
        this.numDrivers=0;
      }
    });
  }
}
