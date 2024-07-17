

const {authController} = require('../controllers/authController');
const validateToken = require('../middlewares/validateTokenhandler');
const router = require('express').Router();

router.route('/register').post(authController.register)
router.route('/login').post(authController.login)
router.route('/users').get(authController.getUsers)
router.route('/current').get(validateToken,authController.current)



module.exports = router;