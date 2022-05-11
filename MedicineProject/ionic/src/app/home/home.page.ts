import { Component } from '@angular/core';
import { DataGetterService,Patient } from '../service/data-getter.service';

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

  constructor(private dataGetter: DataGetterService) {
    this.dataGetter.getPatients().subscribe(
      (data) => {
        this.patients = data
      }
    )
    this.userName = this.dataGetter.getUser()
  }

  add() {
    this.showNew = true
  }

  delete(patient) {
    this.dataGetter.deletePatient(patient).subscribe(
      res => this.dataGetter.getPatients().subscribe(
        data => this.patients = data
      )
    )
  }

  addPatient(patient: Patient) {
    this.dataGetter.addPatient(patient).subscribe(
      res => this.dataGetter.getPatients().subscribe(
      data => this.patients = data
    ));
    this.showNew = false
  }

  refresh(toggle) {
      this.dataGetter.getPatients().subscribe(
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
