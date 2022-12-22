const { updatePlayer } = require("../../../src/api/players/controller");
const { getDao } = require("../../setupTests");
const { DB_COLLECTION } = require('../../../src/constants')

describe('unit', () => {
	describe('players', () => {
		describe('update-player', () => {
			it('Should update existing player', async () => {
				const dao = getDao();
				const player = {
					firstName: "Raphaelle",
					lastName: "Varane",
					age: 29,
					position: "DEFENDER",
					ligue1: false,
				};
				await dao(DB_COLLECTION).insertOne(player);
				const req = {
					params: {
						id: player._id,
					},
					body: { ...player, age: 22 },
					dao
				}

				const mockSend = jest.fn();
				const mockStatus = jest.fn();
				mockStatus.mockReturnValue({ send: mockSend });

				const res = {
					status: mockStatus,
				}

				// When
				await updatePlayer(req, res);

				// Then
				expect(mockSend).toBeCalledTimes(1);
				expect(mockStatus).toBeCalledTimes(1);
				expect(mockStatus.mock.calls[0][0]).toEqual(200);
				const findUpdated = await dao(DB_COLLECTION).findOne({ _id: player._id })
				expect(findUpdated).toEqual(mockSend.mock.calls[0][0]);
			})
		});
	});
});