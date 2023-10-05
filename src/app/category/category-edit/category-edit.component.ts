import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../category.service';
import { Category } from '../model/Category';


@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  category : Category;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CategoryEditComponent>,
    private categoryService: CategoryService       
  ) { }

  ngOnInit(): void {
    if (this.data.category != null) {
      //en el .open() escribimos en el atributo category de data. Aquí asignamos desde data en el atributo de la clase
      //this.category = this.data.category; //actualiza también el listado
      this.category = Object.assign({}, this.data.category); //copia para no actualizar listado
    }
    else {
      this.category = new Category();
    }
  }

  onSave() {
    this.categoryService.saveCategory(this.category).subscribe(result => {
      this.dialogRef.close();
    });    
  }  

  onClose() {
    this.dialogRef.close();
  }

}
