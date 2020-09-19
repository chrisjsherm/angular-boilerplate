import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
import { Hero } from '../../models/hero.entity';
import { HeroFormValues } from '../../pages/edit-page/hero-form-values.interface';
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
  update(id: string, formValues: HeroFormValues): Observable<void> {
    return this.baseUrl$.pipe(
      exhaustMap(
        (baseUrl: string): Observable<void> => {
          return this.httpClient.patch<void>(`${baseUrl}/${id}`, formValues);
        },
      ),
    );
  }
}
