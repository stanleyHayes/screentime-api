const request = require("supertest");

const app = require("./../../../../app");

let director = {
    first_name: 'Inigo',
    last_name: 'Lopez'
};

const director_missing_first_name = {
    last_name: 'Lopez'
};

const director_missing_last_name = {
    first_name: 'Inigo'
};

const update_director_all_fields = {
    first_name: "Userma'atre",
    last_name: "Setepenre"
};


const update_director_first_name = {
    first_name: "Joseph"
};


const update_director_last_name = {
    last_name: "Stalin"
}

let existingId;
const nonExistentId = '6320d7cbb7b1bc7c02a4ee15';

describe('Director Controllers', () => {
    describe('Create Director',  () => {

        it('should return missing required fields', async () => {
            const response = await request(app).post('/director').send(director_missing_first_name);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Missing required fields');
            expect(response.body.data).toBeNull();
        });

        it('should return missing required fields', async () => {
            const response = await request(app).post('/director').send(director_missing_last_name);
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Missing required fields');
            expect(response.body.data).toBeNull();
        });

        it('should create a new director', async () => {
            const response = await request(app).post('/director').send(director);
            existingId = response.body.data._id;
            expect(response.body.data).toMatchObject(director);
            expect(response.status).toBe(201);
        });
    });

    describe('Find director', () => {
        it('should find a director with valid id', async () => {
            const response = await request(app).get(`/director/${existingId}`).send();
            expect(response.body.data).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.data).toMatchObject(director);
        });

        it('should find a director with invalid id', async () => {
            const response = await request(app).get(`/director/${nonExistentId}`).send();
            expect(response.body.data).toBeNull();
            expect(response.status).toBe(404);
        });
    });


    describe('Update director', () => {
        it('should update a director with existing director id and all fields', async () => {
            const response = await request(app).put(`/director/${existingId}`).send(update_director_all_fields);
            director = response.body.data;
            expect(response.body.data).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.data.first_name).toBe(update_director_all_fields.first_name);
            expect(response.body.data.last_name).toBe(update_director_all_fields.last_name);
        });

        it('should update a director with existing director id and first_name', async () => {
            const response = await request(app).put(`/director/${existingId}`).send(update_director_first_name);
            director = response.body.data;
            expect(response.body.data).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.data.first_name).toBe(update_director_first_name.first_name);
            expect(response.body.data.last_name).toBe(director.last_name);
        });


        it('should update a director with existing director id and last_name', async () => {
            const response = await request(app).put(`/director/${existingId}`).send(update_director_last_name);
            director = response.body.data;
            expect(response.body.data).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.data.last_name).toBe(update_director_last_name.last_name);
            expect(response.body.data.first_name).toBe(director.first_name);
        });


        it('should find a director with invalid id', async () => {
            const response = await request(app).get(`/director/${nonExistentId}`).send();
            expect(response.body.data).toBeNull();
            expect(response.status).toBe(404);
        });
    });


    describe('Get directors', () => {
        it('should retrieved directors in the database', async () => {
            const response = await request(app).get('/directors/').send();
            expect(response.status).toBe(200);
            expect(response.body.data).toBeDefined();
        });
    });
})
