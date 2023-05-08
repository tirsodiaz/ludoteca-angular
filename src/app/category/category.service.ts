import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from './model/Category';
import { CATEGORY_DATA } from './model/mock-categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    //return of(CATEGORY_DATA);
    return this.http.get<Category[]>('http://localhost:8080/category');
  }

  saveCategory(category: Category): Observable<Category> {
    //return of(null);
    let url = 'http://localhost:8080/category';
        if (category.id != null) url += '/'+category.id;

        return this.http.put<Category>(url, category);
  }

  deleteCategory(idCategory: number): Observable<any> {
    //return of(null);
    return this.http.delete('http://localhost:8080/category/'+idCategory);
  }  
}
