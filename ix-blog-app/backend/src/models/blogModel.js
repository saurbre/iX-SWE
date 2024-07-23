const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    categoryIds: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: "Category",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://storage.googleapis.com/ix-blog-app/default.jpeg",
    },
    content: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

blogSchema.method("toJSON", function () {
  const { __v, _id, categoryIds:categories, author, ...object } = this.toObject();
  object.id = _id;
  object.author = author;
  object.categories = categories.map((category) => {
    return {
      id: category._id,
      title: category.title,
      description: category.description,
      color: category.color,
    };
  });
  return object;
});

module.exports = mongoose.model("Blog", blogSchema);