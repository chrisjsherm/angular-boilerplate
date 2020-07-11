import { Server } from 'miragejs';

/**
 * Register Heroes routes with MirageJS server
 *
 * @param server MirageJS mock server
 * @param baseApiUrl Heroes API base URL
 */
export function registerHeroesRoutes(server: Server, baseApiUrl: string): void {
  server.get(`${baseApiUrl}`);
}
