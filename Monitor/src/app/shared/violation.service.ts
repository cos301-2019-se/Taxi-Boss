import { Injectable } from '@angular/core';
import { Violation } from './violation.model';
import { Driver } from './driver.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViolationService {

  numViolations: number;
  driverViolations: Violation[];
  readonly rootUrl = "https://europe-west2-taxi-boss-3792e.cloudfunctions.net";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }) 
  }
  
  constructor(private http : HttpClient) {
    
  }
  
  getDriverViolations(curDriver: Driver){
      var numPlate = {
        'numberPlate': curDriver.numberPlate
      }
      return this.http.post(this.rootUrl+"/allViolationsByPlate", numPlate, this.httpOptions)
      .toPromise().then(res => this.driverViolations = res as Violation[])
      .then((res) => {
        if (typeof this.driverViolations !== 'undefined') {
          this.numViolations=this.driverViolations.length;
        }else{
          this.numViolations=0;
        }
      });
  }
}
