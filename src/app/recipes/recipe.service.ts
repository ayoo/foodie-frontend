
import { Recipe } from "app/recipes/recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "app/shared/ingredient.model";
import { ShoppingListService } from "app/shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      "Tasty Schnitzel",
      "This is the test recipe",
      "http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-7_edited.jpg",
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 1),
      ]),
    new Recipe(
      "Big Fat Burger",
      "This is the test recipe2",
      "http://dolcecarini.com/wp-content/uploads/2014/07/Cheeseburger.jpg",
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1),
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipies() {
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

}