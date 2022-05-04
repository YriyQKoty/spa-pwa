import { Component, OnInit } from '@angular/core';
import { PatientsDataService } from '../services/patients-data.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  patients!: any

  constructor(private patientsDataService: PatientsDataService) {
    patientsDataService.getPatients().subscribe(
      (patients) => this.patients = patients
    );
  }


  ngOnInit(): void {
  }

}
