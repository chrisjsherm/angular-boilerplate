import { Injectable } from '@angular/core';
import { IRuntimeConfigurationService } from './runtime-configuration-service.interface';
import { Observable, AsyncSubject } from 'rxjs';
import { RuntimeConfiguration } from './runtime-configuration.interface';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

/**
 * Retrieve configuration values that are not available at build-time.
 */
@Injectable({
  providedIn: 'root',
})
export class RuntimeConfigurationService
  implements IRuntimeConfigurationService {
  private configuration$: AsyncSubject<RuntimeConfiguration>;

  constructor(private httpClient: HttpClient) {
    this.configuration$ = new AsyncSubject<RuntimeConfiguration>();

    this.get().subscribe((configuration: RuntimeConfiguration): void => {
      this.configuration$.next(configuration);
      this.configuration$.complete();
    });
  }

  /**
   * Get the URL of the API for Hero information
   *
   * @returns API URL
   */
  getHeroesApiUrl(): Observable<string> {
    return this.configuration$.pipe(
      map(
        (configuration: RuntimeConfiguration): string =>
          configuration.heroesApiUrl,
      ),
    );
  }

  /**
   * Initiate the HTTP request to the configuration endpoint
   *
   * @returns Configuration
   */
  private get(): Observable<RuntimeConfiguration> {
    return this.httpClient.get<RuntimeConfiguration>(`/runtime-configuration`);
  }
}
