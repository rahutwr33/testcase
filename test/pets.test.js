const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

describe('pets', () => {
  it('should fail to create a pets without a name', async () => {
    const res = await request(app).post('/pets').send({
      age: '16',
      colour: "black"
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });

  it('should create a pets', async () => {
    const user = {
      name: 'Tommy',
      age: 16,
      colour: 'white',
    };
    const res = await request(app).post('/pets').send(user);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(user.name);
    expect(res.body.age).to.equal(user.age);
    expect(res.body.color).to.equal(user.color);
  });
});