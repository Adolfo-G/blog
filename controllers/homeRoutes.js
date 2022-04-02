const router = require('express').Router();
const { Posts, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      title:'My Blog',
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  console.log("in profile route")
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Posts }],
    });
    const postData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const user = userData.get({ plain: true });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('profile', {
        title:'My DashBoard',
        posts,
      ...user,
      logged_in: true
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

router.get('/posts/:id', withAuth, async (req,res)=>{
  try{
  const newPost = await Posts.findByPk(req.params.id,{
    include:[{model:User},
    {model:Comment,
      include:[{
        model:User,
        required:true
      }]
    }],
  })
  const newUser = await User.findByPk(req.session.user_id,{
    attributes: { exclude: ['password'] },
  })
  const post = newPost.get({plain:true})
  const user = newUser.get({plain:true})
console.log(post)

  res.render('postInfo',{
    user,
    post,
    logged_in: true,
  })
  }catch(err){
    res.status(500).json(err);
  }
})

module.exports = router;
