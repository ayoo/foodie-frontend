import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model'
import { ShoppingListService } from "app/shopping-list/shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  editMode = false;
  edittedItemIndex: number;
  edittedItem: Ingredient;
  subscription: Subscription;


  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditting.subscribe(
      (id: number) => {
        this.editMode = true;
        this.edittedItemIndex = id;
        this.edittedItem = this.slService.getIngredient(id);
        this.slForm.setValue({
          name: this.edittedItem.name,
          amount: this.edittedItem.amount
        })
      }
    )
  }

  onSubmit(form: NgForm) {
    //const ingName = this.nameInputRef.nativeElement.value;
    //const ingAmount = this.amountInputRef.nativeElement.value;
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.edittedItemIndex, newIngredient)
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.onClear();
    this.slService.deleteIngredient(this.edittedItemIndex);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
