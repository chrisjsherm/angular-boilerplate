import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../redux/app-state.interface';
import { selectHeroById } from '../../redux/selectors/hero.selectors';
import { ActivatedRoute, Params } from '@angular/router';
import { Hero } from '../../models/hero.entity';
import { Observable, of } from 'rxjs';
import { fetchDetailPageData } from './redux/actions/fetch-detail-page-data.actions';
import { switchMap } from 'rxjs/operators';

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
}
