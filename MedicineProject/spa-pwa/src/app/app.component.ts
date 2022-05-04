import { Component } from '@angular/core';
import { PatientsDataService } from './services/patients-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'spa-pwa';
  patients!: any

  constructor() {
   
  }


}
