import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { PageableRequest } from 'src/app/core/model/page/PageableRequest';
import { AuthorEditComponent } from '../author-edit/author-edit.component';
import { AuthorService } from '../author.service';
import { Author } from '../model/Author';

@Component({
selector: 'app-author-list',
templateUrl: './author-list.component.html',
styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit {

    pageNumber: number = 0;
    pageSize: number = 3;
    totalElements: number = 0;
    totalPages: number = 0;
    first: boolean = false;
    errorMessage: String;
   
    dataSource = new MatTableDataSource<Author>();
    displayedColumns: string[] = ['id', 'name', 'nationality', 'action'];

    constructor(
        private authorService: AuthorService,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.errorMessage = "";
        this.loadPage();
    }

    loadPage(event?: PageEvent) {

        let ppageableRequest : PageableRequest =  {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [{
                property: 'id',
                direction: 'ASC'
            }]
        }

        if (event != null) {
            ppageableRequest.pageSize = event.pageSize
            ppageableRequest.pageNumber = event.pageIndex;
        }

        this.authorService.getAuthors(ppageableRequest).subscribe(
            authorPage => {
            this.dataSource.data = authorPage.content;
            this.pageNumber = authorPage.pageable.pageNumber;
            this.pageSize = authorPage.pageable.pageSize;
            this.totalElements = authorPage.totalElements;
            this.totalPages = authorPage.totalPages;
            this.first = authorPage.first;        
        });

    }  

    createAuthor() {      
        const dialogRef = this.dialog.open(AuthorEditComponent, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {        
            //if (result)
            this.ngOnInit();
        });      
    }  

    editAuthor(authorr: Author) {    
        const dialogRef = this.dialog.open(AuthorEditComponent, {
            data: { author: authorr }
        });

        dialogRef.afterClosed().subscribe(result => {
            //if (result)
            this.ngOnInit();
        });    
    }

    deleteAuthor(author: Author) {    
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: { title: "Eliminar autor", description: "Atención si borra el autor se perderán sus datos.<br> ¿Desea eliminar el autor?" }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.authorService.deleteAuthor(author.id).subscribe(
                result =>  {
                    this.ngOnInit();
                },
                error => {
                    //alert(error.error), console.error(error.error),
                    this.errorMessage = error.error;
                }
                ); 
            }
        });
    }  
}
