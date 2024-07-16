const getCategories = async () => {
    try {
      const data = await fetch(
        "https://ix-blog-app-2d5c689132cd.herokuapp.com/api/categories"
      );
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