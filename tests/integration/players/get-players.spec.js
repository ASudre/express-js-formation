const request = require('supertest');

const { getDao, getInstanceName } = require('../../setupTests');

const app = require('../../../src/app');
const { DB_COLLECTION } = require('../../../src/constants');

describe('integration', () => {
  describe('players', () => {
    describe('get-players', () => {
      it('should return the player with the id the url', async () => {
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

        // When
        const resp = await request(app)
          .get(`/players/${player._id.toString()}`)
          .set('X-IB-Instance', getInstanceName())
          .send();

        // Then
        expect(resp.status).toEqual(200);
        expect(resp.body).toEqual({
          ...player,
          _id: player._id.toString(),
        });
      });
    });
  });
});