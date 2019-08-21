import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Driver } from '../../../../shared/driver.model';
import { DriverService } from '../../../../shared/driver.service';
import { ViolationService } from '../../../../shared/violation.service';
import { InfoListComponent } from '../info-list.component';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'driver-list',
  templateUrl: './driver-list.component.html',
})
export class DriverListComponent implements OnInit {
  list: Driver[];
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
    columns: {
      fullName: {
        title: 'First Name',
        type: 'string',
      },
      cellNum: {
        title: 'Cell Number',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      numberPlate: {
        title: 'Number Plate',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  constructor(public service:DriverService, public vService: ViolationService) { 
    this.source.load(this.service.driverList);
  }

  ngOnInit() {
    // this.service.getDrivers().subscribe(actionArray =>{
    //   this.list = actionArray.map(item=> {
    //     return {
    //       id:item.payload.doc.id,
    //       ...item.payload.doc.data() 
    //     } as Driver;
    //   })
    // });
    this.service.refreshList();
  }

  @Input() infolist: InfoListComponent;
  @HostListener('onSelect')
  onSelect(driv: Driver){
    this.service.driverDetails = driv;
    this.vService.getDriverViolations(this.service.driverDetails);
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
