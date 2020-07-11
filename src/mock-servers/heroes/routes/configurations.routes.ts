import { Server } from 'miragejs';
import { RuntimeConfiguration } from '../../../app/services/runtime-configuration/runtime-configuration.interface';

/**
 * Register configuration routes with the MirageJS server
 *
 * @param server MirageJS mock server
 * @param baseApiUrl Base URL of the heroes API
 */
export function registerConfigurationRoutes(
  server: Server,
  baseApiUrl: string,
): void {
  server.get(
    '/runtime-configuration',
    (): RuntimeConfiguration => {
      return {
        heroesApiUrl: baseApiUrl,
      };
    },
  );
}
