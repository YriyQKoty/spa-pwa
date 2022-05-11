import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RecipesPage } from 'src/app/recipes/recipes.page';
import { Recipe } from 'src/app/service/data-getter.service';
import { DataGetterService } from 'src/app/service/data-getter.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],

})
export class RecipeComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() isNew: boolean;
  @Input() patientId: number;
  @Output() addRecipe = new EventEmitter();
  @Output() cancelAddingRecipe = new EventEmitter();
  title:string;


  constructor(private dataGetter: DataGetterService) {

  }

  ngOnInit() {
    if(this.isNew) {
      this.recipe = {
        id: null,
        recipeName: "New recipe",
        quantity: 1,
        desc: "lorem",
        patientId: this.patientId
      }
      this.title = 'New Recipe'
    }
  }

  saveRecipe() {
    this.dataGetter.editRecipe(this.recipe).subscribe(
      data => console.log(data)
    )
  }

  addNew() {
    if (this.isNew) {
      this.addRecipe.emit(this.recipe)
    }
  }

  cancelAdding() {
    if(this.isNew) {
      this.cancelAddingRecipe.emit();
    }
  }

}
