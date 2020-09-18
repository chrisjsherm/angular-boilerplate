import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Hero } from '../../models/hero.entity';
import { AppState } from '../../redux/app-state.interface';
import { selectHeroById } from '../../redux/selectors/hero.selectors';
import { fetchEditPageData } from './redux/actions/fetch-edit-page-data.actions';

/**
 * A view with form controls for editing a hero
 */
@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  hero$: Observable<Hero>;
  editForm: FormGroup;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.hero$ = this.route.params.pipe(
      switchMap(
        (params: Params): Observable<Hero> => {
          return this.store.pipe(
            select<AppState, string, Hero>(selectHeroById, params.id),
          );
        },
      ),
      filter((hero: Hero): boolean => hero !== undefined),
      tap({
        next: (hero: Hero): void => {
          this.editForm = this.generateFormInstance(hero);
        },
      }),
    );
  }

  /**
   * Dispatch an action to retrieve the hero
   */
  ngOnInit(): void {
    this.store.dispatch(fetchEditPageData());
  }

  /**
   * Generate a form group with the hero's current values
   *
   * @param hero Hero instance whose values this form will be editing
   *
   * @returns Angular FormGroup we'll interact with in the HTML template
   */
  private generateFormInstance(hero: Hero): FormGroup {
    return new FormGroup({
      firstName: new FormControl(hero.firstName, [Validators.required]),
      lastName: new FormControl(hero.lastName, [Validators.required]),
      phoneNumber: new FormControl(hero.phoneNumber, [Validators.required]),
      avatarUrl: new FormControl(hero.avatarUrl, [Validators.required]),
    });
  }
}
