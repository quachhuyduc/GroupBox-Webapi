// routes/index.js (hoặc mainRouter.js)
const express = require('express');
const router = express.Router();
const UserRouter = require('./userRouter');
const TaskRouter = require('./taskRouter');

router.use('/user', UserRouter);
router.use('/task', TaskRouter);

module.exports = router;
