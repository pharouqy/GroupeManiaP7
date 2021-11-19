"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Post, {
        through: models.Comment,
        foreignKey: "idUSERS",
      });
      models.Post.belongsToMany(models.User, {
        through: models.Comment,
        foreignKey: "idPOSTS",
      });
      models.Comment.belongsTo(models.User, {
        foreignKey: "idPOSTS",
        as: "post",
        onDelete: 'cascade',
        hooks: true,
      });
      models.Comment.belongsTo(models.Post, {
        foreignKey: "idUSERS",
        as: "user",
        onDelete: 'cascade',
        hooks: true,
      });
    }
  }
  Comment.init(
    {
      idUSERS: DataTypes.INTEGER,
      idPOSTS: DataTypes.INTEGER,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
