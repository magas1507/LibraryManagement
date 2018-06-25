// ./express-server/routes/loan.server.route.js
import express from 'express';
//import controller file
import * as loanController from '../controllers/loan.server.controller';
// get an instance of express router
const router = express.Router();
router.route('/')
		.get(loanController.getLoans)
		.post(loanController.addLoan)
		.put(loanController.updateLoan);
router.route('/:id')
		.get(loanController.getLoan)
		.delete(loanController.deleteLoan);
export default router;
