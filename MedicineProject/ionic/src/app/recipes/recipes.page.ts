import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataGetterService } from '../service/data-getter.service';
import { FireDataServiceService } from '../service/fire-data-service.service';
import { Recipe } from '../service/data-getter.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  patientId: string;
  patientName: string;
  recipes: Recipe[]
  
  showNew = false
  showEdit = -1

  constructor(
    private dataGetter: DataGetterService,
    private route: ActivatedRoute,
    private fireData: FireDataServiceService
 ) {
  this.patientId = this.route.snapshot.paramMap.get('id')
  this.fireData.getRecipes(this.patientId).subscribe(data => {
    this.recipes = data
  })  

}

  ngOnInit() {
    console.log(this.patientId)
    //this.patientName = this.route.snapshot.paramMap.get('patientName');
    
    console.log(this.recipes)
  }


  add() {
    this.showNew = true
  }

  delete(recipe) {
    console.log(recipe.id);
    this.fireData.deleteRecipe(recipe)
  }

  addRecipe(recipe) {
    this.fireData.addRecipe(recipe)
    this.showNew = false
  }

}
