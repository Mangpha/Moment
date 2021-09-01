'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					email: 'admin@gmail.com',
					nickname: 'Admin',
					password: 'nimdA123',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					email: 'clover@gmail.com',
					nickname: 'Clover',
					password: 'clover',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					email: 'moment@m0ment.be',
					nickname: 'Moment',
					password: 'moment',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{},
		);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('Users', null, {});
	},
};
