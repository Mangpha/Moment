'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		// Add field
		await queryInterface.addColumn('Posts', 'user_id', Sequelize.INTEGER);

		// foreign key
		await queryInterface.addConstraint('Posts', {
			fields: ['user_id'],
			type: 'foreign key',
			name: 'posts_fk_userid',
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
		await queryInterface.removeConstraint('Posts', 'posts_fk_userid');
		await queryInterface.removeColumn('Posts', 'user_id');
	},
};
