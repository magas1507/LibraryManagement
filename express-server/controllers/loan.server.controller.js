// ./express-server/controllers/loan.server.controller.js
import mongoose from 'mongoose';
//import models
import loan from '../models/loan.server.model';
export const getLoans = (req,res) => {
  loan.find().exec((err,loans) => {
    console.log(loans)
    if(err){
      return res.json({'success':false,'message':'Some Error'});
    }
    return res.json({'success':true,'message':'loans fetched successfully',loans});
  });
}
export const addLoan = (req,res) => {
  const newLoan = new loan(req.body);
  newLoan.save((err,loan) => {
    if(err){
      return res.json({'success':false,'message':'Some Error'});
    }
    return res.json({'success':true,'message':'loan added successfully',loan});
  })
}
export const updateLoan = (req,res) => {
  loan.findByIdAndUpdate(
      req.body._id,
      req.body,
      {new: true},
      (err, todo) => {
          if (err) return res.json({'success':false,'message':'Some Error','error':err});
          return res.json({'success':true,'message':'Updated successfully',loan});
      }
  )
}
export const getLoan = (req,res) => {
  loan.find({_id:req.params.id}).exec((err,loan) => {
    if(err){
      return res.json({'success':false,'message':'Some Error'});
    }
    if(loan.length){
      return res.json({'success':true,'message':'loan fetched by id successfully',loan});
    }
    else{
      return res.json({'success':false,'message':'loan with the given id not found'});
    }
  })
}
export const deleteLoan = (req,res) => {
  loan.findByIdAndRemove(req.params.id, (err,loan) => {
    if(err){
      return res.json({'success':false,'message':'Some Error'});
    }
    return res.json({'success':true,'message':loan.loanText+' deleted successfully'});
  })
}
