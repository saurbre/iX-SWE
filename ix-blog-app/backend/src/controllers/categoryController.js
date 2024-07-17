const createCategory = (reg, res) => {
    res.json({message: "Category created", data: []})
}

const getCategories = (reg, res) => {
    res.json({message: "Categories fetched", data: []})
}

const getCategoryById = (reg, res) => {
    res.json({message: "Category fetched", data: []})
}

const updateCategoryById = (reg, res) => {
    res.json({message: "Category updated by id", data: []})
}

const deleteCategoryById = (reg, res) => {
    res.json({message: "Category deleted by id", data: []})
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
}