const getCategories = async () => {
  try {
    const data = await fetch("http://localhost:8000/api/categories");
    if (!data.ok) {
      console.log(data.statusText);
      throw Error(data.statusText);
    }
    const res = await data.json();
    return res;
  } catch (err) {
    throw Error(err);
  }
};

const categoryService = {
  getCategories,
};

export default categoryService;