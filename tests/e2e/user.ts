// Modules
import supertest, { Test, SuperTest, Response } from 'supertest';
import { Server } from 'http';
import { app } from '../../app';

export const userTestSuite = (): void => {
  const baseUrl = '/user';

  describe(baseUrl, (): void => {
    let request: SuperTest<Test>;
    let server: Server;

    beforeAll((): void => {
      server = app.listen(8080);
      request = supertest(app);
    });

    afterAll((): void => {
      server.close();
    });

    describe('should not fail', (): void => {
      it(`POST ${baseUrl}/signup as normal user without isAdmin field`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/signup`).send({
          email: 'normal-user0@gmail.com',
          password: 'HolaMundo123.'
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'user created successfully' });
      });

      it(`POST ${baseUrl}/signup as admin user with isAdmin parameter`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/signup`).send({
          email: 'admin@gmail.com',
          password: 'HolaMundo123.',
          isAdmin: true
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'user created successfully' });
      });

      it(`POST ${baseUrl}/signup as normal user with isAdmin parameter`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/signup`).send({
          email: 'normal-user1@gmail.com',
          password: 'HolaMundo123.',
          isAdmin: false
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'user created successfully' });
      });
    });

    describe('should fail', (): void => {
      it(`POST ${baseUrl}/signup an existent user with same email`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/signup`).send({
          email: 'admin@gmail.com',
          password: 'HolaMundo123.',
          isAdmin: true
        });

        expect(response.status).toBe(413);
        expect(response.body).toEqual({ error: 'Account already registered' });
      });

      it(`POST ${baseUrl}/signup with {} email`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/signup`).send({
          email: {},
          password: 'HolaMundo123.',
          isAdmin: true
        });

        expect(response.status).toBe(413);
        expect(response.body).toEqual({ error: 'Email is not valid' });
      });

      it(`POST ${baseUrl}/signup with [] email`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/signup`).send({
          email: [''],
          password: 'HolaMundo123.',
          isAdmin: true
        });

        expect(response.status).toBe(413);
        expect(response.body).toEqual({ error: 'Email is not valid' });
      });

      it(`POST ${baseUrl}/signup with null email`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/signup`).send({
          password: 'HolaMundo123.',
          isAdmin: true
        });

        expect(response.status).toBe(413);
        expect(response.body).toEqual({ error: 'Email is not valid' });
      });

      it(`POST ${baseUrl}/signup with invalid email`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/signup`).send({
          email: 'admin@gmail',
          password: 'HolaMundo123.',
          isAdmin: true
        });

        expect(response.status).toBe(413);
        expect(response.body).toEqual({ error: 'Email is not valid' });
      });

      it(`POST ${baseUrl}/signup with invalid password`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/signup`).send({
          email: 'admin@gmail.com',
          password: 'Hola',
          isAdmin: true
        });

        expect(response.status).toBe(413);
        expect(response.body).toEqual({
          error: 'Password is not valid: min 8, max 100, uppercase, lowercase, digits and no spaces'
        });
      });

      it(`POST ${baseUrl}/signup with invalid isAdmin: string case`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/signup`).send({
          email: 'admin@gmail.com',
          password: 'HolaMundo123.',
          isAdmin: 'admin'
        });

        expect(response.status).toBe(413);
        expect(response.body).toEqual({
          error: 'invalid value for isAdmin field'
        });
      });
    });
  });
};
