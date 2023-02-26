const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "country",
    {
      id: {
        type: DataTypes.STRING(3),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No data",
      },
      flag: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No data",
      },
      continent: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No data",
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No data",
      },
      subRegion: {
        type: DataTypes.STRING,
      },
      area: {
        type: DataTypes.INTEGER,
      },
      population: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );
};
