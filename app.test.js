const request = require('supertest');
const app = require('./app');

test('should return mean', async () => {
    const response = await request(app)
        .get('/mean?nums=1,2,3,4')
        .expect('Content-Type', /json/)
        .expect(200);

    expect(response.body).toEqual({
        operation: 'mean',
        value: 2.5
    });
});

test('should return median', async () => {
    const response = await request(app)
        .get('/median?nums=1,2,3,4,5')
        .expect('Content-Type', /json/)
        .expect(200);

    expect(response.body).toEqual({
        operation: 'median',
        value: 3
    });
});

test('should return mode', async () => {
    const response = await request(app)
        .get('/mode?nums=1,2,2,3')
        .expect('Content-Type', /json/)
        .expect(200);

    expect(response.body).toEqual({
        operation: 'mode',
        value: [2]
    });
});