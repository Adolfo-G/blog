const User = require('./User');
const Posts = require('./Posts');
const Comment = require('./comment');

Comment.belongsTo(User,{
    foreignKey:"user_id",
})

User.hasMany(Comment,{
    foreignKey:'user_id'
})

Posts.hasMany(Comment,{
    foreignKey:"post_id"
})

User.hasMany(Posts,{
    foreignKey:'user_id',
    onDelete:'CASCADE',
});

Posts.belongsTo(User,{
    foreignKey:'user_id'
});

module.exports= {User, Posts, Comment};