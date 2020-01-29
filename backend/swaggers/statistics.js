// ================================================ GET TASKS CREATED BY ONE USER ==============================================

/**
 * @swagger
 * /statistics/tasks:
 *   get:
 *     tags:
 *       - Statistics
 *     name: Get user created tasks
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