import { Request, Server } from 'miragejs';
import Schema from 'miragejs/orm/schema';
import { Hero } from '../../../app/models/hero.entity';

/**
 * Register Heroes routes with MirageJS server
 *
 * @param server MirageJS mock server
 * @param baseApiUrl Heroes API base URL
 */
export function registerHeroesRoutes(server: Server, baseApiUrl: string): void {
  server.get(`${baseApiUrl}`);

  server.patch(
    `${baseApiUrl}/:id`,
    (schema: Schema<Partial<Hero>>, request: Request): Hero => {
      const id = request.params.id;
      const hero = schema['heroes'].find(id);
      const updatedValues = JSON.parse(request.requestBody);

      for (const property of Object.keys(hero.attrs)) {
        if (updatedValues.hasOwnProperty(property)) {
          hero.update(property, updatedValues[property]);
        }
      }

      return hero;
    },
  );

  server.post(
    `${baseApiUrl}`,
    (schema: Schema<Partial<Hero>>, request: Request): Hero => {
      const hero: Hero = JSON.parse(request.requestBody);

      return schema['heroes'].create(hero);
    },
  );
}
