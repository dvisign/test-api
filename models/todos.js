const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Todos extends Model {
  static init(sequelize) {
    return super.init(
      {
        wr_name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        todo_contents: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
      },
      {
        modelName: "Todos",
        tableName: "todos",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Todos.hasMany(db.Todos, {
      as: "User",
      foreignKey: "id",
      onDelete: "cascade",
      hooks: true,
    });
  }
};
