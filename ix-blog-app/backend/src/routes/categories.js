const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categoryController");

router.post("/", (req, res) => {
    categoriesController.createCategory(req, res);
});

router.get("/", (req, res) => {
    categoriesController.getCategories(req, res);
});

router.put("/:categoryId", (req, res) => {
    categoriesController.updateCategoryById(req, res);
});

router.delete("/:categoryId", (req, res) => {
    categoriesController.deleteCategoryById(req, res);
});

module.exports = router;