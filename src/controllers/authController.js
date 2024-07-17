const { User } = require("../models/userModel");
const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authController = {
  /**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *     responses:
 *       '201':
 *         description: A new user is created
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
 *                   example: A new user is created!
 *                 result:
 *                   $ref: '#/components/schemas/User'
 *       '400':
 *         description: Bad request, missing fields or username/email already registered
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
 *                   example: Username or email is previously registered!
 */

  register: async (req, res) => {
    const { username, email, password } = req.body;
    if (!email || !username || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }

    const userAvaliable = await User.findOne({
      $or: [{ username }, { email }],
    });
    // console.log('userAvaliable = ', userAvaliable)
    if (userAvaliable) {
      res.status(400);
      throw new Error("Username or email is previously registered!");
    }

    
    // hashpassword
    const hashedPassword = await bcript.hash(password, 10);
    
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });


    res.status(201).json({
      error: false,
      message: "A new user is created!",
      result: newUser ,
    });
  },
  /**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate and login user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user
 *               password:
 *                 type: string
 *                 description: Password of the user
 *     responses:
 *       '200':
 *         description: User logged in successfully
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
 *                   example: Logined successfully!
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       '400':
 *         description: Bad request, missing username/email or password
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
 *                   example: Username or email and password is required for login!
 *       '401':
 *         description: Unauthorized, invalid username/email or password
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
 *                   example: Unauthorized - Invalid Password!
 */

  login: async (req, res) => {
    const { username, email, password } = req.body;
    if (!(username || email) || !password) {
      res.status(400);
      throw new Error("Username or email and password is required for login!");
    }

    let isPassed = {};
    let user;
    if (username) {
      const userAvaliable = await User.findOne({ username });
      console.log(userAvaliable);
      if (!userAvaliable) {
        res.status(404);
        throw new Error("Invalid Username or email!");
      }
      user = userAvaliable;
      user.type = username;
      isPassed = await bcript.compare(password, userAvaliable.password);
    } else if (email) {
      const userAvaliable = await User.findOne({ email });
      console.log(userAvaliable);
      if (!userAvaliable) {
        res.status(401);
        throw new Error("UnAuthorized - Invalid Username or email!");
      }

      user = userAvaliable;
      isPassed = await bcript.compare(password, userAvaliable.password);
    }

    if (isPassed) {
      const accessToken = jwt.sign(
        {
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
          },
        },
        process.env.ACCESSTOKEN_SECRETKEY,
        { expiresIn: "15m" }
      );

      res.status(200).json({
        error: false,
        message: "Logined successfully!",
        username:user.username,
        accessToken,
      });
    }else{
        res.status(401)
        throw new Error('Unauthorized - Invalid Password!')
    }


  },
  /**
 * @swagger
 * /current:
 *   get:
 *     summary: Get current user information
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Current user information retrieved successfully
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
 *                   example: Login is going on!
 *                 username:
 *                   type: string
 *                   example: johndoe
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       '401':
 *         description: Unauthorized, invalid or missing access token
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
 *                   example: Unauthorized - Invalid or missing access token
 */

  current: async (req, res) => {
    res.status(200).json({
        error:false,
        message:"Login is going on!",
        username:req.username,
        accessToken:req.accessToken,
    });
  },

  /**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users from the database. Returns an array of user objects.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users.
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
 *                   example: Users are listed!
 *                 result:
 *                   type: array
 *                   items:
 *                    $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errr:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: An error occurred while retrieving users.
 */
getUsers: async (req, res) => {
  const users = await User.find();
  res.status(200).json({
      errr: false,
      message: "Users are listed!",
      result: users,
  });
},

  getUsers: async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        error:false,
        message:"Users are listed!",
        result:users,
    });
  },
};
