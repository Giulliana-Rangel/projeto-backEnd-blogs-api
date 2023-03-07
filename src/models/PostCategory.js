module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false,},
    categoryId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false,},
  },
    {
      timestamp: false,
      underscored: true,
      tableName: 'posts_categories',
  });

  PostCategory.associate = (models) => {
  models.BlogPost.belongsToMany(models.Category, 
  {
    as: 'categories',
    through: PostCategory,
    foreignKey: 'postId',
    otherKey: 'categoryId',
   });

   models.Category.belongsToMany(models.BlogPost,
    {
    as: 'blogposts',
    through: PostCategory,
    foreignKey: 'categoryId',
    otherKey: 'postId',
   })
  };

  return PostCategory;
}