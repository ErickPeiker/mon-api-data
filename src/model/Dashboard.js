module.exports = function(sequelize, DataTypes) {

  return sequelize.define('Dashboard', {
      id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false
      },
      active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          default: false,
      },
      companyId: {
          type: DataTypes.UUID,
          allowNull: true,
      },
      userId: {
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
    tableName: 'Dashboard'
  });
}
