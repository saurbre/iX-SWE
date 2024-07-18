const Category = require("../models/categoryModel");

const createCategory = async (req, res) => {
    try {
        const category = new Category ({
            title: req.body.title,
            description: req.body.description,
            color: req.body.color
        })
        const newCategory = await category.save();
        res.json({message: "Category created", data: newCategory})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({message: "Categories fetched", data: categories})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        if (category) {
          category.title = req?.body?.title || category.title;
          category.description = req?.body?.description || category.description;
          category.color = req?.body?.color || category.color;
          const updatedCategory = await category.save();
          res.status(200).json({ message: "Category updated!", data: updatedCategory });
        } else {
          res.status(404).json({ message: "Category not found!" });
        }
      } catch (error) {
        res.status(500).json({ message: error.message, data: [] });
      }
}

const deleteCategoryById = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.categoryId);
        if (category) {
            res.status(200).json({message: "Category deleted by id", data: []})
        } else {
            res.status(404).json({message: "Category not found!"})
        }
    } catch (error) {
        res.status(500).json({message: error.message, data: []})
    }
}

module.exports = {
    createCategory,
    getCategories,
    updateCategoryById,
    deleteCategoryById
}