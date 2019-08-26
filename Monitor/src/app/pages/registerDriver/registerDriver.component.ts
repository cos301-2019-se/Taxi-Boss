import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../shared/driver.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { MonitorService } from '../../shared/monitor.service';
// import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-registerDriver',
  templateUrl: './registerDriver.component.html',
})
export class RegisterDriverComponent implements OnInit{
  
  constructor(public service : DriverService,
    private firestore:AngularFirestore,
    private monitor: MonitorService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form? : NgForm){
      if(form!=null)
        form.resetForm();
      this.service.formData ={
        cellNumber : '',
        email : '',
        monitorEmail : this.monitor.monitorDetails.email,
        name : '',
        numberPlate : '',
        password: '',
      }
    }
  onSubmit(form:NgForm){
    // let data = form.value;
    // this.firestore.collection('Taxi Driver').add(data);
    // this.resetForm(form);
    this.insertRecord(form);
  }

  insertRecord(form: NgForm){
    this.service.postDriver(form.value).subscribe(res => {
      this.resetForm(form)
    })
  }
}
