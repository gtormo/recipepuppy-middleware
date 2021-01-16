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
      it(`POST ${baseUrl}`, async (): Promise<void> => {
        const response: Response = await request.post(`${baseUrl}/signup`).send({
          email: 'gonzalo@gmail.com',
          password: 'HolaMundo123.'
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'user created successfully' });
      });
    });
  });
};
