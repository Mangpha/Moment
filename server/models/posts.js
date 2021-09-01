'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Posts extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			models.Posts.belongsTo(models.Users, { foreignKey: 'user_id' });
			models.Posts.hasMany(models.post_like, { foreignKey: 'post_id' });
			models.Posts.hasMany(models.Comment, { foreignKey: 'post_id' });
		}
	}
	Posts.init(
		{
			title: DataTypes.STRING,
			content: DataTypes.TEXT,
			secret: DataTypes.BOOLEAN,
			like_count: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Posts',
		},
	);
	return Posts;
};
