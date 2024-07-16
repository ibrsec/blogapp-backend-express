const mongoose = require("mongoose");

const BlogCategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Category Name is a required filed!"],
      unique:true,
    },
  },
  {
    collection: "blogCategories",
    timestamps: true,
  }
);

const BlogPostSchema = mongoose.Schema(
  {
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"users",
      required:[true,'UserId is a required filed!']
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogCategories",
      required: [true, "CategoryId is a required filed!"],
      //unique:true // ono to one realtion
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Post title is a required field!"],
    },
    content: {
      type: String,
      trim: true,
      required: [true, "Post content is a required field!"],
    },
  },
  {
    collection: "blogPosts",
    timestamps: true,
  }
);

module.exports = {
  BlogCategory: mongoose.model("BlogCategory", BlogCategorySchema),
  BlogPost: mongoose.model("BlogPost", BlogPostSchema),
};
