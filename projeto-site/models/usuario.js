'use strict';

//const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    let Usuario = sequelize.define('Usuario',{		
		nome: {
			type: DataTypes.STRING,
			allowNull: false
		},
		login: {
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, 
	{
		tableName: 'usuario', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Usuario;
};
