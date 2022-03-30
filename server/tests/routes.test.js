const request = require('supertest');
const router = require('../app');

test('get Home page', (done) => {
  request(router)
    .get('/')
    .expect(200)
    .end((err) => {
      if (err) return done(err);
      return done();
    });
});
