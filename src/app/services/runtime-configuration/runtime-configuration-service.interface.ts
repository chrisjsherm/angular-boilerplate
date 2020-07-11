import { Observable } from 'rxjs';

/**
 * Public API of RuntimeConfigurationService
 */
export interface IRuntimeConfigurationService {
  /**
   * Get the URL of the API for Hero information
   */
  getHeroesApiUrl(): Observable<string>;
}
