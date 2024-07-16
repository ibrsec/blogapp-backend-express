//--------- MODEL IMPORTS
const { BlogCategory, BlogPost } = require("../models/blogModels");

module.exports.blogCategoryController = {
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a new blog category
 *     tags:
 *       - Categories
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '201':
 *         description: New category is created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: New category is created!
 *                 result:
 *                   $ref: '#/components/schemas/BlogCategory'
 *       '400':
 *         description: Bad request, category name is required or category already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category Name is a required field!
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *     description: Use Bearer Authentication with a valid access token
 */
  create: async (req, res) => {
    const { name } = req.body;
    if (!name) {
      res.status(400);
      throw new Error("Category Name is a required filed!");
    }
    const catAvaliable = await BlogCategory.findOne({ name });
    if (catAvaliable) {
      res.status(400);
      throw new Error("Category is exist!");
    }

    const newCategory = await BlogCategory.create(req.body);

    res.status(201).json({
      error: false,
      message: "New category is created!",
      result: newCategory,
    });
  },
  /**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all blog categories
 *     tags:
 *       - Categories
 *     responses:
 *       '200':
 *         description: Successful operation, returns list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Categories are listed!
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BlogCategory'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

  list: async (req, res) => {
    const categories = await BlogCategory.find();
    res.status(200).json({
      error: false,
      message: "Categories are listed!",
      result: categories,
    });
  },
  /**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a blog category by ID
 *     tags:
 *       - Categories
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       '202':
 *         description: Category is updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Category is updated!
 *                 result:
 *                   $ref: '#/components/schemas/BlogCategory'
 *       '400':
 *         description: Bad request, category name is required for update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category Name is required field for update!
 *       '404':
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category not found!
 *       '500':
 *         description: Internal server error, updating failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Updating is Failed!
 */

  update: async (req, res) => {
    const { name } = req.body;
    if (!name) {
      res.status(400);
      throw new Error("Category Name is required field for update!");
    }

    const category = await BlogCategory.findById(req.params.id);

    if (!category) {
      res.status(404);
      throw new Error("Category not found!");
    }

    const updatedCategory = await BlogCategory.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );

    if (!updatedCategory) {
      res.status(500);
      throw new Error("Updating is Failed!");
    }

    res.status(202).json({
      error: false,
      message: "Category is updated!",
      result: updatedCategory,
    });
  },
  /**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a blog category by ID
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to delete
 *     responses:
 *       '204':
 *         description: Category is successfully deleted
 *       '404':
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category not found!
 *       '500':
 *         description: Internal server error, deletion failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Delete is failed!
 */

  delete: async (req, res) => {
    const category = await BlogCategory.findById(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error("Category not found!");
    }

    const isDeleted = await BlogCategory.deleteOne({ _id: req.params.id });
    console.log("################## ", isDeleted);
    if (isDeleted?.deletedCount < 1) {
      res.status(500);
      throw new Error("Delete is failed!");
    }
    res.sendStatus(204);
  },
  /**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a blog category by ID
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to retrieve
 *     responses:
 *       '200':
 *         description: Category found and returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Your Category is here!
 *                 result:
 *                   $ref: '#/components/schemas/BlogCategory'
 *       '404':
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category not Found!
 */

  readOne: async (req, res) => {
    const category = await BlogCategory.findById(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error("Category not Found!");
    }

    res.status(200).json({
      error: false,
      message: "Your Category is here!",
      result: category,
    });
  },
};

module.exports.blogPostController = {
  /**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog post
 *     tags:
 *       - Blogs
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - categoryId
 *               - title
 *               - content
 *     responses:
 *       '201':
 *         description: Blog post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: A new blog post is created!
 *                 result:
 *                   $ref: '#/components/schemas/BlogPost'
 *       '400':
 *         description: Bad request, all fields (categoryId, title, content) are mandatory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: All fields are mandatory!
 *       '404':
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Category not Found!
 *       '500':
 *         description: Internal server error, new blog post creation failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: New blog could not be created! Issue at last step - clould't wrote to db!
 */

  create: async (req, res) => {
    const { categoryId, title, content } = req.body;
    if (!categoryId || !title || !content) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }

    const categoryAvaliable = await BlogCategory.findById(categoryId);
    // console.log('categoryAvaliable =',categoryAvaliable);
    if (!categoryAvaliable) {
      res.status(404);
      throw new Error("Category not Found!");
    }

    const newBlog = await BlogPost.create({ userId: req.userId, ...req.body });

    // console.log('newBlog =', newBlog);
    if (!newBlog) {
      res.status(500);
      throw new Error("New blog could not be created!", {
        cause: "Issue at last step - clould't wrote to db!",
      });
    }

    res.status(201).json({
      error: false,
      message: "A new blog post is created!",
      result: newBlog,
    });
  },
  /**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get a list of all blog posts
 *     tags:
 *       - Blogs
 *     responses:
 *       '200':
 *         description: List of blogs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Blogs are listed!
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BlogPost'
 */

  list: async (req, res) => {
    const blogList = await BlogPost.find();

    res.status(200).json({
      error: false,
      message: "Blogs are listed!",
      result: blogList,
    });
  },
  /**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog post to retrieve
 *     responses:
 *       '200':
 *         description: Blog post found and returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Selected blog is here!
 *                 result:
 *                   $ref: '#/components/schemas/BlogPost'
 *       '404':
 *         description: Blog post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Blog not Found!
 */

  readOne: async (req, res) => {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not Found!");
    }

    res.status(200).json({
      error: false,
      message: "Selected blog is here!",
      result: blog,
    });
  },
  /**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Update a blog post by ID
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - categoryId
 *               - title
 *               - content
 *     responses:
 *       '200':
 *         description: Blog post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Selected blog is updated!
 *                 result:
 *                   $ref: '#/components/schemas/BlogPost'
 *       '400':
 *         description: Bad request, all fields (categoryId, title, content) are mandatory
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: All fields are mandatory!
 *       '404':
 *         description: Blog post or category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Blog or Category not Found!
 *       '500':
 *         description: Internal server error, blog post update failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Blog could not be updated! Issue at last step!
 */

  update: async (req, res) => {
    const { categoryId, title, content } = req.body;
    if (!categoryId || !title || !content) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }

    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found!");
    }

    const categoryAvaliable = await BlogCategory.findById(categoryId);
    // console.log('categoryAvaliable =',categoryAvaliable);
    if (!categoryAvaliable) {
      res.status(404);
      throw new Error("Category not Found!");
    }

    const updatedBlog = await BlogPost.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedBlog) {
      res.status(500);
      throw new Error("Blog could not be updated!", {
        cause: "Issue at last step!",
      });
    }

    // console.log('updatedBlog =', updatedBlog)
    res.status(200).json({
      error: false,
      message: "Selected blog is updated!",
      result: updatedBlog,
    });
  },
  /**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     tags:
 *       - Blogs
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the blog post to delete
 *     responses:
 *       '204':
 *         description: Blog post deleted successfully
 *       '404':
 *         description: Blog post not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Blog not found!
 *       '500':
 *         description: Internal server error, blog post deletion failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Blog could not be deleted! Issue at last step!
 */

  delete: async (req, res) => {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found!");
    }

    const isDeleted = await BlogPost.deleteOne({ _id: req.params.id });
    // console.log("isDeleted =", isDeleted);
    if (isDeleted?.deletedCount < 1) {
      res.status(500);
      throw new Error("Blog could not be deleted!", {
        cause: "Issue at last step!",
      });
    }

    res.sendStatus(204);
  },
};


