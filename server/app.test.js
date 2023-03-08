const each = require("jest-each").default;
const app = require('./app')
const request = require('supertest');
const users = require("./users");

describe("app", () => {

    it("Exists", () => {
        expect(app).toBeDefined();
    })
    it("It a function", ()=> {
        expect(app instanceof Function).toEqual(true);
    })
  
})

    describe('POST /login', () => {
        
                                    // Test for successful login with correct credentials
                                    it('responds with status 200 and high score for valid credentials', async () => {
                                        const response = await request(app)
                                        .post('/login')
                                        .send({ username: 'testuser', password: 'testpassword' });
                                        expect(response.status).toBe(200);
                                        expect(response.body.message).toBe('Login successful!');
                                        expect(response.body.highScore).toBe(users[0].highScore);
                                    });
                                    // Test for unsuccessful login with incorrect credentials
                                    it('responds with status 401 for invalid credentials', async () => {
                                        const response = await request(app)
                                        .post('/login')
                                        .send({ username: 'testuser', password: 'wrongpassword' });
                                        expect(response.status).toBe(401);
                                        expect(response.body.message).toBe('Invalid username or password.');
                                    });

                                    // Test for missing username or password
                                    it('responds with status 401 for missing username or password', async () => {
                                        const response = await request(app)
                                        .post('/login')
                                        .send({});
                                        expect(response.status).toBe(401);
                                        expect(response.body.message).toBe('Invalid username or password.');
                                    });

                                    // Test for missing username
                                    it('responds with status 401 for missing username', async () => {
                                        const response = await request(app)
                                        .post('/login')
                                        .send({ password: 'testpassword' });
                                        expect(response.status).toBe(401);
                                        expect(response.body.message).toBe('Invalid username or password.');
                                    });

                                    // Test for missing password
                                    it('responds with status 401 for missing password', async () => {
                                        const response = await request(app)
                                        .post('/login')
                                        .send({ username: 'testuser' });
                                        expect(response.status).toBe(401);
                                        expect(response.body.message).toBe('Invalid username or password.');
                                    });

                                    // Test for non-existing user
                                    it('responds with status 401 for non-existing user', async () => {
                                        const response = await request(app)
                                        .post('/login')
                                        .send({ username: 'nonexistinguser', password: 'testpassword' });
                                        expect(response.status).toBe(401);
                                        expect(response.body.message).toBe('Invalid username or password.');
                                    });
                    })

        describe('POST /signup', () => {
                        const existingUser = users[0];
                        const createUser = { username: 'newuser', password: 'newpassword', highScore: 0 };

                        beforeEach(() => {
                            // reset the user array before each test
                            users.length = 0;
                            users.push(existingUser);
                          });
                      
                        it('should create a new user with valid username and password', async () => {
                          const response = await request(app)
                            .post('/signup')
                            .send(createUser);
                            
                      
                          expect(response.status).toBe(201);
                          expect(response.body.message).toBe('Signup successful!');
                          expect(response.body.highScore).toBe(0);
                      
                          // check that the new user is added to the users array
                          const newUser = users.find(user => user.username === createUser.username);
                          expect(newUser).toEqual(createUser);
                        });
                      
                        it('should return an error if username or password is missing', async () => {
                          const response = await request(app)
                            .post('/signup')
                            .send({ username: 'testuser' });
                      
                          expect(response.status).toBe(400);
                          expect(response.body.message).toBe('Username and password are required.');
                        });
                      
                        it('should return an error if username is already taken', async () => {
                          const response = await request(app)
                            .post('/signup')
                            .send(existingUser);
                      
                          expect(response.status).toBe(409);
                          expect(response.body.message).toBe('Username already taken.');
                        });
                      });

                      describe('POST /submit-score', () => {
                        it('Should return the user highscore and not the new lower score', async () => {
                            const response = await request(app)
                              .post('/submit-score')
                              .send({ username: 'testuser', score: 0 });
                          
                            expect(response.status).toBe(200);
                            expect(response.body.message).toBe('Score submitted successfully.');
                            expect(response.body.score).toBe(5);
                          
                            const user = users.find(u => u.username === 'testuser');
                            expect(user.highScore).toBe(5);
                          });
                        it('Should submit a new highscore for an existing user', async () => {
                            const response = await request(app)
                            .post('/submit-score')
                            .send({ username: 'testuser', score: 10 });
                      
                          expect(response.status).toBe(200);
                          expect(response.body.message).toBe('Score submitted successfully.');
                          expect(response.body.score).toBe(10);
                      
                          const user = users.find(u => u.username === 'testuser');
                          expect(user.highScore).toBe(10);
                        });

                        it('should return a 404 error for an invalid user', async () => {
                            const response = await request(app)
                              .post('/submit-score')
                              .send({ username: 'invaliduser', score: 10 });
                        
                            expect(response.statusCode).toBe(404);
                            expect(response.body.message).toBe('User not found.');
                          });

                          
                    });
                    