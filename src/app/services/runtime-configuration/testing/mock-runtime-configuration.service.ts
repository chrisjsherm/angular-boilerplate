import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { IRuntimeConfigurationService } from '../runtime-configuration-service.interface';

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
