import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorService } from 'src/app/author/author.service';
import { Author } from 'src/app/author/model/Author';
import { CategoryService } from 'src/app/category/category.service';
import { Category } from 'src/app/category/model/Category';
import { GameService } from '../game.service';
import { Game } from '../model/Game';

@Component({
    selector: 'app-game-edit',
    templateUrl: './game-edit.component.html',
    styleUrls: ['./game-edit.component.scss']
})
export class GameEditComponent implements OnInit {

    game: Game; 
    authors: Author[];
    categories: Category[];

    constructor(
        public dialogRef: MatDialogRef<GameEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private gameService: GameService,
        private categoryService: CategoryService,
        private authorService: AuthorService,
    ) { }

    ngOnInit(): void {
        if (this.data.game != null) {
            //en el .open() escribimos en el atributo game de data. Aquí asignamos desde data en el atributo de la clase
            this.game = Object.assign({}, this.data.game);
        }
        else {
            this.game = new Game();
        }

        this.categoryService.getCategories().subscribe(
            categories => {
                this.categories = categories;
                
                if (this.game.category != null) {
                    let categoryFilter: Category[] = categories.filter(category => category.id == this.data.game.category.id); //también valdría ==this.game.category.id
                    if (categoryFilter != null) {
                        this.game.category = categoryFilter[0];
                    }
                }
            }
        );

        this.authorService.getAllAuthors().subscribe(
            authors => {
                this.authors = authors

                if (this.game.author != null) {
                    let authorFilter: Author[] = authors.filter(author => author.id == this.data.game.author.id); //también valdría ==this.game.author.id
                    if (authorFilter != null) {
                        this.game.author = authorFilter[0];
                    }
                }
            }
        );
    }

    onSave() {
        this.gameService.saveGame(this.game).subscribe(result => {
            this.dialogRef.close();
        });    
    }  

    onClose() {
        this.dialogRef.close();
    }

}