module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Equipment', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    observation: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    parameters: {
      type: DataTypes.TEXT,
      allowNull: false,
      get: function () {
        return JSON.parse(this.getDataValue('value'));
       },
       set: function (value) {
         this.setDataValue('value', JSON.stringify(value));
       },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    companyId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    equipmentTypeId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  }, {
    tableName: 'Equipment'
  });
};
