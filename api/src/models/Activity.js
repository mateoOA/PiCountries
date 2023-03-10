const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"activity",
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			difficulty: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					menor(value) {
						if (value > 6 || value < 1)
							throw new Error("Value must be between 1 y 5");
					},
				},
			},
			duration: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					menor(value) {
						if (value > 25 || value < 1)
							throw new Error("Value must be between 1 y 24");
					},
				},
			},
			season: {
				type: DataTypes.ENUM("summer", "autumn", "winter", "spring"),
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};
