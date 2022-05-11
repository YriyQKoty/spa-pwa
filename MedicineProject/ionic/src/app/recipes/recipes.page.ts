import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataGetterService } from '../service/data-getter.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  patientId: number;
  patientName: string;
  recipes: any[]
  
  showNew = false
  showEdit = -1

  constructor(
    private dataGetter: DataGetterService,
    private route: ActivatedRoute,
 ) {
  this.patientId = +this.route.snapshot.paramMap.get('id')
  this.dataGetter.getRecipes(this.patientId).subscribe(data => {
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
    this.dataGetter.deleteRecipe(recipe).subscribe(
      res => this.dataGetter.getRecipes(recipe.patientId).subscribe(
        data => this.recipes = data
      )
    )
  }

  addRecipe(recipe) {
    this.dataGetter.addRecipe(recipe).subscribe(
      res => this.dataGetter.getRecipes(recipe.patientId).subscribe(
      data => this.recipes = data
    ));
    this.showNew = false
  }

}
