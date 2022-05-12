import { Component } from '@angular/core';
import { DataGetterService,Patient } from '../service/data-getter.service';
import { FireDataServiceService } from '../service/fire-data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  userName: string

  patients: Patient[]

  showNew = false
  showEdit = -1

  constructor(
    private dataGetter: DataGetterService,
    private fireBaseData: FireDataServiceService
    
    ) {
    this.fireBaseData.getPatients().subscribe(
      (data) => {
        this.patients = data
      }
    )
    this.userName = this.fireBaseData.getUser()
  }

  add() {
    this.showNew = true
  }

  delete(patient) {
    this.fireBaseData.deletePatient(patient);
  }

  addPatient(patient: Patient) {
    this.fireBaseData.addPatient(patient);
    this.showNew = false
  }

  refresh(toggle) {
      this.fireBaseData.getPatients().subscribe(
        data => {
          this.patients = data;
          if (toggle) {

            setTimeout(() => {
              console.log('Async operation has ended');
              toggle.target.complete();
            }, 3000);
          }
        }
      )
  }

}
