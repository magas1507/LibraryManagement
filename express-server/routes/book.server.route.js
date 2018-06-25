// ./express-server/routes/book.server.route.js
import express from 'express';
//import controller file
import * as bookController from '../controllers/book.server.controller';
// get an instance of express router
const router = express.Router();
router.route('/')
		.get(bookController.getBooks)
		.post(bookController.addBook)
		.put(bookController.updateBook);
router.route('/:id')
		.get(bookController.getBook)
		.delete(bookController.deleteBook);
router.route('/search/:search')
		.get(bookController.getSearch);
export default router;
