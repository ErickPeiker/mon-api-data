module.exports = function(sequelize, DataTypes) {

  return sequelize.define('Widget', {
      id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      type: {
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
      gridPosition: {
          type: DataTypes.TEXT,
          allowNull: false,
          get: function () {
              return JSON.parse(this.getDataValue('value'));
          },
          set: function (value) {
              this.setDataValue('value', JSON.stringify(value));
          },
      },
      dashboardId: {
            type: DataTypes.UUID,
            allowNull: true,
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
      }
  }, {
    tableName: 'Widget'
  });
}
