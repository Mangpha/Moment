'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.addColumn('Comments', 'post_id', Sequelize.INTEGER);
		await queryInterface.addConstraint('Comments', {
			fields: ['post_id'],
			type: 'foreign key',
			name: 'postid_fk_comment',
			references: {
				table: 'Posts',
				field: 'id',
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
		await queryInterface.addColumn('Comments', 'comment_userid', Sequelize.INTEGER);
		await queryInterface.addConstraint('Comments', {
			fields: ['comment_userid'],
			type: 'foreign key',
			name: 'userid_fk_comment',
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
		await queryInterface.removeConstraint('Comments', 'postid_fk_comment');
		await queryInterface.removeColumn('Comments', 'post_id');
		await queryInterface.removeConstraint('Comments', 'userid_fk_comment');
		await queryInterface.removeColumn('Comments', 'comment_userid');
	},
};
