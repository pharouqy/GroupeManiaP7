'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.belongsToMany(models.Post, {
        through: models.Like,
        foreignKey: 'idUSERS',
      });
      models.Post.belongsToMany(models.User, {
        through: models.Like,
        foreignKey: 'idPOSTS',
      });
      models.Like.belongsTo(models.User, {
        foreignKey: "idPOSTS",
        as: "post",
      });
      models.Like.belongsTo(models.Post, {
        foreignKey: "idUSERS",
        as: "user",
      });
    }
  };
  Like.init({
    idUSERS: DataTypes.INTEGER,
    idPOSTS: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};