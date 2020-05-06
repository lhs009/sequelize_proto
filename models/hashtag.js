module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    'hashtag',
    {
      hashtagId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.fn('NOW'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.fn('NOW'),
      },
    },
    {
      tableName: 'hashtags',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );

  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, {
      through: 'postHashtags',
      foreignKey: 'hashtagId',
      otherKey: 'postId',
    });
  };

  return Hashtag;
};
