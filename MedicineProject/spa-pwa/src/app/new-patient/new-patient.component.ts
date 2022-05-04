import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PatientsDataService } from '../services/patients-data.service';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: [
    './new-patient-component.scss'
  ]
})
export class NewPatientComponent implements OnInit {

  @Output() patient = new EventEmitter();

  showForm = false;
  constructor(private patientDataService: PatientsDataService) { }

  ngOnInit(): void {
  }

  onSubmit(myForm: any) {
    const fields = myForm.form.controls;
    this.showForm = false;

    this.patientDataService.addPatient(
      {
        image: fields.image.value,
        fullname: fields.fullname.value,
        doctor: fields.doctor.value,
        recipes: fields.recipes.value
      }
    );
  }

}