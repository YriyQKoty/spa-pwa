import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipeName = "Name"
  quantity = "Quantity"
  desc = "Desc"
  
  constructor() { }

  ngOnInit(): void {
  }

}
