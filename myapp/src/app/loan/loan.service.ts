import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { Loan } from './loan';

@Injectable()
export class LoanService {
    //URL for CRUD operations
    loanUrl = 'http://localhost:3001/api/loan';

    //Create constructor to get Http instance
    constructor(private http:Http) { 
    }

    //Fetch all loans
    getAllLoans(): Observable<any> {
        return this.http.get(this.loanUrl)
       .pipe(map(this.extractData));

    }

    //Create loan
    createLoan(loan: Loan):Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.loanUrl, loan, options)
        .pipe(map(success => success.status));
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