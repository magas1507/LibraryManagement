export class Book {
    constructor(
        public _id: string, 
        public isbn: string,
        public title: string,
        public author: string,
        public language: string,
        public editorial: string,
        public state: string,
        public description: string,
        public status: string,
        public releaseDate: Date,
        public createdAt: Date,
        public updatedAt: Date,
        public deletedAt: Date
        ) { 
    }
 }
