module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      loginId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING(20),
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  User.associate = (db) => {
    db.User.hasMany(db.Post, { foreignKey: "userId", sourceKey: "userId" });
    db.User.hasMany(db.Comment, { foreignKey: "userId", sourceKey: "userId" });
    db.User.belongsToMany(db.User, {
      through: "Follows",
      as: "followers",
      foreignKey: "followingId",
      targetKey: "userId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follows",
      as: "followings",
      foreignKey: "followerId",
      targetKey: "userId",
    });
    db.User.belongsToMany(db.Post, {
      through: "Likes",
      as: "liked",
      foreignKey: "userId",
      otherKey: "postId",
    });
  };

  return User;
};

//User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId', otherKey: 'projectId'})
// Project.belongsToMany(User, {through: 'UserProject'});
// User.belongsToMany(Project, {through: 'UserProject'});
