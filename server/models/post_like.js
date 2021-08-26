'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class post_like extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	post_like.init(
		{
			like_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'post_like',
		},
	);
	return post_like;
};
