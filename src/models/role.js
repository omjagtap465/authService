'use strict';
const {
  Model
} = require('sequelize');
// const {User} = require('./index')
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.belongsToMany(models.User, { through: 'User_Roles' });
      
    }
  }
  Role.init({
    name:  {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};