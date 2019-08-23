import { Injectable } from '@angular/core';
import { Driver } from './driver.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MonitorService } from './monitor.service';
import { ViolationService } from './violation.service';
import { Subject } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  source: LocalDataSource;
  formData :Driver;
  _driverDetails: Subject<any> = new Subject<any>();
  driverDetails :Driver;
  driverList: Driver[];
  numDrivers: number;
  readonly rootURL="https://europe-west2-taxi-boss-3792e.cloudfunctions.net";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }) 
  }

  constructor(private firestore:AngularFirestore, private http: HttpClient, private monitorService: MonitorService, private violationService: ViolationService) { 
    this.driverList=[];
    this.source=new LocalDataSource();
    this.driverDetails={
        cellNumber : '',
        email : '',
        monitorEmail : '',
        name : '',
        numberPlate : '',
        password: '',
    };
  }
  
  postDriver(formData: Driver){
    return this.http.post(this.rootURL+'/addDriver', formData, this.httpOptions);
  }
  
  getDrivers(){
    return this.firestore.collection('Taxi Driver').snapshotChanges();
  }
  
  getList(): Promise<any>{
    return new Promise((resolve, reject) => {
      resolve(this.refreshList());
    });
  }
  refreshList(): Array<any>{
    this.http.post(this.rootURL+'/listOfDrivers',this.monitorService.monitorDetails)
    .toPromise().then(res => this.driverList = res as Driver[])
    .then( res => {
      this.driverDetails=this.driverList[0];
      this.source.load(this.driverList);
    })
    .then((res) => {
      if (typeof this.driverDetails !== 'undefined') {
        this.numDrivers=this.driverList.length;
        this.violationService.refreshViolations(this.driverDetails);
      }else{
        this.numDrivers=0;
      }
    });
    return this.driverList;
  }
}
