'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.addColumn('post_likes', 'post_id', Sequelize.INTEGER);
		await queryInterface.addConstraint('post_likes', {
			fields: ['post_id'],
			type: 'foreign key',
			name: 'post_fk_postLike',
			references: {
				table: 'Posts',
				field: 'id',
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
		await queryInterface.addColumn('post_likes', 'user_id', Sequelize.INTEGER);
		await queryInterface.addConstraint('post_likes', {
			fields: ['user_id'],
			type: 'foreign key',
			name: 'user_fk_postLike',
			references: {
				table: 'Users',
				field: 'id',
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		await queryInterface.removeConstraint('post_likes', 'post_fk_postLike');
		await queryInterface.removeColumn('post_likes', 'post_id');
		await queryInterface.removeConstraint('post_likes', 'user_fk_postLike');
		await queryInterface.removeColumn('post_likes', 'user_id');
	},
};
