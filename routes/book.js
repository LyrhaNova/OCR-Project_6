const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const compressImage = require('../middleware/imageProcessor');
const bookCtrl = require('../controllers/book');

router.post('/', auth, multer, compressImage, bookCtrl.createBook);
router.put('/:id', auth, multer, compressImage, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/:id', bookCtrl.getOneBook);
router.get('/', bookCtrl.getAllBooks);

module.exports = router;
