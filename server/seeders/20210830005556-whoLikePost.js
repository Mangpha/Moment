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
			'post_likes',
			[
				{
					post_id: 1,
					user_id: 2,
				},
				{
					post_id: 1,
					user_id: 1,
				},
				{
					post_id: 2,
					user_id: 3,
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
	},
};
