import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataGetterService } from '../service/data-getter.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})
export class RecipesPage implements OnInit {

  patientName: string;
  recipes: any[]

  constructor(
    private dataGetter: DataGetterService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.patientName = this.route.snapshot.paramMap.get('patientName')
    this.dataGetter.getRecipes(this.patientName).subscribe(data => {
      this.recipes = data
    })
  }

}
