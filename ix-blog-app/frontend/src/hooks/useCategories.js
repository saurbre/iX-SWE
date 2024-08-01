import { useDispatch } from "react-redux";
import { deleteCategory, createCategory, updateCategory } from "../features/categorySlice";

const useCategories = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const createCategory = async (category) => {
    dispatch(createCategory(category));
  };

  const updateCategory = async (category) => {
    dispatch(updateCategory(category));
  };

  const deleteCategory = async (category) => {
    dispatch(deleteCategory(category));
  };

  return {
    createCategory,
    updateCategory,
    deleteCategory,
  };
}

export default useCategories;