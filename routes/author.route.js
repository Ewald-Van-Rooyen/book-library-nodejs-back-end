const express = require("express");
const router = express.Router();
const AuthorController = require("../controllers/author.controller");
const verifyToken = require("../middleware/verification.middleware");
const authorController = new AuthorController();

router.use(verifyToken);

router.post("/", authorController.createAuthor);
router.get("/", authorController.getAllAuthors);
router.get("/:id", authorController.getAuthorById);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.removeAuthorById);

module.exports = router;
