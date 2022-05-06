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

  delete(index: number) {
    this.dataGetter.deletePatient(index)
  }

  addPatient(patient) {
    this.dataGetter.addPatient(patient)
    this.showNew = false
  }

}
