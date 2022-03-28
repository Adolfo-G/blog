const router = require('express').Router();
const { Comment, Posts, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  console.log('in post routes')
  try {
    const postUserId = await Posts.findOne(req.body,{
        where:{
            title:req.body.title,
            user_id:req.body.postUserId,
        }
    })
    const newComment = await Comment.create({
      content:req.body.comment,
      post_id:postUserId.id,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
