const { getPlayer } = require("../../../src/api/players/controller");
const { getDao } = require("../../setupTests");
const { DB_COLLECTION } = require('../../../src/constants')

describe('unit', () => {
  describe('players', () => {
    describe('get-player', () => {
      it('should return the player with the id in params', async () => {
        // Given
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
          player,
          dao,
        }
        const mockSend = jest.fn();
        const mockStatus = jest.fn();
        mockStatus.mockReturnValue({ send: mockSend });

        const res = {
          status: mockStatus,
        };

        // When
        await getPlayer(req, res);

        // Then
        expect(mockSend).toBeCalledTimes(1);
        expect(mockStatus).toBeCalledTimes(1);
        expect(mockStatus.mock.calls[0][0]).toEqual(200);
        expect(mockSend.mock.calls[0][0]).toEqual(player);
      })
    });
  });
});