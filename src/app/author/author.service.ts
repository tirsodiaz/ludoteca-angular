import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PageableRequest } from '../core/model/page/PageableRequest';
import { Author } from './model/Author';
import { AuthorPage } from './model/AuthorPage';
import { AUTHOR_DATA } from './model/mock-authors';
import { AUTHOR_DATA_LIST } from './model/mock-authors-list';

@Injectable({
    providedIn: 'root'
})
export class AuthorService {

    constructor(
        private http: HttpClient
        ) { }

    getAuthors(pageableRequestt: PageableRequest): Observable<AuthorPage> {
        //return of(AUTHOR_DATA);
        return this.http.post<AuthorPage>('http://localhost:8080/author', {pageableRequest:pageableRequestt});
    }

    getAllAuthors(): Observable<Author[]> {
        //return of(AUTHOR_DATA_LIST);
        return this.http.get<Author[]>('http://localhost:8080/author');
    }

    saveAuthor(author: Author): Observable<void> {
        //return of(null);
        let url = 'http://localhost:8080/author';
        if (author.id != null) url += '/'+author.id;

        return this.http.put<void>(url, author);
    }

    deleteAuthor(idAuthor : number): Observable<void> {
        //return of(null);
        return this.http.delete<void>('http://localhost:8080/author/'+idAuthor);
    }    
}