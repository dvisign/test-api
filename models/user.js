const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        mb_id: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: true,
        },
        mb_password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        modelName: "User",
        tableName: "user",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Todos, {
      as: "todos",
      foreignKey: "id",
      onDelete: "cascade",
      hooks: true,
    });
  }
};
