import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { PatientComponent } from './patient/patient.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';

import {RouterModule, Routes} from '@angular/router'
import { RecipeListComponent } from './recipe-list/recipe-list.component';

const routes: Routes = [
  {path: 'patients', component: PatientListComponent},
  {path: 'recipes/:patName', component: RecipeListComponent},
  {path: '', redirectTo: 'patients', pathMatch: 'full'}
]


@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    NewPatientComponent,
    PatientListComponent,
    RecipeListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
