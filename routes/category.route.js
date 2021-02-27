const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");
const verifyToken = require("../middleware/verification.middleware");
const categoryController = new CategoryController();

router.use(verifyToken);

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.removeCategoryById);

module.exports = router;
