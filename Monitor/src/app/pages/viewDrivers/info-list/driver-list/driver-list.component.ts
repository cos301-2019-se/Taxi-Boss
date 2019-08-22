import { Component, OnInit, Input, HostListener, AfterViewInit, AfterContentInit, OnChanges } from '@angular/core';
import { Driver } from '../../../../shared/driver.model';
import { DriverService } from '../../../../shared/driver.service';
import { ViolationService } from '../../../../shared/violation.service';
import { InfoListComponent } from '../info-list.component';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'driver-list',
  templateUrl: './driver-list.component.html',
})
export class DriverListComponent{
  list: Driver[];
  tries: number;
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    hideSubHeader:true,
    columns: {
      name: {
        title: 'First Name',
        type: 'string',
        filter: false
      },
      cellNumber: {
        title: 'Cell Number',
        type: 'string',
        filter: false
      },
      email: {
        title: 'E-mail',
        type: 'string',
        filter: false
      },
      numberPlate: {
        title: 'Number Plate',
        type: 'string',
        filter: false
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(public service:DriverService, public vService: ViolationService) { 
    this.source = new LocalDataSource();
      this.service.getList().then((data) => {
        this.source.load(data);
      });
  }
  onSelect(event){
    this.service.driverDetails = event.data;
    this.vService.refreshViolations(this.service.driverDetails);
    // console.log(this.service.driverDetails.name);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
