import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BookService } from './book.service';
import { Book } from './book';

import { LoanService } from '../loan/loan.service';
import { Loan } from '../loan/loan';

import * as moment from 'moment/moment';

@Component({
   selector: 'app-book',
   templateUrl: './book.component.html',
   styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit { 
   //Component properties
   message = {
    "success": null,
    "error": null,
    "text": ""
   };
   allBooks: Book[];
   allLoans: Loan[];
   book = {};
   loan: Loan;
   statusCode: number;
   requestProcessing = false;
   bookIdToUpdate = null;
   processValidation = false;
   bookAction = 'list';
   bookDetail = null;
   search = null;
   searchFind = false;
   findBook = {};

   //Create constructor to get service instance
   constructor(private bookService: BookService, private loanService: LoanService) {}

   //Create ngOnInit() and and load books
   ngOnInit(): void {
      this.getAllBooks();
      this.getAllLoans();
   }

   //Fetch all books
   getAllBooks() {
    this.bookService.getAllBooks()
    .subscribe(
                data => this.allBooks = data.books,
                errorCode =>  this.statusCode = errorCode
              );
   }

   //Fetch all loans
   getAllLoans() {
    this.loanService.getAllLoans()
    .subscribe(
                data => this.allLoans = data.loans,
                errorCode =>  this.statusCode = errorCode
              );
   }

   getMoment(date) {
    moment.locale('es');
    return moment(date).fromNow()
   }

   addLoan(loan:Loan) {
    if(loan.name===undefined || loan.name.length < 1) {
      this.message = {
        "success": null,
        "error": true,
        "text": "El Nombre es obligatorio"
      };
    }
    else if(loan.days===undefined || loan.days < 1) {
      this.message = {
        "success": null,
        "error": true,
        "text": "El número de días a prestar debe ser mayor a 0"
      };
    }
    else {
      //Create loan
      this.loanService.createLoan(loan)
      .subscribe(successCode => {
        //Update book
        let book = loan.book;
        book.status = "INACTIVE";

        this.bookService.updateBook(book)
        .subscribe(successCode => {
           this.statusCode = successCode;
           this.getAllLoans();
           this.getAllBooks(); 
           this.backList();
         },
         errorCode => this.statusCode = errorCode
         );
       },
       errorCode => this.statusCode = errorCode
       );
    }
  }

  addBook(book:Book) {
    if(book.isbn===undefined) {
      this.message = {
        "success": null,
        "error": true,
        "text": "El ISBN es obligatorio"
      };
    }
    else if(book.title===undefined) {
      this.message = {
        "success": null,
        "error": true,
        "text": "El Título es obligatorio"
      };
    }
    else {
      //Create book
      this.bookService.createBook(book)
      .subscribe(successCode => {
         this.statusCode = successCode;
         this.getAllLoans();
         this.getAllBooks(); 
         this.backList();
       },
       errorCode => this.statusCode = errorCode
       );
    }
  }

  updateBook(book:Book) {
    if(book.isbn===undefined || book.isbn.length < 1) {
      this.message = {
        "success": null,
        "error": true,
        "text": "El ISBN es obligatorio"
      };
    }
    else if(book.title===undefined || book.title.length < 1) {
      this.message = {
        "success": null,
        "error": true,
        "text": "El Título es obligatorio"
      };
    }
    else {
      //Update book
      this.bookService.updateBook(book)
      .subscribe(successCode => {
         this.statusCode = successCode;
         this.getAllLoans();
         this.getAllBooks(); 
         this.backList();
       },
       errorCode => this.statusCode = errorCode
       );
    }
  }

   //Back to the books list
   backList() {
    this.bookAction = 'list';
    this.searchFind = false;
   }
   //Load create panel
   createPanel() {
    this.bookAction = 'create';
    this.book = {};
    this.message = {"success": null,"error": null,"text": ""};
   }

   //Loan panel
   loanBook(book: Book) {
    this.bookAction = 'loan';
    this.loan = {
      book : book
    };
    this.message = {"success": null,"error": null,"text": ""};
   }

   //Edit panel
   editBook(book: Book) {
    this.bookAction = 'edit';
    this.book  = book;
    this.message = {"success": null,"error": null,"text": ""};
   }

   //Load book to details
   loadBook(book: Book) {
    this.bookAction = 'details';
    this.bookDetail = book;
   }
   //Delete book
   deleteBook(bookId: string) {
      this.preProcessConfigurations();
      this.bookService.deleteBookById(bookId)
        .subscribe(successCode => {
      //this.statusCode = successCode;
        //Expecting success code 204 from server
      this.statusCode = 204;
      this.getAllBooks();
      this.getAllLoans(); 
    },
    errorCode => this.statusCode = errorCode);  
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
      this.statusCode = null;
      this.requestProcessing = true;   
   }

   searchBook(){
     this.bookService.getSearch(this.search)
        .subscribe(data => {
          console.log(data);

        if(data!==undefined && !data.success) {
          this.message = {
            "success": null,
            "error": true,
            "text": "No existe el libro que desea prestar"
          };
         
          this.searchFind = false;

        } else {
          this.message = {
            "success": null,
            "error": false,
            "text": ""
          };
          this.findBook = data.book[0];
          this.searchFind = true;
        }

      },
      errorCode => this.statusCode = errorCode);  
   }
}