import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { getStatusText, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import { Hero } from '../../../models/hero.entity';
import { HeroesHttpService } from '../../../services/heroes-http/heroes-http.service';
import {
  submitDeleteHero,
  submitDeleteHeroFailure,
  submitDeleteHeroSuccess,
} from './delete-hero-dialog.actions';
import { DeleteHeroDialogEffects } from './delete-hero-dialog.effects';

describe('Side effects from the delete hero dialog', (): void => {
  let actions$: Observable<Action>;
  let effects: DeleteHeroDialogEffects;
  let heroesHttpService: jasmine.SpyObj<HeroesHttpService>;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      providers: [
        DeleteHeroDialogEffects,
        provideMockActions((): Observable<Action> => actions$),
        {
          provide: HeroesHttpService,
          useValue: jasmine.createSpyObj(HeroesHttpService, ['delete']),
        },
      ],
    });

    effects = TestBed.inject(DeleteHeroDialogEffects);
    heroesHttpService = TestBed.inject(HeroesHttpService) as jasmine.SpyObj<
      HeroesHttpService
    >;
  });

  it('should trigger a HTTP call to delete and issue a success Action', (): void => {
    // Arrange
    heroesHttpService.delete.and.returnValue(of(undefined));

    // Act
    actions$ = hot('-a', {
      a: submitDeleteHero({
        hero: { id: '85d20a91-a90d-4a00-8058-f49f2ba7ac7b' } as Hero,
        closeDialog: (): void => {},
      }),
    });

    // Assert
    expect(effects.submitDelete$).toBeObservable(
      cold('-n', {
        n: submitDeleteHeroSuccess({
          hero: { id: '85d20a91-a90d-4a00-8058-f49f2ba7ac7b' } as Hero,
        }),
      }),
    );
  });

  it(
    'should trigger a HTTP call delete and issue a failure Action while ' +
      'staying alive for future Actions',
    (): void => {
      // Arrange
      heroesHttpService.delete.and.returnValues(
        throwError(
          new HttpErrorResponse({
            status: INTERNAL_SERVER_ERROR,
            statusText: getStatusText(INTERNAL_SERVER_ERROR),
          }),
        ),
        of(undefined),
      );

      // Act
      actions$ = hot('-a-b', {
        a: submitDeleteHero({
          hero: { id: '85d20a91-a90d-4a00-8058-f49f2ba7ac7b' } as Hero,
          closeDialog: (): void => {},
        }),
        b: submitDeleteHero({
          hero: { id: '85d20a91-a90d-4a00-8058-f49f2ba7ac7b' } as Hero,
          closeDialog: (): void => {},
        }),
      });

      // Assert
      expect(effects.submitDelete$).toBeObservable(
        cold('-e-n', {
          e: submitDeleteHeroFailure({
            error: new HttpErrorResponse({
              status: INTERNAL_SERVER_ERROR,
              statusText: getStatusText(INTERNAL_SERVER_ERROR),
            }),
            hero: { id: '85d20a91-a90d-4a00-8058-f49f2ba7ac7b' } as Hero,
          }),
          n: submitDeleteHeroSuccess({
            hero: { id: '85d20a91-a90d-4a00-8058-f49f2ba7ac7b' } as Hero,
          }),
        }),
      );
    },
  );
});
