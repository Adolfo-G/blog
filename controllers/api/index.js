const router = require('express').Router();
const userRoutes = require('./userRoutes');
const PostRoutes = require('./PostRoutes');
const CommentRoutes = require('./commentRoutes')

router.use('/users', userRoutes);
router.use('/posts', PostRoutes);
router.use('/comments', CommentRoutes);

module.exports = router;