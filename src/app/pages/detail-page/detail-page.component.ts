import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Hero } from '../../models/hero.entity';
import { AppState } from '../../redux/app-state.interface';
import { selectHeroById } from '../../redux/selectors/hero.selectors';
import { openDeleteHeroDialog } from './redux/actions/delete-hero.actions';
import { fetchDetailPageData } from './redux/actions/fetch-detail-page-data.actions';

/**
 * Detailed information on a hero
 */
@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  hero$: Observable<Hero>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.hero$ = this.route.params.pipe(
      switchMap(
        (params: Params): Observable<Hero> => {
          return this.store.pipe(
            select<AppState, string, Hero>(selectHeroById, params.id),
          );
        },
      ),
    );
  }

  /**
   * Dispatch an action to retrieve the hero
   */
  ngOnInit(): void {
    this.store.dispatch(fetchDetailPageData());
  }

  /**
   * Dispatch Action to open the delete hero dialog
   *
   * @param hero Hero to delete
   */
  delete(hero: Hero): void {
    this.store.dispatch(
      openDeleteHeroDialog({
        hero,
      }),
    );
  }
}
