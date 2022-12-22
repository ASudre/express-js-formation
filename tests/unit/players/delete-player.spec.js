const { deletePlayer } = require("../../../src/api/players/controller");
const { getDao } = require("../../setupTests");
const { DB_COLLECTION } = require('../../../src/constants')

describe('unit', () => {
  describe('players', () => {
    describe('delete-player', () => {
      it('should delete the player with the id in params', async () => {
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
            id: player._id.toString(),
          },
          dao
        }
        const mockSendStatus = jest.fn();
        const res = {
          sendStatus: mockSendStatus
        }

        // When
        await deletePlayer(req, res);

        //Then
        expect(mockSendStatus).toBeCalledTimes(1);
        expect(mockSendStatus).toBeCalledWith(204);
        const findDeleted = await dao(DB_COLLECTION).findOne({ _id: player._id });
        expect(findDeleted).toBeNull();
      });
    });
  });
});