import { Book } from '../book/book';

export class Loan {
    constructor(
        public _id?: string, 
        public name?: string,
        public days?: number,
        public book?: Book,
        public createdAt?: Date,
        public updatedAt?: Date,
        public deletedAt?: Date
        ) { 
    }
 }
