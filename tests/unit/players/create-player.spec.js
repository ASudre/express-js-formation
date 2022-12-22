const { createPlayer } = require("../../../src/api/players/controller");
const { getDao } = require("../../setupTests");
const { DB_COLLECTION } = require('../../../src/constants')

describe('unit', () => {
	describe('players', () => {
		describe('create-player', () => {
			it('Should create new player', async () => {
				// Given
				const dao = getDao();
				const player = {
					firstName: "Raphaelle",
					lastName: "Varane",
					age: 29,
					position: "DEFENDER",
					ligue1: false,
				};
				const req = {
					body: player,
					dao
				}

				const mockSend = jest.fn();
				const mockStatus = jest.fn();
				mockStatus.mockReturnValue({ send: mockSend });

				const res = {
					status: mockStatus,
				}

				// When
				await createPlayer(req, res);

				// Then
				expect(mockSend).toBeCalledTimes(1);
				expect(mockStatus).toBeCalledTimes(1);
				expect(mockStatus.mock.calls[0][0]).toEqual(200);
				const findInserted = await dao(DB_COLLECTION).findOne({ _id: player._id })
				expect(findInserted).toEqual(player);
			});
		});
	});
});

