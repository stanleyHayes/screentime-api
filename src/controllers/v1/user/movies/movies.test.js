const request = require("supertest");
const app = require("./../../../../app");

let movie = {
    name: 'Utopia',
    release_year: 2013,
    director: '6320d7cbb7b1bc7c02a4ee12'
};

let movie_with_non_existent_director = {
    name: 'Utopia',
    release_year: 2013,
    director: '6320d7cbb7b1bc7c02a4ee13'
};

let movie_with_missing_fields_name = {
    release_year: 2013,
    director: '6320d7cbb7b1bc7c02a4ee12'
};

let movie_with_missing_fields_release_year = {
    name: 'Utopia',
    director: '6320d7cbb7b1bc7c02a4ee12'
};

let movie_with_missing_fields_director = {
    name: 'Utopia',
    release_year: 2013,
};

let update_movie_with_all_fields = {
    name: 'Utopia 2',
    release_year: 2022,
    director: '6320d7cbb7b1bc7c02a4ee12'
};

let update_movie_with_non_existent_director = {
    name: 'Utopia 2',
    release_year: 2022,
    director: '6320d7cbb7b1bc7c02a4ee13'
};

let update_movie_with_missing_fields_name = {
    release_year: 2020,
    director: '6320d7cbb7b1bc7c02a4ee12'
};

let update_movie_with_missing_fields_release_year = {
    name: 'Utopia 2',
    director: '6320d7cbb7b1bc7c02a4ee12'
};

let update_movie_with_missing_fields_director = {
    name: 'The Incredible 2',
    release_year: 2018,
};

let existingMovieId;
let nonExistingId = '6320d7cbb7b1bc7c02a4ee16';

describe('Movie Controllers', () => {

    describe('Create Movie', () => {
        it('should create a movie with all required fields', async () => {
            const response = await request(app).post('/movie').send(movie);
            existingMovieId = response.body.data._id;
            movie = response.body.data;
            expect(response.body.data).not.toBeNull();
            expect(response.status).toBe(201);
            expect(response.body.data).toMatchObject(movie);
        });

        it('should throw the error missing required fields (name)', async () => {
            const response = await request(app).post('/movie').send(movie_with_missing_fields_name);
            expect(response.body.data).toBeNull();
            expect(response.status).toBe(400);
        });

        it('should throw the error missing required fields (release_year)', async () => {
            const response = await request(app).post('/movie').send(movie_with_missing_fields_release_year);
            expect(response.body.data).toBeNull();
            expect(response.status).toBe(400);
        });

        it('should throw the error missing required fields (director)', async () => {
            const response = await request(app).post('/movie').send(movie_with_missing_fields_director);
            expect(response.body.data).toBeNull();
            expect(response.status).toBe(400);
        });

        it('should not create a movie with a non-existent director even with all required fields', async () => {
            const response = await request(app).post('/movie').send(movie_with_non_existent_director);
            expect(response.body.data).toBeNull();
            expect(response.status).toBe(400);
        });
    });

    describe('Update Movie', () => {
        it('should update a movie with existing movie id', async () => {
            const response = await request(app).put(`/movie/${existingMovieId}`).send(update_movie_with_all_fields);
            movie = response.body.data;
            expect(response.body.data).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.data).toMatchObject(movie);
        });

        it('should not update a movie with that does not exist', async () => {
            const response = await request(app).put(`/movie/${nonExistingId}`).send(update_movie_with_all_fields);
            expect(response.status).toBe(404);
            expect(response.body.data).toBeNull();
        });

        it('should only update supplied fields and other fields should remain unchanged (name)', async () => {
            const response = await request(app).put(`/movie/${existingMovieId}`).send(update_movie_with_missing_fields_name);
            movie = response.body.data;
            expect(response.status).toBe(200);
            expect(response.body.data.name).toBe(movie.name);
            expect(response.body.data.release_year).toBe(update_movie_with_missing_fields_name.release_year);
            expect(response.body.data.director._id).toBe(update_movie_with_missing_fields_name.director);
        });

        it('should only update supplied fields and other fields should remain unchanged (release_year)', async () => {
            const response = await request(app).put(`/movie/${existingMovieId}`).send(update_movie_with_missing_fields_release_year);
            movie = response.body.data;
            expect(response.status).toBe(200);
            expect(response.body.data).toMatchObject(movie);
            expect(response.body.data.name).toBe(update_movie_with_missing_fields_release_year.name);
            expect(response.body.data.director._id).toBe(update_movie_with_missing_fields_release_year.director);
        });

        it('should only update supplied fields and other fields should remain unchanged (director)', async () => {
            const response = await request(app).put(`/movie/${existingMovieId}`).send(update_movie_with_missing_fields_director);
            movie = response.body.data;
            expect(response.status).toBe(200);
            expect(response.body.data.release_year).toBe(update_movie_with_missing_fields_director.release_year);
            expect(response.body.data.name).toBe(update_movie_with_missing_fields_director.name);
        });
    });

    describe('Get Movie', () => {
        it('should retrieve a movie with existing movie', async () => {
            const response = await request(app).get(`/movie/${existingMovieId}`).send();
            expect(response.body.data).not.toBeNull();
            expect(response.status).toBe(200);
        });

        it('should populate director field in movie with director data', async () => {
            const response = await request(app).get(`/movie/${existingMovieId}`).send();
            expect(response.body.data).not.toBeNull();
            expect(response.status).toBe(200);
            expect(response.body.data.director).not.toBeNull();
        });

        it('should throw a 404 error with a non-existent movie', async () => {
            const response = await request(app).get(`/movie/${nonExistingId}`).send();
            expect(response.body.data).toBeNull();
            expect(response.status).toBe(404);
        });
    });

    describe('Get Movies', () => {
        it('should retrieve a list of movies', async () => {
            const response = await request(app).get('/movies').send();
            expect(response.body).not.toBeNull();
            expect(response.status).toBe(200);
        });
    });
});
