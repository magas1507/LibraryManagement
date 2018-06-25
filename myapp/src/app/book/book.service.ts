import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { Book } from './book';

@Injectable()
export class BookService {
    //URL for CRUD operations
    bookUrl = 'http://localhost:3001/api/book';

    //Create constructor to get Http instance
    constructor(private http:Http) { 
    }

    //Fetch all books
    getAllBooks(): Observable<any> {
        return this.http.get(this.bookUrl)
	   .pipe(map(this.extractData));

    }
    //Create book
    createBook(book: Book):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.bookUrl, book, options)
        .pipe(map(success => success.status));
    }
    //Fetch book by id
    getBookById(bookId: string): Observable<Book> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
	let options = new RequestOptions({ headers: cpHeaders });
	console.log(this.bookUrl +"/"+ bookId);
	return this.http.get(this.bookUrl +"/"+ bookId)
    .pipe(map(this.extractData));
    }	
    //Update book
    updateBook(book: Book):Observable<number> {
	let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.bookUrl, book, options)
        .pipe(map(success => success.status));
    }
    //Delete book	
    deleteBookById(bookId: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.delete(this.bookUrl +"/"+ bookId)
           .pipe(map(success => success.status));
    }
    getSearch(search: string): Observable<any> {
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        console.log(this.bookUrl +"/search/"+ search);
        return this.http.get(this.bookUrl +"/search/"+ search)
        .pipe(map(this.extractData));   
    }	
    private extractData(res: Response) {
	let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.status);
    }
} 