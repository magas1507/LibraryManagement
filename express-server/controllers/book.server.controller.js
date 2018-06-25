// ./express-server/controllers/book.server.controller.js
import mongoose from 'mongoose';
//import models
import book from '../models/book.server.model';
export const getBooks = (req,res) => {
  book.find().exec((err,books) => {
    console.log(books)
    if(err){
      return res.json({'success':false,'message':'Some Error'});
    }
    return res.json({'success':true,'message':'books fetched successfully',books});
  });
}
export const addBook = (req,res) => {
  const newBook = new book(req.body);
  newBook.save((err,book) => {
    if(err){
      return res.json({'success':false,'message':'Some Error'});
    }
    return res.json({'success':true,'message':'book added successfully',book});
  })
}
export const updateBook = (req,res) => {
  book.findByIdAndUpdate(
      req.body._id,
      req.body,
      {new: true},
      (err, todo) => {
          if (err) return res.json({'success':false,'message':'Some Error','error':err});
          return res.json({'success':true,'message':'Updated successfully',book});
      }
  )
}
export const getBook = (req,res) => {
  book.find({_id:req.params.id}).exec((err,book) => {
    if(err){
      return res.json({'success':false,'message':'Some Error'});
    }
    if(book.length){
      return res.json({'success':true,'message':'book fetched by id successfully',book});
    }
    else{
      return res.json({'success':false,'message':'book with the given id not found'});
    }
  })
}
export const deleteBook = (req,res) => {
  book.findByIdAndRemove(req.params.id, (err,book) => {
    if(err){
      return res.json({'success':false,'message':'Some Error'});
    }
    return res.json({'success':true,'message':book.bookText+' deleted successfully'});
  })
}
export const getSearch = (req,res) => {
  book.find({isbn:req.params.search}).exec((err,book) => {
    if(err){
      return res.json({'success':false,'message':'Some Error'});
    }
    if(book.length){
      return res.json({'success':true,'message':'book fetched by isbn successfully',book});
    }
    else{
      return res.json({'success':false,'message':'book with the given isbn not found'});
    }
  })
}
