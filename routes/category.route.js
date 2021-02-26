const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category.controller");

const categoryController = new CategoryController();

router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.removeCategoryById);

module.exports = router;
