import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorService } from '../author.service';
import { Author } from '../model/Author';

@Component({
selector: 'app-author-edit',
templateUrl: './author-edit.component.html',
styleUrls: ['./author-edit.component.scss']
})
export class AuthorEditComponent implements OnInit {

    author : Author;

    constructor(
        public dialogRef: MatDialogRef<AuthorEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private authorService: AuthorService
    ) { }

    ngOnInit(): void {
        if (this.data.author != null) {
            //en el .open() escribimos en el atributo autor de data. Aquí asignamos desde data en el atributo de la clase
            this.author = Object.assign({}, this.data.author);
        }
        else {
            this.author = new Author();
        }
    }

    onSave() {
        //console.log(this.author.name.length);
        //alert(this.author.name.length);
        if (this.author.name!="" && this.author.name.length>0 && this.author.nationality!="") {
            this.authorService.saveAuthor(this.author).subscribe(result =>  {
                this.dialogRef.close();//this.dialogRef.close(true)
            }); 
        }
    }  

    onClose() {
        this.dialogRef.close();//this.dialogRef.close(false)
    }

}
