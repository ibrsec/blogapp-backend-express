

const {blogPostController} = require('../controllers/blogControllers');
const validateToken = require('../middlewares/validateTokenhandler');
const router = require('express').Router();



router.get("/",blogPostController.list);




router.post("/",validateToken,blogPostController.create);
router.route("/:id").get(blogPostController.readOne).put(validateToken,blogPostController.update).delete(validateToken,blogPostController.delete);


module.exports = router;






  /**
   * 
   * /blogs:
   * get:
   *   summary: Get all users
   *   responses:
   *     '200':
   *       description: A list of users.
   *       content:
   *         application/json:
   *           schema:
   *             type: array
   *             items:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 name:
   *                   type: string
  
   */


