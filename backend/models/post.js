"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Post.belongsTo(models.User, {
        allowNull: false,
        foreignKey: "idUSERS",
        onDelete: 'cascade',
        hooks: true,
      });
    }
  }
  Post.init(
    {
      idUSERS: DataTypes.INTEGER,
      title: {
        type: DataTypes.STRING,
        defaultValue: "Picture only",
      },
      content: {
        type: DataTypes.STRING,
        defaultValue: "Picture only",
      },
      image: DataTypes.STRING,
      isLike: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
