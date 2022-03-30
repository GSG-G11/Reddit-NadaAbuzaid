/* eslint-disable no-undef */
const { pool, dbBuild, getPostByIdQuery } = require('../database');

beforeEach(() => dbBuild());
afterAll(() => pool.end());

test('Test get post with invalid id', () =>
  getPostByIdQuery(2).then((data) => {
    expect(data.rowCount).toBe(1);
  }));
