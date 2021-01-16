import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {

  recipe: Recipe;

  constructor(private route: ActivatedRoute, private recipesService: RecipesService, private router: Router, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      if(!param.has('recipeId')) {
          this.router.navigate(['/recipes'])
        return;
      } else {
        const recipeId = param.get('recipeId');
        this.recipe = this.recipesService.getRecipe(recipeId);
      }
    })
  }

  onDelete() {
    this.alertCtrl.create({
      header: 'Are you sure?',
      message: 'Do you really need to delete this recipe?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      },
      {
        text: 'Delete',
        handler: () => {
          this.recipesService.delRecipe(this.recipe.id);
          this.router.navigate(['/recipes'])
        }
      }
    ]
    }).then(alertEl => {
      alertEl.present()
    })
    
  }

}
