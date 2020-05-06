module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'post',
    {
      postId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      retweetId: {
        type: DataTypes.INTEGER.UNSIGNED,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn('NOW'),
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn('NOW'),
        allowNull: false,
      },
    },
    {
      tableName: 'posts',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );

  Post.associate = (db) => {
    db.Post.belongsTo(db.User, {
      foreignKey: 'userId',
      targetKey: 'userId',
    });
    db.Post.hasMany(db.Comment, { foreignKey: 'postId', sourceKey: 'postId' });
    db.Post.hasMany(db.Image, { foreignKey: 'postId', sourceKey: 'postId' });
    db.Post.belongsTo(db.Post, {
      as: 'retweets',
      foreignKey: 'retweetId',
      sourceKey: 'postId',
    });
    db.Post.belongsToMany(db.User, {
      through: 'likes',
      as: 'likers',
      foreignKey: 'postId',
      otherKey: 'userId',
    });
    db.Post.belongsToMany(db.Hashtag, {
      through: 'postHashtags',
      foreignKey: 'postId',
      otherKey: 'hashtagId',
    });
  };

  return Post;
};
