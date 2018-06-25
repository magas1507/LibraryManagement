import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { BookComponent }  from './book/book.component';
import { BookService } from './book/book.service';
import { LoanService } from './loan/loan.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  imports: [     
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  declarations: [
    AppComponent,
    BookComponent
  ],
  providers: [
    BookService,
    LoanService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { } 