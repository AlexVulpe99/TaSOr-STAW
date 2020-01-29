// ================================================ POST A NEW TASK ==============================================

/**
 * @swagger
 * /tasks:
 *   post:
 *     tags:
 *       - Tasks
 *     name: Post a new task
 *     summary: Post a new task in the 'tasks' collection
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: assignedUser should be an email
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             assignedUser:
 *               type: string
 *         required:
 *           - id
 *           - assignedUser
 *     responses:
 *       '200':
 *         description: Task created
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             message:
 *               type: string
 *       '400':
 *         description: Bad request
 *       '403':
 *         description: User is not authentificated
 */

// ================================================ GET TASKS FOR ONE USER ==============================================

/**
 * @swagger
 * /tasks:
 *   get:
 *     tags:
 *       - Tasks
 *     name: Get user tasks
 *     summary: Array of tasks for a user
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required:
 *           - email
 *     responses:
 *       '200':
 *         description: An array of tasks
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *       '400':
 *         description: Bad request
 *       '403':
 *         description: User is not authentificated
 */

// ================================================ UPDATE A SPECIFIC TASK ==============================================

/**
 * @swagger
 * /tasks:
 *   put:
 *     tags:
 *       - Tasks
 *     name: Update a task
 *     summary: Update a specific task querying the id of the task
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: idTask
 *         schema:
 *           type: string
 *         required:
 *           - idTask
 *     responses:
 *       '200':
 *         description: A boolean value
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *       '400':
 *         description: Bad request
 *       '403':
 *         description: User is not authentificated
 */


// ================================================ DELETE A SPECIFIC TASK ==============================================

/**
 * @swagger
 * /tasks:
 *   delete:
 *     tags:
 *       - Tasks
 *     name: Delete a task
 *     summary: Delete a specific task querying the id of the task
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: idTask
 *         schema:
 *           type: string
 *         required:
 *           - idTask
 *     responses:
 *       '200':
 *         description: A boolean value
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *       '400':
 *         description: Bad request
 *       '403':
 *         description: User is not authentificated
 */

// ================================================ GET INFORMATIONS OF A SINGLE TASK ==============================================

/**
 * @swagger
 * /tasks/task:
 *   get:
 *     tags:
 *       - Tasks
 *     name: Get task info
 *     summary: Get a specific task querying the id of the task
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: idTask
 *         schema:
 *           type: string
 *         required:
 *           - idTask
 *     responses:
 *       '200':
 *         description: The task info
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             data:
 *               type: object
 *       '400':
 *         description: Bad request
 *       '403':
 *         description: User is not authentificated
 */