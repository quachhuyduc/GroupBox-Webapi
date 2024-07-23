// routes/index.js (hoặc mainRouter.js)
const express = require('express');
const router = express.Router();
const UserRouter = require('./userRouter');
const TaskRouter = require('./taskRouter');
const GroupRouter = require('./groupRouter');
const CommentRouter = require('./commentRouter');

router.use('/user', UserRouter);
router.use('/task', TaskRouter);
router.use('/group', GroupRouter);
router.use('/comment', CommentRouter)

module.exports = router;
