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

  PostCategory.associate = ({BlogPost, Category}) => {
   BlogPost.belongsToMany(Category, {
    as: 'categories',
    through: PostCategory,
    foreignKey: 'categoryId',
    otherKey: 'postId',
   });
   Category.belongsToMany(BlogPost, {
    as: 'blogposts',
    through: PostCategory,
    foreignKey: 'postId',
    otherKey: 'categoryId',
   })
  };

  return PostCategory;
}