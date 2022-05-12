import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RecipesPage } from 'src/app/recipes/recipes.page';
import { Recipe } from 'src/app/service/data-getter.service';
import { DataGetterService } from 'src/app/service/data-getter.service';
import { FireDataServiceService } from 'src/app/service/fire-data-service.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],

})
export class RecipeComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() isNew: boolean;
  @Input() patientId: string;
  @Output() addRecipe = new EventEmitter();
  @Output() cancelAddingRecipe = new EventEmitter();
  title:string;


  constructor(private dataGetter: DataGetterService,
    private fireData:FireDataServiceService) {

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
    this.fireData.editRecipe(this.recipe)
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
