import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Hero } from '../../models/hero.entity';
import { AppState } from '../../redux/app-state.interface';
import { Store, select } from '@ngrx/store';
import { fetchListPageData } from './redux/actions/fetch-list-page-data.actions';
import { selectHeroes } from '../../redux/selectors/hero.selectors';

/**
 * List heroes
 */
@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit, OnDestroy {
  heroes: Hero[];

  private heroesSubscription: Subscription;

  constructor(private store: Store<AppState>) {}

  /**
   * Dispatch an action to fetch heroes. Subscribe to the Store so we can
   * display heroes.
   */
  ngOnInit(): void {
    this.store.dispatch(fetchListPageData());
    this.heroesSubscription = this.store
      .pipe(select(selectHeroes))
      .subscribe((heroes: Hero[]): void => {
        this.heroes = heroes;
      });
  }

  /**
   * Unsubscribe from the heroes subscription when the component is being destroyed
   */
  ngOnDestroy(): void {
    if (this.heroesSubscription) {
      this.heroesSubscription.unsubscribe();
    }
  }
}
