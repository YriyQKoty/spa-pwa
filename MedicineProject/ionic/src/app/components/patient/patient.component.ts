import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Patient } from 'src/app/service/data-getter.service';
import { DataGetterService } from 'src/app/service/data-getter.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {

  @Input() patient: Patient;
  @Input() isNew: boolean;
  @Output() addPatient = new EventEmitter();
  @Output() cancelAddingPatient = new EventEmitter();
  title:string;

  constructor(private dataGetter: DataGetterService) {

  }

  ngOnInit() {
    if(this.isNew) {
      this.patient = {
        id: null,
        fullname: '',
        doctor: "Doctor",
        recipes_quantity: 0
      }
      this.title = 'New Patient'
    }
  }

  savePatient() {
    this.dataGetter.editPatient(this.patient).subscribe(
      data => console.log(data)
    )
  }

  addNew() {
    if (this.isNew) {
      this.addPatient.emit(this.patient)
    }
  }

  cancelAdding() {
    if(this.isNew) {
      this.cancelAddingPatient.emit();
    }
  }

}
