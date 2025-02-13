import {Component, EventEmitter, inject, Output} from '@angular/core';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, NgForOf} from '@angular/common';
import {CategoryService} from '../../data/service/category.service';
import {Category} from '../../data/interfaces/Category';

@Component({
  selector: 'app-category-selector',
  imports: [
    CommonModule,
    MatFormField,
    MatSelect,
    MatOption,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.css'
})
export class CategorySelectorComponent {
  @Output() categoriesSelected = new EventEmitter<string>();

  categoryService = inject(CategoryService);
  categories: string[] = [];
  selectedCategories: string = '';

  constructor() {
    this.categoryService.getAllCategories().subscribe({
      next: data => {this.categories = data.map(category => category.name);}
    })
  }

  onSelectedCategories() {
    this.categoriesSelected.emit(this.selectedCategories)
  }
}
