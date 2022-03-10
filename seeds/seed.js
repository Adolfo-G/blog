const sequelize = require('../config/connection');
const { User, Posts, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData=require('./commentsData.json')
const seedDatabase = async () => {
    await sequelize.sync({force:true});
    
    const users = await User.bulkCreate(userData,{
        individualHooks:true,
        returning:true,
    });
    const posts = await Posts.bulkCreate(postData);
    const comment = await Comment.bulkCreate(commentData);

    process.exit(0);
};

seedDatabase();