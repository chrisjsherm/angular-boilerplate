import { random } from 'faker';
import { inflections } from 'inflected';
import { Model, RestSerializer, Server } from 'miragejs';
import { factory as heroFactory } from './factories/hero.factory';
import { registerConfigurationRoutes } from './routes/configurations.routes';
import { registerHeroesRoutes } from './routes/heroes.routes';

/**
 * Generate a MirageJS mock server that intercepts HTTP requests so we can
 * build, test, and share a complete JavaScript application without having to
 * rely on backend services
 *
 * @param configuration Injectable server configuration
 * @returns Initialized server
 */
export function makeServer(
  configuration: { environment: string } = {
    /**
     * test environment turns off Mirage's artificial latency,
     * ignores any initial seeds(), and disables logging to the console
     */
    environment: 'test',
  },
): Server {
  // Customize how MirageJS pluralizes words
  inflections(
    'en',
    (inflect: {
      irregular: (model: string, pluralized: string) => void;
    }): void => {
      inflect.irregular('hero', 'heroes');
    },
  );

  return new Server({
    environment: configuration.environment,

    models: {
      hero: Model,
    },

    factories: {
      hero: heroFactory,
    },

    serializers: {
      application: RestSerializer.extend({
        embed: true,
        root: false,
      }),
    },

    seeds(server: Server): void {
      server.createList('hero', random.number(50));
    },

    routes(): void {
      const baseApiUrl = 'http://localhost:8282/api/v1/heroes';

      registerConfigurationRoutes(this, baseApiUrl);
      registerHeroesRoutes(this, baseApiUrl);
    },
  });
}
