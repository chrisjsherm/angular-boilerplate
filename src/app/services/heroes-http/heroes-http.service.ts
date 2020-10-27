import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
import { HeroFormValues } from '../../models/hero-form-values.interface';
import { Hero } from '../../models/hero.entity';
import { RuntimeConfigurationService } from '../runtime-configuration/runtime-configuration.service';

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
   * Create a new Hero
   *
   * @param heroForm Fields to create a Hero
   *
   * @returns Created Hero
   */
  create(heroForm: HeroFormValues): Observable<Hero> {
    return this.baseUrl$.pipe(
      exhaustMap(
        (baseUrl: string): Observable<Hero> => {
          return this.httpClient.post<Hero>(baseUrl, heroForm);
        },
      ),
    );
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

  /**
   * Update fields accessible via the edit form
   *
   * @param id ID of the hero we're updating
   * @param formValues Updatable fields
   *
   * @returns Empty Observable indicating the completion of the HTTP request
   */
  update(id: string, formValues: Partial<HeroFormValues>): Observable<void> {
    return this.baseUrl$.pipe(
      exhaustMap(
        (baseUrl: string): Observable<void> => {
          return this.httpClient.patch<void>(`${baseUrl}/${id}`, formValues);
        },
      ),
    );
  }

  /**
   * Delete a hero
   *
   * @param id ID of the hero we're deleting
   *
   * @returns Empty Observable indicating the completion of hte HTTP request
   */
  delete(id: string): Observable<void> {
    return this.baseUrl$.pipe(
      exhaustMap(
        (baseUrl: string): Observable<void> => {
          return this.httpClient.delete<void>(`${baseUrl}/${id}`);
        },
      ),
    );
  }
}
