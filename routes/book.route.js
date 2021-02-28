const express = require("express");
const router = express.Router();

const BookController = require("../controllers/book.controller");
const bookController = new BookController();

//router.use(verifyToken);

router.post("/", bookController.createBook);
router.get("/:id", bookController.getBookById);
router.get("/", bookController.getAllBooks);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.removeBookById);

module.exports = router;
