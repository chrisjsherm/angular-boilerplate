import { Injectable, Provider } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IRuntimeConfigurationService } from '../runtime-configuration-service.interface';
import { RuntimeConfigurationService } from '../runtime-configuration.service';

/**
 * Use in tests in place of RuntimeConfigurationService to avoid making actual
 * HTTP requests
 */
@Injectable()
export class MockRuntimeConfigurationService
  implements IRuntimeConfigurationService {
  /**
   * Get the URL of the Heroes API
   */
  getHeroesApiUrl(): Observable<string> {
    return of('http://192.1.1.1:8282/api/v1/heroes');
  }
}

/**
 * Registers mock provider for RuntimeConfigurationService
 *
 * @example
 * providers: [
 *   provideMockRuntimeConfigurationService()
 * ]
 */
export function provideMockRuntimeConfigurationService(): Provider {
  return {
    provide: RuntimeConfigurationService,
    useClass: MockRuntimeConfigurationService,
  };
}
