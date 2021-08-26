'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		await queryInterface.addColumn('follows', 'follower', Sequelize.INTEGER);
		await queryInterface.addConstraint('follows', {
			fields: ['follower'],
			type: 'foreign key',
			name: 'fk_follower',
			references: {
				table: 'Users',
				field: 'id',
			},
			onDelete: 'cascade',
			onUpdate: 'cascade',
		});
		await queryInterface.addColumn('follows', 'followee', Sequelize.INTEGER);
		await queryInterface.addConstraint('follows', {
			fields: ['followee'],
			type: 'foreign key',
			name: 'fk_followee',
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
		await queryInterface.removeConstraint('follows', 'fk_follower');
		await queryInterface.removeColumn('follows', 'follower');
		await queryInterface.removeConstraint('follows', 'fk_followee');
		await queryInterface.removeColumn('follows', 'followee');
	},
};
