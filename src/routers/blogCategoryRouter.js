
//---------------- ROUTER
const router = require('express').Router();

//---------------- import controller
const {blogCategoryController} = require('../controllers/blogControllers');
const validateToken = require('../middlewares/validateTokenhandler');


router.route("/").get(blogCategoryController.list)
router.route("/").post(validateToken,blogCategoryController.create)
router.route("/:id").get(blogCategoryController.readOne)
router.route("/:id").put(validateToken,blogCategoryController.update)
router.route("/:id").delete(validateToken,blogCategoryController.delete)


module.exports = router;