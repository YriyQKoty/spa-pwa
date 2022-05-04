import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsDataService } from '../services/patients-data.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes! :any[]
  patientName!: string;


  constructor(private patientService: PatientsDataService, private activatedRoute: ActivatedRoute) {
      
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.patientName = params['patName']
        this.getRecipes(this.patientName)
      }
    )
  }

  getRecipes(name: string) {
    this.patientService.getRecipes(name).subscribe(
      (recipes) => {
        this.recipes = recipes;
      }
    )
  }

}
