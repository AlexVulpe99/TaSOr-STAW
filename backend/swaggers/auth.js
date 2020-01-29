// ================================================ REGISTER ==============================================
/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Users
 *     name: Register
 *     summary: Register a new user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: _id is the email of the user
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - _id
 *           - password
 *     responses:
 *       '200':
 *         description: Register successful
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             message:
 *               type: string
 *             token:
 *               type: string      
 *       '400':
 *         description: Bad request/ _id not unique
 */


// ================================================ LOGIN ==============================================

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Login as user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: normal login with email and password
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: Login successful
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             message:
 *               type: string
 *             token:
 *               type: string      
 *       '403':
 *         description: Wrong password
 *       '404':
 *         description: Email not found
 */

// ================================================ GET USERS' EMAIL ==============================================

/**
 * @swagger
 * /auth/users:
 *   get:
 *     tags:
 *       - Users
 *     name: Get users' email
 *     summary: Return all emails of all users 
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       '200':
 *         description: An array of emails
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: array
 *               items:
 *                 type: string
 *       '401':
 *         description: No auth token / no user found in db with that name
 *       '403':
 *         description: User is not authentificated
 */