const request = require("supertest");

const app = require("./../../../../app");

const director = {
    first_name: 'Inigo',
    last_name: 'Lopez'
};

const director_missing_first_name = {
    last_name: 'Lopez'
};

const director_missing_last_name = {
    first_name: 'Inigo'
};

describe('Director Controllers', () => {
    describe('Create Director',  () => {

        it('returns missing required fields', async () => {
            const response = await request(app).post('/api/v1/user/director').send(director_missing_first_name);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Missing required fields');
            expect(response.body.data).toBeNull();
        });

        it('returns missing required fields', async () => {
            const response = await request(app).post('/api/v1/user/director').send(director_missing_last_name);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Missing required fields');
            expect(response.body.data).toBeNull();
        });

        it('creates a new director', async () => {
            const response = await request(app).post('/api/v1/user/director').send(director);
            expect(response.body.data).toMatchObject(director);
        });
    });
})
