import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category} from '../interfaces/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl: string = 'http://localhost:8081/api';
  http = inject(HttpClient);

  constructor() { }

  getAllCategories(){
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }
}
