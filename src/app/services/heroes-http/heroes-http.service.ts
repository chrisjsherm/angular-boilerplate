import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RuntimeConfigurationService } from '../runtime-configuration/runtime-configuration.service';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Hero } from '../../models/hero.entity';

/**
 * Interact with the Heroes HTTP API
 */
@Injectable({
  providedIn: 'root',
})
export class HeroesHttpService {
  private baseUrl$: Observable<string>;

  constructor(
    runtimeConfigurationService: RuntimeConfigurationService,
    private httpClient: HttpClient,
  ) {
    this.baseUrl$ = runtimeConfigurationService
      .getHeroesApiUrl()
      .pipe(map((baseUrl: string): string => baseUrl));
  }

  /**
   * Get a list of Heroes
   *
   * @returns List of Heroes
   */
  read(): Observable<Hero[]> {
    return this.baseUrl$.pipe(
      switchMap(
        (baseUrl: string): Observable<Hero[]> =>
          this.httpClient.get<Hero[]>(baseUrl),
      ),
    );
  }
}
