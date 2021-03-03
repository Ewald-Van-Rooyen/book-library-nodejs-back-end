const express = require("express");
const router = express.Router();
const AuthorController = require("../controllers/author.controller");
const verifyToken = require("../middleware/verification.middleware");
const authorController = new AuthorController();

// TODO complains about code re-use, refactor into one for all routes?

// Setup of verification middleware
router.use(verifyToken);

// Setup of CRUD functionality
router.post("/", authorController.createAuthor);
router.get("/", authorController.getAllAuthors);
router.get("/:id", authorController.getAuthorById);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.removeAuthorById);

module.exports = router;
